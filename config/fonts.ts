import { Fira_Code as FontMono, Inter as FontSans } from "next/font/google";
import { Prompt } from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const fontPrompt = Prompt({
  subsets: ["thai"],
  weight:["400","500","700"],
  variable: "--font-prompt",
  display: "swap",
})
