export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "FEC-RA Portal ",
  description: "RA Department Portal Web Application",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Employee",
      href: "/docs",
    },
    {
      label: "Pricing",
      href: "/pricing",
    },
    {
      label: "Blog",
      href: "/blog",
    },
    {
      label: "About",
      href: "/about",
    },
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Partlist",
      href: "/partlist",
    },
    {
      label: "Robot PRM",
      href: "/robot/prm",
    },
    {
      label: "Robot Anodize",
      href: "/robot/ano",
    },
    {
      label: "Robot PPP",
      href: "/robot/ppp",
    },
    {
      label: "Robot HTP",
      href: "/robot/htp",
    },
    {
      label: "Robot PNT",
      href: "/robot/pnt",
    },
  ],
  links: {
    github: "https://github.com/heroui-inc/heroui",
    twitter: "https://twitter.com/hero_ui",
    docs: "https://heroui.com",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
