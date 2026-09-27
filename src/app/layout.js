import './globals.css'

export const metadata = {
  title: 'Rahul Saini | Creative Developer',
  description: 'Portfolio of Rahul Saini — Undergraduate student and creative web developer.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased selection:bg-indigo-600/40 selection:text-white font-sans bg-[#06080d] text-slate-100">
        {children}
      </body>
    </html>
  )
}
