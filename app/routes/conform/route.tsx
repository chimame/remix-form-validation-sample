import { useForm } from '@conform-to/react';
import { parse } from '@conform-to/zod';
import { Form, useActionData } from '@remix-run/react';
import { schema } from './schemas/form';
import { action } from './handlers';
import { useEffect } from 'react';

export default function SampleForm() {
  const data = useActionData<typeof action>();
  const [form, { name, email }] = useForm({
    lastSubmission: data?.submission,
    onValidate({ formData }) {
      return parse(formData, { schema });
    },
  });

  useEffect(() => {
    if (!data) return;

    console.log(data);
    // {
    //   message: <server message>,
    //   submission: lastSubmission for conform,
    //   success: <boolean>,
    // }

    if (data.success) {
      alert(data.message);
    }
  }, [data]);

  return (
    <Form method="post" {...form.props}>
      <div>
        <label>Name</label>
        <input name={name.name} />
        { name.error && <div>{name.error}</div> }
      </div>
      <div>
        <label>Email</label>
        <input name={email.name} />
        { email.error && <div>{email.error}</div> }
      </div>
      <button type="submit">Regist</button>
    </Form>
  );
}

export { action };
