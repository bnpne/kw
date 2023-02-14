import { useRouter } from 'next/router'
import { useEffect, useState, useCallback, useRef } from 'react'
import normalizeWheel from 'normalize-wheel'
import Layout from '../../components/Layout'
import { IMG_ARRAY as el } from '../../lib/data'
import Image from 'next/image'

export default function Case() {
  const router = useRouter()
  const { query } = router
  const cRef = useRef(null)
  const [element, setElement] = useState(null)
  const [play, setPlay] = useState(false)
  const [target, setTarget] = useState(0)

  useEffect(() => {
    const a = el.filter((f) => f.slug === query.page)
    setElement(a[0])
  }, [])

  const onScroll = (e) => {
    const { pixelY, pixelX } = normalizeWheel(e)

    const relativeSpeed = Math.min(
      100,
      Math.max(Math.abs(pixelX), Math.abs(pixelY))
    )

    const scrollSpeed = relativeSpeed * 0.01
    let direction = 'U'

    if (pixelY > 0) {
      direction = 'U'
    } else {
      direction = 'D'
    }

    if (cRef.current) {
      let newTarget = target + (direction === 'U' ? scrollSpeed : -scrollSpeed)
      newTarget = Math.min(85, Math.max(0, newTarget))
      setTarget(newTarget)
    }

    cRef.current.style = `transform: translateY(-${target}%)`

    // // Update position
    // imagesPosRef.current.forEach((_, i) => {
    //   const bottomBoundary = i * -(defaultHeight + defaultGap)
    //   const topBoundary = bottomBoundary + scrollLimit
    //
    //   let target =
    //     imagesPosRef.current[i].targetY +
    //     (direction === 'U' ? scrollSpeed : -scrollSpeed)
    //   target = Math.max(bottomBoundary, Math.min(topBoundary, target))
    //   imagesPosRef.current[i].targetY = target
    // })
    // invalidate()
  }

  useEffect(() => {
    window.addEventListener('wheel', onScroll)
    return () => {
      window.removeEventListener('wheel', onScroll)
    }
  }, [onScroll])

  return (
    <Layout>
      <div ref={cRef} className="c">
        {/* Video */}
        {!element ? (
          <p>LOADING...</p>
        ) : (
          <>
            {element.vid && (
              <div className="p-v">
                <iframe
                  src={`https://player.vimeo.com/video/${element.vid}?loop=true&autoplay=true&muted=false&gesture=media&playsinline=true&byline=false&portrait=false&title=false&transparent=false`}
                  frameBorder="0"
                ></iframe>
              </div>
            )}
            {element.stills.map((still, i) => (
              <div className="p-v">
                <Image
                  key={i}
                  src={still}
                  alt={1}
                  width={1600}
                  height={900}
                  objectFit="cover"
                  // layout="fill"
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPct29/PQAHOQK8WRZzEQAAAABJRU5ErkJggg=="
                />
              </div>
            ))}
          </>
        )}
      </div>
    </Layout>
  )
}
