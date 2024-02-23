import AllPosts from "@/components/posts/all-posts";
import { DUMMY_POSTS } from "..";
import { getAllPosts } from "@/lib/post-util";
import Head from "next/head";

export default function AllPostsPage({ allPosts }) {
  return (
    <>
      <Head>
        <title>All posts</title>
        <meta
          content="A list of programming related blog posts"
          name="description"
        />
      </Head>
      <AllPosts posts={allPosts} />
    </>
  );
}

export function getStaticProps() {
  const allPosts = getAllPosts();

  return {
    props: { allPosts },
  };
}
