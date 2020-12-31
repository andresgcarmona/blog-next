import ErrorPage from 'next/error'
import Head from 'next/head'
import Layout from '../../components/layout'
import Container from '../../components/container'
import Header from '../../components/header'
import PostTitle from '../../components/post-title'
import PostHeader from '../../components/post-header'
import PostBody from '../../components/post-body'
import mdToHtml from '../../lib/mdToHtml'
import { useRouter } from 'next/router'
import { getAllPosts, getPostBySlug } from '../../lib/api'

export default function Post({ post, morePosts, preview }) {
  const router = useRouter()
  
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  
  return (
    <Layout preview={preview}>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading...</PostTitle>
        ) : (
          <article className="mb-32">
            <Head>
              <title>{post.title} | Blog</title>
              <meta property="og:image" content={post.ogImage.url} />
            </Head>
            
            <PostHeader
              title={post.title}
              coverImage={post.coverImage}
              date={post.date}
              author={post.author} />
              
              <PostBody content={post.content} />
          </article>
        )}
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'ogImage',
    'coverImage',
  ])
  
  const content = await mdToHtml(post.content || '')
  
  return {
    props: {
      post: {
        ...post,
        content,
      }
    }
  }
}

export async function getStaticPaths() {
  const posts = getAllPosts(['slug'])
  
  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: false,
  }
}
