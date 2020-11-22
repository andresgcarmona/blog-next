import Head from 'next/head'
import styles from '../styles/home.module.scss'
import { getAllPosts } from './lib/api'

export default function Index({ posts }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Andres Carmona</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <section className="posts">
          {posts.map(post => (
            <div className="text-lg font-bold">{post.data.title}</div>
            
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
  const posts = getAllPosts()

  return {
    props: { posts }
  }
}
