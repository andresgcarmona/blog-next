import Head from 'next/head'
import { getAllPosts } from '../lib/api'
import highlight from 'highlight.js'
import php from 'highlight.js/lib/languages/php'
import 'highlight.js/styles/dracula.css'
import { useEffect } from 'react'
import UserHeader from '../components/user-header'
import Layout from '../components/layout'
import Container from '../components/container'

highlight.registerLanguage('php', php)

export default function Index({ posts }) {
	useEffect(() => {
		highlight.initHighlighting()
	}, [])
	
	const heroPost  = posts[0]
	const morePosts = posts.slice(1)
	
	return (
		<>
			<Layout>
				<Head>
					<title>Andres Carmona</title>
					<link rel="icon" href="/favicon.ico"/>
				</Head>
				
				<Container>
					<UserHeader />
					
					<section className="posts">
						{posts.map(post => (
							<div key={post.slug} className="container max-w-2xl px-3 md:px-0 pt-10 mt-10 border-t border-gray-200">
								<div className="mb-4">
									<a href={post.slug} className="text-3xl font-semibold">{post.title}</a>
								</div>
								{/* <div className="content" dangerouslySetInnerHTML={{__html: post.content }}></div> */}
								<div>{post.excerpt}</div>
							</div>
						))}
					</section>
				</Container>
			</Layout>
		</>
	)
}

export async function getStaticProps() {
	const posts = getAllPosts([
		'title',
		'date',
		'slug',
		'author',
		'coverImage',
		'excerpt',
	])
	
	return {
		props: { posts },
	}
}
