export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="w-full flex flex-col items-center justify-center gap-4">
      <div className="w-full max-w-screen-xl overflow-auto scroll-smooth scrollbar-hide inline-block text-center justify-center">
        {children}
      </div>
      
    </section>
  );
}
