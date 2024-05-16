import SnackbarProvider from "@/components/notistack";
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
        <SnackbarProvider>
          <EcommerceThemeProvider>
            {children}
          </EcommerceThemeProvider>
        </SnackbarProvider>
      </body>
    </html>
  );
}
