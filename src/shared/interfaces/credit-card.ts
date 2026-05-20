export interface CreditCard {
  id: number;
  userId: number;
  titularName: string;
  number: string;
  CVV: number;
  expirationDate: string;
  createdAt: Date;
  updatedAt: Date;
}
