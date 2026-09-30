import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-24 text-center md:px-10">
      <h1 className="mb-4 text-3xl text-light-text dark:text-dark-text">Prompt not found</h1>
      <p className="mb-8 leading-relaxed text-light-text-secondary dark:text-dark-text-secondary">
        The page you are looking for does not exist or has been removed.
      </p>
      <Link href="/" className="text-light-link hover:underline dark:text-dark-accent">
        Back to all prompts
      </Link>
    </div>
  );
}
