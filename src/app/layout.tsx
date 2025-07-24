import type { Metadata } from "next";

//CSS and Fonts
import "./globals.css";
import { poppins, jetbrains, inter } from "@/lib/font";

/**
 * PROVIDER WRAPPER
 */
import { ThemeProvider } from "@/providers/theme-provider";
import { TanstackProvider } from "@/providers/tanstack-provider";
//context global state provider
import ContextProvider from "@/providers/context-provider";

export const metadata: Metadata = {
  title: {
    default: "HRIS | Login",
    template: "HRIS | %s"
  },
  description: "Developed by Joash Cabanilla"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrains.variable} ${poppins.variable} ${inter.className}`}
      suppressHydrationWarning
    >
      <head>
        <meta httpEquiv="cache-control" content="no-cache" />
        <meta httpEquiv="pragma" content="no-cache" />
        <meta httpEquiv="expires" content="0" />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TanstackProvider>
            <ContextProvider>{children}</ContextProvider>
          </TanstackProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
