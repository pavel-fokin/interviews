import { Link } from "@remix-run/react";

export default function ThankYou() {
  return (
    <div className="h-screen">
      <header className="flex flex-row items-center justify-between gap-16 p-4 sm:p-8 pb-16">
        <h1 className="sm:text-center leading-tight text-2xl font-light text-gray-800 dark:text-gray-200">
          <Link to="/">Rewarded Interview</Link>
        </h1>
      </header>
      <main className="flex flex-col max-w-screen-sm mx-auto items-center justify-center gap-4">
        <h1 className="text-gray-800 dark:text-gray-200 text-4xl font-bold">
          Thank you for showing interest!
        </h1>
      </main>
    </div>
  );
}
