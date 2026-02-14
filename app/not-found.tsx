import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <h2 className="text-2xl font-semibold">Page Not Found</h2>
      <p className="text-muted-foreground">
        The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="mt-4 px-6 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        Go Home
      </Link>
    </div>
  );
}
