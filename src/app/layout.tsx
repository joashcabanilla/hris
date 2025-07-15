import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";

//CSS and Fonts
import "./globals.css";
import { poppins, jetbrains, inter } from "@/lib/font";

//context global state
import ThemeContextProvider from "@/context/theme";

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
          <ThemeContextProvider>{children}</ThemeContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
