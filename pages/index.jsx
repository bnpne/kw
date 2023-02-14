import Layout from '../components/Layout'
import Link from 'next/link'
import { IMG_ARRAY as el } from '../lib/data'
import { useCaseStore } from '../lib/store'
import R from '../components/R'
import Scene from '../components/Scene'
export default function Home() {
  const [currentCard] = useCaseStore((state) => [state.currentCard])

  return (
    <>
      <Layout>
        <div className="c">
          <div className="tc">
            <div className="te">{el[currentCard].title}</div>
          </div>
        </div>
        <Link href={`/w/${el[currentCard].slug}`} className="p"></Link>
      </Layout>
      <R>
        <Scene />
      </R>
    </>
  )
}
