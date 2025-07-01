import { Suspense } from "react";

import Loading from "./loading";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center gap-2 py-2 md:py-2 pt-8">
      <Suspense fallback={<Loading />}>
        <div className="w-full max-w-screen-xl h-screen">
          {children}
        </div>
      </Suspense>
    </section>
  );
}

//w-full flex flex-col items-center justify-center gap-4
//w-full max-w-screen-xl overflow-auto scroll-smooth scrollbar-hide inline-block text-center justify-center
