import { HeartIcon } from '@heroicons/react/24/solid';
export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 py-6 text-center text-lg">
      <p className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text font-semibold text-transparent">
        Built with <HeartIcon className="inline-block h-4 w-4 text-pink-500" /> by Rahul Dindigala
      </p>

      <p className="mt-1 underline underline-offset-2 font-semibold">
        <a
          href="https://github.com/RAHULDINDIGALA-32"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent hover:opacity-80 transition "
        >
          GitHub
        </a>
      </p>
    </footer>

  );
}
