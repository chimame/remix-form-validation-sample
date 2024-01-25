import { type ActionFunctionArgs, json } from "@remix-run/node";
import {
  validationError,
} from "remix-validated-form";
import { validator } from "../schemas/form";

export const action = async ({
  request,
}: ActionFunctionArgs) => {
  const data = await validator.validate(
    await request.formData()
  );
  if (data.error) return validationError(data.error);
  const { name, email } = data.data;

  return json({
    title: `Hi ${name}!`,
    description: `Your email is ${email}`,
  });
};
