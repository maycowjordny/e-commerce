import { ContextProvider } from "@/Context/filter-context";
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
        <ContextProvider>
          <SnackbarProvider>
            <EcommerceThemeProvider>
              {children}
            </EcommerceThemeProvider>
          </SnackbarProvider>
        </ContextProvider>
      </body>
    </html>
  );
}
