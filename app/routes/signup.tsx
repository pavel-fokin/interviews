import { zodResolver } from '@hookform/resolvers/zod';
import { ActionFunctionArgs } from '@remix-run/node';
import { Form, Link, useActionData, useSubmit, useNavigate } from '@remix-run/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const SignUpEarlyAccessSchema = z.object({
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

type SignUpEarlyAccess = z.infer<typeof SignUpEarlyAccessSchema>;

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const result = SignUpEarlyAccessSchema.safeParse(data);
  if (!result.success) {
    return Response.json({ errors: result.error.flatten().fieldErrors }, { status: 400 });
  }

  return Response.json({ success: true });
}

export default function SignUp() {
  const navigate = useNavigate();
  const submit = useSubmit();
  const actionData = useActionData<typeof action>();
  const form = useForm<SignUpEarlyAccess>({
    resolver: zodResolver(SignUpEarlyAccessSchema),
  });

  const onSubmit = (data: SignUpEarlyAccess) => {
    console.log(data);
    submit(data, {
      method: 'post',
      action: '/signup',
    });
    navigate('/thank-you');
  };

  return (
    <div className="h-screen">
      <header className="flex flex-row items-center justify-between gap-16 p-4 pb-8 sm:p-8">
        <h1 className="sm:text-center leading-tight text-2xl font-light text-gray-800 dark:text-gray-200">
          <Link to="/">Rewarded Interview</Link>
        </h1>
      </header>
      <main className="flex flex-col max-w-screen-sm mx-auto items-center justify-center gap-8">
        <h1 className="text-center text-gray-800 dark:text-gray-200 text-4xl font-bold">
          Join the movement to get paid for your time in interviews
        </h1>
        <p className="text-center text-lg text-gray-500 font-regular">
          We’re building a platform to ensure developers are fairly compensated
          for their expertise. Sign up to show your interest and follow updates.
        </p>
        <Form
          method="post"
          className="flex flex-col min-w-[300px] gap-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium" htmlFor="email">
              Email (required)
            </label>
            <input
              id="email"
              type="email"
              placeholder="john@doe.com"
              className="input"
              {...form.register('email')}
            />
            {form.formState.errors.email && (
              <p className="text-sm text-red-500 font-regular">
                {form.formState.errors.email.message}
              </p>
            )}
            {actionData?.errors?.email && (
              <p className="text-sm text-red-500 font-regular">
                {actionData.errors.email}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium" htmlFor="name">
              Name (optional)
            </label>
            <input
              id="name"
              type="text"
              placeholder="John Doe"
              className="input"
              {...form.register('name')}
            />
            {form.formState.errors.name && (
              <p className="text-sm text-red-500 font-regular">
                {form.formState.errors.name.message}
              </p>
            )}
            {actionData?.errors?.name && (
              <p className="text-sm text-red-500 font-regular">
                {actionData.errors.name}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium" htmlFor="role">
              Role/Expertise (optional)
            </label>
            <input
              id="role"
              type="text"
              placeholder="Senior Software Engineer"
              className="input"
              {...form.register('role')}
            />
            {form.formState.errors.role && (
              <p className="text-sm text-red-500 font-regular">
                {form.formState.errors.role.message}
              </p>
            )}
            {actionData?.errors?.role && (
              <p className="text-sm text-red-500 font-regular">
                {actionData.errors.role}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium" htmlFor="linkedin">
              LinkedIn profile (optional)
            </label>
            <input
              id="linkedin"
              type="text"
              placeholder="https://www.linkedin.com/in/john-doe"
              className="input"
              {...form.register('linkedin')}
            />
            {form.formState.errors.linkedin && (
              <p className="text-sm text-red-500 font-regular">
                {form.formState.errors.linkedin.message}
              </p>
            )}
            {actionData?.errors?.linkedin && (
              <p className="text-sm text-red-500 font-regular">
                {actionData.errors.linkedin}
              </p>
            )}
          </div>
          <div className="flex flex-col pt-4">
            <button className="button">Sign up to show interest</button>
          </div>
        </Form>
        <section className="flex flex-col gap-2 pt-4">
          <p className="text-sm text-gray-500 font-regular">
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