"use client";

export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <html lang="en">
      <body>
        <main className="flex min-h-screen items-center justify-center bg-background px-4">
          <div className="max-w-md text-center">
            <h1 className="text-xl font-semibold text-foreground">This page did not load</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Something went wrong on our end. You can try refreshing the page.
            </p>
            <button
              onClick={reset}
              className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Try again
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
