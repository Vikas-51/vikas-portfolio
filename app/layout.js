import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "../components/LenisProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Vikas Prajapat | Frontend Developer & UI/UX Designer",
  description: "Frontend Developer & UI/UX Designer with 11 months of experience building 60fps, interactive, SEO-optimised web applications using Next.js, React.js, and GSAP.",
  keywords: ["Vikas Prajapat", "Frontend Developer", "UI/UX Designer", "Next.js", "React.js", "GSAP Animations", "Three.js Portfolio", "SwellSign", "Sukrut"],
  authors: [{ name: "Vikas Prajapat" }],
  openGraph: {
    title: "Vikas Prajapat | Frontend Developer & UI/UX Designer",
    description: "Frontend Developer & UI/UX Designer with 11 months of experience building 60fps, interactive, SEO-optimised web applications using Next.js, React.js, and GSAP.",
    url: "https://github.com/Vikas-51",
    siteName: "Vikas Prajapat Portfolio",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <body className="min-h-full text-zinc-50 font-sans selection:bg-orange-500/30">
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
