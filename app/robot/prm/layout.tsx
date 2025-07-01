import { Suspense } from "react";

import Loading from "./loading";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center gap-2 py-2 md:py-2 pt-8">
      <Suspense fallback={<Suspense />}>
        <div className="h-screen overflow-auto scroll-smooth scrollbar-hide">
          {children}
        </div>
      </Suspense>
    </section>
  );
}

/**flex flex-col items-center justify-center gap-2 py-2 md:py-2 */
/**inline-block text-center justify-center */