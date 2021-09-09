import type { NextPage } from 'next'
import { BlogCard } from '../../components/BlogCard'
import { Layout } from '../../components/Layout'
import { Blog, getAllBlogs } from '../../lib/api'
import Link from 'next/link'
import Head from 'next/head'
interface BlogProps {
    blogs:Blog[]
}
const Blogs: NextPage<BlogProps> = ({blogs}) => {
  return (
    <Layout>
      <Head>
        <title>Blogs</title>
        </Head>
      <span style={{fontWeight:'normal'}}/>
      {blogs.map((blog) => (
          <Link key={blog.title} href={`/blogs/${blog.slug}`} passHref>
          <a>
          <BlogCard {...blog}/>
          </a>
          </Link>
      ))}
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
