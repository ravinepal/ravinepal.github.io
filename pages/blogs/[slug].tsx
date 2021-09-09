import type { NextPage } from 'next'
import { Params } from 'next/dist/server/router'
import { BlogDetail } from '../../components/BlogDetail'
import { Layout } from '../../components/Layout'
import { Blog, getAllBlogs, getBlogBySlug } from '../../lib/api'
import markdownToHtml from '../../lib/markdownToHtml'
import Head from 'next/head'
interface BlogDetailsProps {
    blog:Blog
}
const BlogDetails: NextPage<BlogDetailsProps> = ({blog}) => {
  return (
    <Layout>
      <Head>
        <title>{blog?.title}</title>
      <meta
        name="description"
        content={blog?.excerpt}
      />
      <meta property="og:image" content={blog?.ogImage?.url} />
        </Head>
      <BlogDetail {...blog} />
    </Layout>
  )
}

export default BlogDetails

export async function getStaticProps({ params }: Params) {
    const blog = getBlogBySlug(params.slug)
    const content = await markdownToHtml(blog.content || '')
  
    return {
      props: {
        blog: {
          ...blog,
          content,
        },
      },
    }
  }
  
  export async function getStaticPaths() {
    const blogs = getAllBlogs()
    return {
      paths: blogs.map((blogs) => {
        return {
          params: {
            slug: blogs.slug,
          },
        }
      }),
      fallback: false,
    }
  }
  