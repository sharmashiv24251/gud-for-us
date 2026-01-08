import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "App",
  description: "Independent app route",
};

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body style={{ margin: 0, padding: 0, background: "white", color: "black" }}>
        {children}
      </body>
    </html>
  );
}
