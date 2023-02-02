import Layout from '../components/Layout'
import dynamic from 'next/dynamic'
import Link from 'next/link'

import { IMG_ARRAY as el } from '../lib/data'
import { useCaseStore } from '../lib/store'
const Scene = dynamic(() => import('../components/Scene'), { ssr: false })

export default function Home() {
  const [currentCard] = useCaseStore((state) => [state.currentCard])

  return (
    <Layout>
      <div className="c">
        <div className="tc">
          <div className="te">{el[currentCard].title}</div>
        </div>
      </div>
      <Link href={`/w/${el[currentCard].slug}`} className="p"></Link>
    </Layout>
  )
}

Home.canvas = () => <Scene />
