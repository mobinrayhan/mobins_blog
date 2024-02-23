import fs from "fs";
import matter from "gray-matter";
import path from "path";

const postDirectory = path.join(process.cwd(), "posts");

export function getFileNames() {
  return fs.readdirSync(postDirectory);
}

export function getPostsData(postIdentifier) {
  const postSlug = postIdentifier.replace(/\.md$/, "");

  const filePath = path.join(postDirectory, `${postSlug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf-8");

  const { content, data } = matter(fileContent);

  const postData = {
    slug: postSlug,
    ...data,
    content,
  };

  return postData;
}

export function getAllPosts() {
  const postFiles = getFileNames();

  const allPosts = postFiles.map((post) => getPostsData(post));

  const sortedPost = allPosts.sort((postA, postB) =>
    postA.date > postB.date ? -1 : 0
  );

  return sortedPost;
}

export function getFeaturedPost() {
  const allPosts = getAllPosts();

  const featuredPost = allPosts.filter((post) => post.isFeatured);
  return featuredPost;
}
