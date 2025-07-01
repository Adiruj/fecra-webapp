
import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@heroui/link";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontPrompt } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import { SidebarWrapper } from "@/components/sidebar";



export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon_FEC.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen text-foreground bg-background font-sans antialiased",
          fontPrompt.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
          {/*flex flex-row min-h-screen flex-grow*/}
          <div className="flex min-h-screen bg-gray-100 md:gap-8 relative">
            {/*<div className="absolute top-0 left-0 w-full h-[350px] bg-blue-500 rounded-b-[80px] z-0 dark:hidden" />*/}
            <div className="fixed top-0 left-0 w-full h-[300px] rounded-b-[50px] bg-[url('/mainbg.svg')] md:h-[350px] md:rounded-b-[0px]  bg-cover bg-no-repeat z-0 dark:hidden" />
            <aside className="relative z-10 sm:hidden md:hidden xl:block xl:h-screen overflow-hidden xl:w-64">
              <SidebarWrapper />
            </aside>

            <div className="relative w-full flex flex-col flex-1 xl:overflow-hidden min-h-screen justify-center ">
              <div className="sticky top-0 z-50 xl:hidden">
                <Navbar />
              </div>
              <main className="z-10 container font-prompt mx-auto max-w-7xl pt-6 px-6 flex-grow overflow-auto scroll-smooth scrollbar-hide ">
                {children}
              </main>
              <footer className="w-full flex items-center justify-center px-2 py-3 bg-gray-100">
                <Link
                  isExternal
                  className="flex items-start gap-1 text-current"
                  href="/"
                  title="heroui.com homepage"
                >
                  <span className="text-default-600">© 2025, Dev by</span>
                  <p className="text-primary">NumChock</p>
                </Link>
              </footer>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}


/**relative flex flex-col flex-1 overflow-hidden h-screen justify-center */

{/*<div className="flex flex-row min-h-screen flex-grow bg-gray-100">
            <div className=" absolute w-full bg-blue-500 dark:hidden min-h-[350px] rounded-b-[80px]" />
            <aside className='hidden md:block h-screen bg-white dark:bg-gray-900 border-r overflow-y-auto scrollbar-hide scroll-smooth'>
              <SidebarWrapper />
            </aside>
            <div className="z-20">
              asdasd
            </div>
          </div>*/}

{/*<div className="flex flex-row min-h-screen flex-grow">
            <div className=" absolute w-full bg-blue-500 dark:hidden min-h-[350px] rounded-b-[100px]"></div>
            <aside className='hidden md:block h-screen bg-white dark:bg-gray-900 border-r overflow-y-auto scrollbar-hide scroll-smooth'>
              <SidebarWrapper />
            </aside>
            <div className="relative flex flex-col flex-1 overflow-hidden h-screen justify-center ">
              <Navbar />
              <main className="container font-prompt mx-auto max-w-7xl pt-6 px-6 flex-grow overflow-auto scroll-smooth scrollbar-hide ">

                {children}
              </main>
              <footer className="w-full flex items-center justify-center py-3">
                <Link
                  isExternal
                  className="flex items-center gap-1 text-current"
                  href="/"
                  title="heroui.com homepage"
                >
                  <span className="text-default-600">Develop by</span>
                  <p className="text-primary">NumChock</p>
                </Link>
              </footer>
            </div>
          </div>*/}