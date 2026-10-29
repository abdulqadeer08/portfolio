import type { Metadata, Viewport } from "next";
import { Geist_Mono, Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { fullName, site } from "@/data/portfolio";
import { Footer } from "@/components/layout/footer";
import { FooterReveal } from "@/components/layout/footer-reveal";
import { InlineScript } from "@/components/layout/inline-script";
import { Navbar } from "@/components/layout/navbar";
import { Preloader } from "@/components/layout/preloader";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { accentPresets } from "@/lib/accents";

// Plus Jakarta Sans for headings, Inter for reading text, a mono for small labels.
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s — ${fullName}`,
  },
  description: site.description,
  keywords: site.keywords,
  authors: [{ name: fullName }],
  creator: fullName,
  openGraph: {
    type: "website",
    title: site.title,
    description: site.description,
    siteName: fullName,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: accentPresets[site.accent].bg },
    { media: "(prefers-color-scheme: light)", color: accentPresets[site.accent].lightBg },
  ],
};

// Applies the saved theme before first paint, so there is no flash.
const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="dark"
      data-accent={site.accent}
      suppressHydrationWarning
      className={`${jakarta.variable} ${inter.variable} ${geistMono.variable} antialiased`}
    >
      <head>
        <InlineScript html={themeScript} />
      </head>
      <body>
        <SmoothScroll>
          <Preloader />
          <Navbar />
          <main className="relative z-10 bg-bg shadow-[0_40px_100px_-30px_rgba(0,0,0,0.7)] lg:overflow-clip lg:rounded-b-[3rem]">
            {children}
          </main>
          <FooterReveal>
            <Footer />
          </FooterReveal>
        </SmoothScroll>
        <div aria-hidden className="grain" />
      </body>
    </html>
  );
}
