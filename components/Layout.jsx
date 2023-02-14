import Link from 'next/link'

export default function Layout({ children }) {
  return (
    <section className="m">
      <div className="ab nav">
        <Link href="/">KATO WONG</Link>
        <Link href="/about">ABOUT</Link>
      </div>
      <div className="ab s">{children}</div>
    </section>
  )
}
