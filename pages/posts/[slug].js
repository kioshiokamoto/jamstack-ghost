import { getSinglePost, getPosts } from '../../lib/functions';

function SinglePost(props) {
	return (
		<div>
			<img src={props.post.feature_image} />
			<h1>{props.post.title}</h1>
			<div dangerouslySetInnerHTML={{ __html: props.post.html }} />
		</div>
	);
}

export default SinglePost;

export async function getStaticPaths() {
	const posts = await getPosts();

	const paths = posts.map((post) => ({
		params: { slug: post.slug },
	}));

	return {
		paths,
		fallback: false,
	};
}

export async function getStaticProps(context) {
	const post = await getSinglePost(context.params.slug);
	if (!post) {
		return {
			notFound: true,
		};
	}
	return {
		props: { post },
		revalidate: 1,
	};
}
