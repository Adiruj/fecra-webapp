export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center gap-2 py-2 md:py-2 pt-5">
      <div className="h-screen overflow-auto scroll-smooth scrollbar-hide">
        {children}
      </div>
      <footer className="w-full flex items-center justify-center py-3">
        <p className="text-2xl text-md font-semibold text-gray-800">ROBOT RUNNING</p>
      </footer>
    </section>
  );
}

/**flex flex-col items-center justify-center gap-2 py-2 md:py-2 */
/**inline-block text-center justify-center */