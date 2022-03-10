import PostCard from "../components/content/PostCard";
import { createClient } from "contentful";

export default function Home({ posts }) {
  return (
    <div>
      {console.log("contentful", posts)}
      {posts.map((post, index) => (
        <PostCard key={index} post={post} />
      ))}
    </div>
  );
}

export async function getStaticProps() {
  const client = createClient({
    space: process.env.SPACE,
    accessToken: process.env.ACCESS_TOKEN,
  });

  const response = await client.getEntries({ content_type: "chaooBlog" });

  return {
    props: {
      posts: response.items,
      revalidate: 1,
    },
  };
}
