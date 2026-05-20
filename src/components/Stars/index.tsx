import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { colors } from "../../styles/colors";

export const Stars: React.FC<{
  rating: number;
  onChange?: (newRating: number) => void;
}> = ({ rating, onChange }) => {
  return Array.from({ length: 5 }, (_, index) => {
    const startNumber = index + 1;
    const isSelected = startNumber <= rating;

    return (
      <TouchableOpacity
        className="mr-2"
        key={`rating-star-${index}`}
        onPress={() => onChange && onChange(startNumber)}
      >
        <Ionicons
          name={isSelected ? "star" : "star-outline"}
          size={28}
          color={isSelected ? colors["purple-base"] : colors.grays[200]}
        />
      </TouchableOpacity>
    );
  });
};
