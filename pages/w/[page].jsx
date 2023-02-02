import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { IMG_ARRAY as el } from '../../lib/data'

export default function Case() {
  const router = useRouter()
  const { query } = router
  const [element, setElement] = useState(null)
  const [play, setPlay] = useState(false)

  useEffect(() => {
    setElement(el[query.page])
  }, [])

  return (
    <Layout>
      <div className="c">
        {/* Video */}
        {element && (
          <div className="p-v">
            {element.vid &&
              (play ? (
                <iframe
                  src={`https://player.vimeo.com/video/${element.vid}?loop=true&autoplay=true&muted=false&gesture=media&playsinline=true&byline=false&portrait=false&title=false&transparent=false`}
                  frameBorder="0"
                ></iframe>
              ) : (
                <Image
                  onClick={() => setPlay(true)}
                  className="p-v-o"
                  src={element.src}
                  objectFit="cover"
                  layout="fill"
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPct29/PQAHOQK8WRZzEQAAAABJRU5ErkJggg=="
                />
              ))}
          </div>
        )}
      </div>
    </Layout>
  )
}