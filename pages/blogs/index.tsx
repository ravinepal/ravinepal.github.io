import type { NextPage } from 'next'
import { BlogCard } from '../../components/BlogCard'
import { Layout } from '../../components/Layout'
import { Blog, getAllBlogs } from '../../lib/api'
import Link from 'next/link'
interface BlogProps {
    blogs:Blog[]
}
const Blogs: NextPage<BlogProps> = ({blogs}) => {
  return (
    <Layout>
      <span style={{fontWeight:'normal'}}/>
      {blogs.map((blog) => (
          <Link key={blog.title} href={`/blogs/${blog.slug}`} passHref>
          <a>
          <BlogCard {...blog}/>
          </a>
          </Link>
      ))}

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

export default Blogs

export const getStaticProps = async () => {
    const blogs = getAllBlogs()
    return {
       props: {blogs},
    }
 }