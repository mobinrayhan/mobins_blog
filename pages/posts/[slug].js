import PostContent from "@/components/posts/post-details/post-content";
import { getFileNames, getPostsData } from "@/lib/post-util";
import Head from "next/head";

export default function SinglePostPage({ post }) {
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="content" content={post.excerpt} />
      </Head>
      <PostContent post={post} />
    </>
  );
}

export function getStaticProps({ params }) {
  const post = getPostsData(params.slug);

  return {
    props: {
      post,
    },

    revalidate: (60 * 60) / 2, // Half an hour
  };
}

export function getStaticPaths() {
  const allFileNames = getFileNames();

  const postParams = allFileNames.map((name) => ({
    params: { slug: name.replace(/\.md$/, "") },
  }));

  return {
    paths: postParams,
    fallback: "blocking",
  };
}
