import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

const postsDir = join(process.cwd(), '_posts')

export function getPostsSlugs() {
  return fs.readdirSync(postsDir)
}

export function getPostBySlug(slug) {
  const filename = slug.replace(/\.md$/, '')
  const path = join(postsDir, `${filename}.md`)
  const fileContent = fs.readFileSync(path, 'utf8')
  const { data, content } = matter(fileContent)

  data.slug = filename

  const items = {}

  return { data, content }
}

export function getAllPosts() {
  const slugs = getPostsSlugs()
  const posts = slugs.map(slug => getPostBySlug(slug))

  return posts
}