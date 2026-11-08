import ClapButton from "@/components/ClapButton";
import { delay } from "@/lib/utils";
import { BlogPost, BlogPostsResponse } from "@/models/BlogPost";
import { Metadata } from "next";
import { notFound } from "next/navigation";


interface BlogPostPageProps { params: { postId: string }; }

// Generate static params for each blog post page ==> before rendering to fast ==> the page load time
export async function generateStaticParams() {
  const response = await fetch("https://dummyjson.com/posts");
  const { posts }: BlogPostsResponse = await response.json();

  return posts.map(({ id }) => ({ postId: id.toString(), }));
}

// Get Posts Data from API
const GetPost = async (postId: string): Promise<BlogPost> => {
  const response = await fetch(`https://dummyjson.com/posts/${postId}`);
  if (!response.ok) { notFound(); }
  return response.json();
}

// Generate metadata for each blog post page
export async function generateMetadata({ params: { postId }, }: BlogPostPageProps): Promise<Metadata> {
  const post = await GetPost(postId);
  return {
    title: post.title,
    description: post.body,
    // openGraph: {
    //   images: [
    //     {
    //       url: post.imageUrl
    //     },
    //   ],
    // }
  };
}


export default async function BlogPostPage({ params: { postId }, }: BlogPostPageProps) {
  const post = await GetPost(postId);
  await delay(1000);

  return (
    <article className="max-w-prose m-auto space-y-5">
      <h1 className="text-3xl text-center font-bold">{post.title}</h1>
      <p className="text-lg">{post.body}</p>
      <ClapButton />
    </article>
  );
}
