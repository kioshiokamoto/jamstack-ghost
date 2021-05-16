import Head from 'next/head';
import Link from 'next/link';
import { getPosts } from '../lib/functions';

export default function Home(props) {
	return (
		<div>
			<Head>
				<title>JAMSTACK GHOST</title>
				<meta name="description" content="Okamoto JAMSTACK - GHOST" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<ul>
				{props.posts.map((post) => (
					<li key={post.id}>
						<Link href={`/posts/${post.slug}`}>
							<a>{post.title}</a>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}

export async function getStaticProps(context) {
	const posts = await getPosts();

	if (!posts) {
		return {
			notFound: true,
		};
	}

	return {
		props: { posts },
		revalidate: 1,
	};
}
