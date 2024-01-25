import {
  ValidatedForm,
  useFormContext,
} from "remix-validated-form";
import { validator } from "./schemas/form";
import { action } from "./handlers";
import { useActionData } from "@remix-run/react";
import { useEffect } from "react";

export default function Form() {
  const data = useActionData<typeof action>();
  const { fieldErrors } = useFormContext('sample-form-id');

  useEffect(() => {
    if (data) {
      console.log(data);
      // {
      //   fieleErrors: Record<<field name>, <error message>>,
      //   formId: <your setting form id>
      // }
      // or
      // {
      //   title: `Hi <input name>!`,
      //   description: `Your email is <input email>`,
      // }
    }
  }, [data]);

  return (
    <ValidatedForm id='sample-form-id' validator={validator} method="post">
      <div>
        <label>Name</label>
        <input name="name" />
        { fieldErrors.name && <div>{fieldErrors.name}</div> }
      </div>
      <div>
        <label>Email</label>
        <input name="email" />
        { fieldErrors.email && <div>{fieldErrors.email}</div> }
      </div>
      <button type="submit">Regist</button>
    </ValidatedForm>
  );
}

export { action };
