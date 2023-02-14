import { useRef, useState, useEffect, Fragment } from 'react'

function Transition({ Component, pageProps }) {
  const current = useRef()
  const next = useRef()
  const height = useRef()

  const [components, setComponents] = useState([Component])
  const [lifecycle, setLifecycle] = useState('starting')

  useEffect(() => {
    Component.pageProps = pageProps
  }, [])

  useEffect(() => {
    if (!Component) return

    setComponents((data) => [data[0], Component])
    Component.pageProps = pageProps
  }, [Component])

  useEffect(() => {
    if (components.length === 1 && lifecycle === 'starting') {
      window.scrollTo(0, 0)
    }
    if (components.length === 1 && lifecycle !== 'starting')
      return setLifecycle('resting')
    if (lifecycle === 'transitioning' || components.length < 1) return
    setLifecycle('transitioning')
  }, [components])

  useEffect(() => {
    console.log(lifecycle)
  }, [lifecycle])

  return (
    <>
      {components.map((Page, id) => {
        return (
          Page !== null && (
            <Fragment
              key={Page.render ? Page.render.displayName : Page.displayName}
            >
              <Page
                ref={(node) =>
                  id === 0 ? (current.current = node) : (next.current = node)
                }
                // style={getPosition(id)}
                {...Page.pageProps}
              />
            </Fragment>
          )
        )
      })}
    </>
  )
}

export default Transition
