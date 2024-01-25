import type { ActionFunctionArgs } from '@remix-run/node';
import { parse } from '@conform-to/zod';
import { json } from '@remix-run/node';
import { schema } from '../schemas/form';

const userExistsInDatabase = async (name: string) => {
  // This is where you would check if the user exists in your database.
  return !!(Math.random() < 0.5);
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const submission = parse(formData, { schema });

  if (!submission.value || submission.intent !== 'submit') {
    return json({ success: false, message: 'error!', submission });
  }

  if (await userExistsInDatabase(submission.value.name)) {
    return json({
      success: false,
      message: 'error!',
      submission: {
        ...submission,
        error: {
          name: ['This name cannot be used']
        },
      }
    });
  }

  return json({ success: true, message: 'success!!', submission });
}
