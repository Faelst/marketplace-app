import * as yup from "yup";

export const CreditCardSchema = yup.object().shape({
  titularName: yup.string().required("O nome do titular é obrigatório"),
  number: yup
    .string()
    .required("O número do cartão é obrigatório")
    .test("card-number", "Número de cartão inválido", (value) => {
      if (!value) return false;
      const cleaned = value.replace(/\s/g, "");
      return /^\d{16}$/.test(cleaned);
    }),
  CVV: yup
    .number()
    .typeError("O CVV deve ser um número")
    .required("O CVV é obrigatório")
    .test(
      "len",
      "O CVV deve conter 3 ou 4 dígitos",
      (val) =>
        val !== undefined &&
        (val.toString().length === 3 || val.toString().length === 4),
    ),
  expirationDate: yup
    .string()
    .required("A data de expiração é obrigatória")
    .matches(
      /^\d{2}\/\d{2}$/,
      "A data de expiração deve estar no formato MM/AA",
    )
    .test("expDate", "O cartão está expirado", (val) => {
      if (!val) return false;
      const [month, year] = val.split("/").map(Number);
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear() % 100;
      const currentMonth = currentDate.getMonth() + 1;

      return (
        year > currentYear || (year === currentYear && month >= currentMonth)
      );
    }),
});

export type CreditCardFormData = yup.InferType<typeof CreditCardSchema>;
