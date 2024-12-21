import type { MetaFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';

export const meta: MetaFunction = () => {
  return [
    { title: 'Fair Interviews' },
    {
      name: 'description',
      content: 'Get paid for your time during interviews',
    },
  ];
};

export default function Index() {
  return (
    <div className="h-screen">
      <div className="container mx-auto">
        <header className="flex flex-row items-center justify-between gap-16 p-4 sm:p-8 pb-16">
          <h1 className="sm:text-center leading-tight text-2xl font-light text-gray-800 dark:text-gray-200">
            Fair Interviews
          </h1>
          <nav>
            <Link className="button" to="/signup">
              Sign up
            </Link>
          </nav>
        </header>
        <main className="flex flex-col items-center gap-8">
          <section className="flex flex-col items-center gap-9 p-4 sm:p-8">
            <h1 className="text-center leading-tight text-5xl font-bold text-gray-800 dark:text-gray-200">
              Get paid for your time during interviews
            </h1>
            <p className="text-center text-xl text-gray-500 dark:text-gray-400 font-regular">
              Your time and expertise are valuable. Join a platform and set up
              rates for your interviews.
            </p>
            <Link className="button" to="/signup">
              Sign up for early access
            </Link>
          </section>
          <section className="flex flex-col items-center gap-4 p-4 sm:p-8">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
              Why join this platform?
            </h2>
            <ul className="flex flex-col gap-4 list-disc pl-6">
              <li className="text-lg font-regular text-gray-800 dark:text-gray-200">
                Interviews are often stressful and time-consuming with no
                guarantees.
              </li>
              <li className="text-lg font-regular text-gray-800 dark:text-gray-200">
                Turn interviews into a rewarding experience.
              </li>
              <li className="text-lg font-regular text-gray-800 dark:text-gray-200">
                Feel that your time and expertise are valued.
              </li>
              <li className="text-lg font-regular text-gray-800 dark:text-gray-200">
                Promote a culture of fairness in hiring.
              </li>
            </ul>
          </section>
          <section className="flex flex-col items-center gap-4 p-4 sm:p-8">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
              How it works
            </h2>
            <ol className="flex flex-col gap-4 list-decimal pl-6">
              <li className="text-lg font-regular text-gray-800 dark:text-gray-200">
                <strong>Sign Up:</strong> Create a profile with preferred hourly
                rate.
              </li>
              <li className="text-lg font-regular text-gray-800 dark:text-gray-200">
                <strong>Share:</strong> Share a page for payment with your
                recruiter.
              </li>
              <li className="text-lg font-regular text-gray-800 dark:text-gray-200">
                <strong>Get Paid:</strong> Earn money after completing an
                interview.
              </li>
            </ol>
          </section>
          <section className="flex flex-col items-center gap-9 p-4 sm:p-8">
            <h2 className="text-3xl text-center font-bold text-gray-800 dark:text-gray-200">
              Don’t miss out on early access. Sign up today!
            </h2>
            <Link className="button" to="/signup">
              Sign up for early access
            </Link>
          </section>
        </main>
        <footer className="flex flex-row items-center justify-between gap-16 p-4 sm:p-8">
          <p className="text-center text-gray-800 dark:text-gray-200">
            &copy; {new Date().getFullYear()} Fair Interviews
          </p>
        </footer>
      </div>
    </div>
  );
}
