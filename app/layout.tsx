import type { Metadata } from "next";
import { Inter, Space_Grotesk, Cairo } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { cookies } from "next/headers";
import { I18nProvider } from "@/components/I18nProvider";

const inter = Inter({
  variable: "--font-main",
  subsets: ["latin"],
});

const cairo = Cairo({
  variable: "--font-main",
  subsets: ["arabic", "latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Codex | Premium Software Development",
  description: "Building the Future of Software. Web, Mobile, and SDLC Management.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const lang = cookieStore.get("i18next")?.value || "en";
  const isArabic = lang.startsWith("ar");
  const dir = isArabic ? "rtl" : "ltr";
  
  const mainFont = isArabic ? cairo : inter;
  return (
    <html
      lang={lang}
      dir={dir}
      suppressHydrationWarning
      className={`${mainFont.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className={`min-h-full flex flex-col font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <I18nProvider lang={lang}>
            <CustomCursor />
            {children}
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
