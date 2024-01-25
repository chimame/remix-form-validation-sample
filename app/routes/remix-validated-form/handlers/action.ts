import { type ActionFunctionArgs, json } from "@remix-run/node";
import { validationError } from "remix-validated-form";
import { validator } from "../schemas/form";

const userExistsInDatabase = async (name: string) => {
  // This is where you would check if the user exists in your database.
  return !!(Math.random() < 0.5);
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const data = await validator.validate(await request.formData());
  if (data.error) return validationError(data.error);

  const { name, email } = data.data;

  if (await userExistsInDatabase(name)) {
    return validationError(
      {
        fieldErrors: {
          name: "This name cannot be used",
        },
        formId: data.formId,
      },
      data.data,
    );
  }

  return json({
    message: "success!!",
  });
};
