import EcommerceThemeProvider from "@/theme/theme-provider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "E-commerce",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <EcommerceThemeProvider>
          {children}
        </EcommerceThemeProvider>
      </body>
    </html>
  );
}
