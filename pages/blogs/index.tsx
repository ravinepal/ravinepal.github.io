import type { NextPage } from 'next'
import { Layout } from '../../components/Layout'

const Home: NextPage = () => {
  return (
    <Layout>
      <span style={{fontWeight:'normal'}}/>

<p> <br/> Ravi often blogs on: <br/></p>

<ul>
<li> <a href="https://medium.com/ravinepal" target="blank"> Medium</a> </li>
  <p></p>
  <li> <a href="http://blogs.worldbank.org/team/ravi-kumar" target="blank"> World Bank</a> </li>
    <p></p>
   <li> <a href="http://www.huffingtonpost.com/author/kumarav4-839" target="blank"> The Huffington Post</a> </li>

    </ul>
    </Layout>
  )
}

export default Home
