import type { NextPage } from 'next'
import { Layout } from '../components/Layout'
import Head from 'next/head'
const Contact: NextPage = () => {
  return (
    <Layout>
       <Head>
        <title>Contact</title>
        </Head>
      <span style={{fontWeight:'normal'}}/>
<p> <br/> Here are a few ways to contact Ravi: <br/></p>

<ul>
  <li>Email: contact[at]ravinepal.com</li>
  <p></p> 
<li>Twitter: <a href="https://twitter.com/RaviNepal" rel="noreferrer" target="_blank">RaviNepal</a></li>
  <p></p>
<li>LinkedIn: <a href="https://www.linkedin.com/in/ravinepal" rel="noreferrer" target="_blank">RaviNepal</a></li>
  <p></p>
<li>Instagram: <a href="https://www.instagram.com/ravinepal/" rel="noreferrer" target="_blank">RaviNepal</a></li>
  <p></p>
<li>Facebook: <a href="https://www.facebook.com/RaviKNepal" rel="noreferrer" target="_blank">RaviKNepal</a></li>
  <p></p> 

</ul>
<br></br><br></br><br></br><br></br><br></br><br></br>
    </Layout>
  )
}

export default Contact
