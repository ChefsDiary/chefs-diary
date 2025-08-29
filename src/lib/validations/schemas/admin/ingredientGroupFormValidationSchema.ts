import { InferType, object, string } from "yup";

import getErrorTextByKey from "@/lib/errorLibrary/auth/authErrorLibrary";

const ingredientGroupFormValidationSchema = object().shape({
  name: string()
    .required(getErrorTextByKey("ingredientGroupNameRequired"))
    .max(20, getErrorTextByKey("ingredientGroupNameMaxLength", "20")),
});

export default ingredientGroupFormValidationSchema;

export type IngredientGroupFormType = InferType<
  typeof ingredientGroupFormValidationSchema
>;
export type IngredientGroupFormErrorType = {
  [K in keyof IngredientGroupFormType | "general" | "timestamp"]?: string;
};
// TODO: General a timestamp by mohly být v nějaké generalError typu
