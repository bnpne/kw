import R from '../components/R'

import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <div className="b">
      <Component {...pageProps} />
      {Component?.canvas && <R>{Component.canvas(pageProps)}</R>}
    </div>
  )
}
