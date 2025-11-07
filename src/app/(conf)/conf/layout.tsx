export default function ConfLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        conference site layout
        {children}
      </body>
    </html>
  )
}
