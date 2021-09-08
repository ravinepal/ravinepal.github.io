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

export function getBlugBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(blogDirectory, `${realSlug}.md`)
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

export function getAllBlpgs(fields: string[] = []) {
  const slugs = getBlogSlug()
  const portfolio = slugs
    .map((slug) => getBlugBySlug(slug, fields))
    // sort portfolio by date in descending order
    .sort((portfolio1, portfolio2) => (portfolio1.date > portfolio2.date ? -1 : 1))
  return portfolio
}