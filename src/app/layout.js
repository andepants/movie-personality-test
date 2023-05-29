import './globals.css'

export const metadata = {
  title: 'Movie Personality Test',
  description: 'Determines a user&#39;s personality and recommends 5 movies they should watch',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
