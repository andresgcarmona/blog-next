import Head from 'next/head'
import { getAllPosts } from '../lib/api'
import UserHeader from '../components/user-header'
import Layout from '../components/layout'
import Container from '../components/container'
import Link from 'next/link'
import DateFormatter from '../components/date-formatter'
import Header from '../components/header'

export default function Index({ posts }) {
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
							<div key={post.slug} className="container max-w-2xl px-3 md:px-0 pt-6 mt-6 border-t border-gray-200">
								<div className="mb-4">
									<Link as={`/posts/${post.slug}`} href="/posts/[slug]">
										<a className="text-3xl font-semibold text-gray-800 hover:text-indigo-700 transition duration-150">{post.title}</a>
									</Link>
									<div className="mt-2 mb-6 text-gray-500 text-sm">
										<DateFormatter dateString={post.date} />
									</div>
								</div>
								{/* <div className="content" dangerouslySetInnerHTML={{__html: post.content }}></div> */}
								<div className="text-gray-600">{post.excerpt}</div>
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
