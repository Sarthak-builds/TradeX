import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50 dark:bg-black">
      <h2 className="text-3xl font-bold mb-4 text-black dark:text-white">Not Found</h2>
      <p className="text-zinc-600 dark:text-zinc-400 mb-6">Could not find requested resource</p>
      <Link 
        href="/"
        className="px-4 py-2 bg-black text-white rounded-md hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 transition-colors"
      >
        Return Home
      </Link>
    </div>
  );
}
