import Head from 'next/head'
import styles from '../styles/home.module.scss'
import { getAllPosts } from './lib/api'
import mdToHtml from './lib/mdToHtml'
import highlight from 'highlight.js'
import php from 'highlight.js/lib/languages/php'
import 'highlight.js/styles/dracula.css'
import { useEffect } from 'react'

highlight.registerLanguage('php', php)

export default function Index({ posts }) {
  useEffect(() => {
    highlight.initHighlighting()
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Andres Carmona</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <section className="posts">
          {posts.map(post => (
            <div key={post.data.slug} className="container max-w-2xl px-3 md:px-0 pb-10 mb-10 border-b border-gray-200">
              <div className="text-5xl font-semibold mb-4">{ post.data.title }</div>
              <div className="content" dangerouslySetInnerHTML={{__html: post.content }}></div>
            </div>
          ))}
        </section>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}

export async function getStaticProps() {
  let posts = getAllPosts()
  
  return Promise.all(posts.map(async post => {
    post.content = await mdToHtml(post.content)

    return post
  })).then(posts => {
    return {
      props: { posts }
    }
  })
}
