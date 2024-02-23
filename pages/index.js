import FeaturedPost from "@/components/home-pages/featured-posts";
import Hero from "@/components/home-pages/hero";
import { getFeaturedPost } from "@/lib/post-util";
import Head from "next/head";

export default function HomePage({ featuredPosts }) {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="I write blog about programming video editing and web development . specifically frontend development"
        />
      </Head>
      <Hero />
      <FeaturedPost posts={featuredPosts} />
    </>
  );
}

export function getStaticProps() {
  const featuredPosts = getFeaturedPost();

  return {
    props: {
      featuredPosts,
    },
  };
}
