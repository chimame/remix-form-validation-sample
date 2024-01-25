import type { ActionFunctionArgs } from '@remix-run/node';
import { parse } from '@conform-to/zod';
import { json } from '@remix-run/node';
import { schema } from '../schemas/form';

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const submission = parse(formData, { schema });

  return json(submission);
}
