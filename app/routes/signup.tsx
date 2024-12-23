import { zodResolver } from '@hookform/resolvers/zod';
import { ActionFunctionArgs } from '@remix-run/node';
import { Form, Link, redirect, useActionData, useNavigation } from '@remix-run/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { ClientOnly } from '@/components/client-only';
import { CookiesBar } from '@/components/cookies-bar';
import { firestore } from '@/server/firestore.server';

const SignUpEarlySchema = z.object({
  email: z.string().nonempty({ message: "Email is required" }).email(),
  name: z.string().optional(),
  role: z.string().optional(),
  linkedin: z
    .string()
    .optional()
    .refine(
      (value) =>
        !value ||
        /^(https?:\/\/)?(www\.)?linkedin\.com\/in\//.test(value),
      {
        message: 'Invalid LinkedIn URL',
      },
    ),
});

type SignUpEarlyAccess = z.infer<typeof SignUpEarlySchema>;

export async function action({ request }: ActionFunctionArgs) {
  console.log('Action function called');
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const result = SignUpEarlySchema.safeParse(data);
  if (!result.success) {
    return Response.json({ errors: result.error.flatten().fieldErrors }, { status: 400 });
  }

  const { email, name, role, linkedin } = result.data;

  try {
    const userRef = firestore.collection('users').doc();
    await userRef.set({ email, name, role, linkedin });
    return redirect('/thank-you');
  } catch (error) {
    console.error('Error creating user:', error);
    return Response.json({ error: 'Failed to create user' }, { status: 500 });
  }

}

export default function SignUp() {
  const navigation = useNavigation();
  const actionData = useActionData<typeof action>();
  const form = useForm<SignUpEarlyAccess>({
    resolver: zodResolver(SignUpEarlySchema),
  });

  return (
    <div className="h-screen">
      <ClientOnly>
        <CookiesBar />
      </ClientOnly>
      <header className="flex flex-row items-center justify-between gap-16 p-4 pb-8 sm:p-8">
        <h1 className="sm:text-center leading-tight text-2xl font-light text-gray-800 dark:text-gray-200">
          <Link to="/">Fair Interviews</Link>
        </h1>
      </header>
      <main className="flex flex-col mx-auto max-w-screen-sm items-center justify-center gap-8 p-4 sm:p-8">
        <h1 className="text-center text-gray-800 dark:text-gray-200 text-4xl font-bold">
          Join the movement to get paid for your time in interviews
        </h1>
        <p className="text-center text-lg text-gray-500 dark:text-gray-400 font-regular">
          We’re building a platform to ensure developers are fairly compensated
          for their expertise. Sign up to show your interest and follow updates.
        </p>
        <Form
          method="post"
          className="flex flex-col w-full sm:max-w-sm gap-4"
        >
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium" htmlFor="email">
              Email <span className="text-gray-500 dark:text-gray-400 font-normal">(required)</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="john@doe.com"
              className="input"
              {...form.register('email')}
            />
            {form.formState.errors.email && (
              <p className="text-sm text-red-500 dark:text-red-400 font-regular">
                {form.formState.errors.email.message}
              </p>
            )}
            {actionData?.errors?.email && (
              <p className="text-sm text-red-500 dark:text-red-400 font-regular">
                {actionData.errors.email[0]}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium" htmlFor="name">
              Name <span className="text-gray-500 dark:text-gray-400 font-normal">(optional)</span>
            </label>
            <input
              id="name"
              type="text"
              placeholder="John Doe"
              className="input"
              {...form.register('name')}
            />
            {form.formState.errors.name && (
              <p className="text-sm text-red-500 dark:text-red-400 font-regular">
                {form.formState.errors.name.message}
              </p>
            )}
            {actionData?.errors?.name && (
              <p className="text-sm text-red-500 dark:text-red-400 font-regular">
                {actionData.errors.name}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium" htmlFor="role">
              Role/Expertise <span className="text-gray-500 dark:text-gray-400 font-normal">(optional)</span>
            </label>
            <input
              id="role"
              type="text"
              placeholder="Senior Software Engineer"
              className="input"
              {...form.register('role')}
            />
            {form.formState.errors.role && (
              <p className="text-sm text-red-500 dark:text-red-400 font-regular">
                {form.formState.errors.role.message}
              </p>
            )}
            {actionData?.errors?.role && (
              <p className="text-sm text-red-500 dark:text-red-400 font-regular">
                {actionData.errors.role}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium" htmlFor="linkedin">
              LinkedIn profile <span className="text-gray-500 dark:text-gray-400 font-normal">(optional)</span>
            </label>
            <input
              id="linkedin"
              type="text"
              placeholder="https://www.linkedin.com/in/john-doe"
              className="input"
              {...form.register('linkedin')}
            />
            {form.formState.errors.linkedin && (
              <p className="text-sm text-red-500 dark:text-red-400 font-regular">
                {form.formState.errors.linkedin.message}
              </p>
            )}
            {actionData?.errors?.linkedin && (
              <p className="text-sm text-red-500 dark:text-red-400 font-regular">
                {actionData.errors.linkedin}
              </p>
            )}
          </div>
          <div className="flex flex-col pt-4">
            <button className={`button ${navigation.state === 'submitting' ? 'loading' : ''}`}>Sign up to show interest</button>
          </div>
        </Form>
        <section className="flex flex-col gap-2 pt-4">
          <p className="text-sm text-gray-500 dark:text-gray-400 font-regular">
            We’re in the early stages of building this platform. Your sign-up
            helps us understand if this idea resonates with developers like you.
            We’ll keep you updated as we progress and give you priority access
            to future updates.
          </p>
        </section>
      </main>
    </div>
  );
}
