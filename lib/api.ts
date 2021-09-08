import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

const projectsDirectory = join(process.cwd(), '_projects')
const blogDirectory = join(process.cwd(), '_blog')

export function getProjectSlug() {
  return fs.readdirSync(projectsDirectory)
}

export function getProjectById(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(projectsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  type Items = {
    [key: string]: string
  }

  const items: Items = {}

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug
    }
    if (field === 'content') {
      items[field] = content
    }

    if (data[field]) {
      items[field] = data[field]
    }
  })

  return items
}

export function getAllProjects(fields: string[] = []) {
  const slugs = getProjectSlug()
  const portfolio = slugs
    .map((slug) => getProjectById(slug, fields))
    // sort portfolio by date in descending order
    .sort((portfolio1, portfolio2) => (portfolio1.date > portfolio2.date ? -1 : 1))
  return portfolio
}


export function getBlogSlug() {
  return fs.readdirSync(blogDirectory)
}

export interface Blog {
  title:string,
  excerpt: string,
  coverImage:{
    url:string,
    credits:string
  },
  tags: string[],
  author: {
    name:string,
    email:string,
    picture:string
  },
  ogImage:{
    url:string
  }
  content: string
  slug:string
  date:string
}
export function getBlogBySlug(slug: string):Blog {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(blogDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  return {...data,slug:realSlug,content} as Blog
}


export function getAllBlogs() {
  const slugs = getBlogSlug()
  const blog = slugs
    .map((slug) => getBlogBySlug(slug))
    // sort blog by date in descending order
    .sort((blog1, blog2) => (blog1.date > blog2.date ? -1 : 1))
  return blog
}