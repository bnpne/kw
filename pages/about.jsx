import Layout from '../components/Layout'

export default function About() {
  return (
    <Layout>
      <div className="c grid">
        <p>
          Kato is a China-born director of photography based in Salt Lake City,
          UT and Hong Kong. He grew up in Hong Kong and wanted to be a nurse,
          now he shoots music videos and commercials.
        </p>
        <p>
          黃嘉濤是一位攝影指導，現居於香港和鹽湖城。中國出生，於香港成長；曾想成為護士，但現在拍MV和廣告。
        </p>
        <ul>
          <li>
            <a href="mailto:kato@moodyashell.com">E: kato@moodyashell.com</a>
          </li>
          <li>
            <a href="tel:+13852215038">T: +1 (385) 221-5038</a>
          </li>
          <li >
            <a href="https://www.instagram.com/katowong3/">I: KATOWONG3</a>
          </li>
        </ul>
      </div>
    </Layout>
  )
}
