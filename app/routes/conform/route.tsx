import { useForm, getFormProps, getInputProps } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { Form, useActionData } from "@remix-run/react";
import { schema } from "./schemas/form";
import { action } from "./handlers";
import { useEffect } from "react";

export default function SampleForm() {
  const data = useActionData<typeof action>();
  const [form, { name, email }] = useForm({
    lastResult: data?.submission,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema });
    },
  });

  useEffect(() => {
    if (!data) return;

    console.log(data);
    // {
    //   message: <server message>,
    //   submission: typeof SubmissionResult,
    //   success: <boolean>,
    // }

    if (data.success) {
      alert(data.message);
    }
  }, [data]);

  return (
    <Form method="post" {...getFormProps(form)}>
      <div>
        <label>Name</label>
        <input {...getInputProps(name, { type: "text" })} />
        {name.errors && (
          <div>
            {name.errors.map((e, index) => (
              <p key={index}>{e}</p>
            ))}
          </div>
        )}
      </div>
      <div>
        <label>Email</label>
        <input {...getInputProps(email, { type: "text" })} />
        {email.errors && (
          <div>
            {email.errors.map((e, index) => (
              <p key={index}>{e}</p>
            ))}
          </div>
        )}
      </div>
      <button type="submit">Regist</button>
    </Form>
  );
}

export { action };
