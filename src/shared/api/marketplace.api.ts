import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosInstance } from "axios";
import { Platform } from "react-native";
import { useUserStore } from "../store/user-store";

const getBaseURL = () => {
  return Platform.select({
    ios: "http://172.20.10.3:3001",
    android: "http://172.20.10.3:3001",
    default: "http://localhost:3000",
  });
};

export const baseURL = getBaseURL();

export class MarketplaceApi {
  private instance: AxiosInstance;
  private isRefreshing: boolean;

  constructor() {
    this.instance = axios.create({
      baseURL,
    });
    this.setupInterceptors();
    this.isRefreshing = false;
  }

  getInstance() {
    return this.instance;
  }

  private setupInterceptors() {
    this.instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (
          error.response?.status === 401 &&
          error.response?.data?.message === "Token expirado" &&
          !this.isRefreshing
        ) {
          this.isRefreshing = true;
          try {
            const userData = await AsyncStorage.getItem(
              "marketplace@user-store",
            );

            if (!userData) {
              throw new Error("No user data found");
            }

            const {
              state: { refreshToken },
            } = JSON.parse(userData);

            if (!refreshToken) {
              throw new Error("No refresh token found");
            }

            const { data: response } = await this.instance.post(
              `/auth/refresh`,
              {
                refreshToken,
              },
            );

            const currentUserData = JSON.parse(userData);
            currentUserData.state.token = response.token;
            currentUserData.state.refreshToken = response.refreshToken;

            await AsyncStorage.setItem(
              "marketplace@user-store",
              JSON.stringify(currentUserData),
            );

            originalRequest.headers["Authorization"] =
              `Bearer ${response.token}`;
            return this.instance(originalRequest);
          } catch (refreshError) {
            this.handleUnauthorized();
            console.error("Erro ao atualizar token:", refreshError);
            return Promise.reject(
              new Error("Session expired. Please log in again."),
            );
          } finally {
            this.isRefreshing = false;
          }
        }

        if (error.response && error.response?.data) {
          return Promise.reject(new Error(error.response.data.message));
        }

        return Promise.reject(
          new Error("An unexpected error occurred. Please try again later."),
        );
      },
    );

    this.instance.interceptors.request.use(
      async (config) => {
        const userData = await AsyncStorage.getItem("marketplace@user-store");

        if (!userData) {
          return config;
        }

        const token = JSON.parse(userData)?.state?.token;

        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
  }

  private async handleUnauthorized() {
    delete this.instance.defaults.headers.common["Authorization"];
    const { logout } = useUserStore.getState();
    logout();
  }
}

export const marketplaceApi = new MarketplaceApi().getInstance();
