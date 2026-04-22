export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <h1>Sidebar Dashboard</h1>
        {children}
    </>
  );
}
