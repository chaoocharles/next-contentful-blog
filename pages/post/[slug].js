import { useRouter } from "next/router";
import Image from "next/image";
import { createClient } from "contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import Highlight from "react-highlight";
import "highlight.js/styles/a11y-dark.css";

const Post = ({ post }) => {
  const router = useRouter();

  const { title, summary, content, thumbnail } = post.fields;

  const renderOptions = {
    renderNode: {
      [BLOCKS.EMBEDDED_ENTRY]: (node, children) => {
        // target the contentType of the EMBEDDED_ENTRY to display as you need
        if (node.data.target.sys.contentType.sys.id === "codeBlock") {
          return (
            <Highlight className="javascript">
              <pre>
                <code>{node.data.target.fields.codeContent}</code>
              </pre>
            </Highlight>
          );
        }
      },

      [BLOCKS.EMBEDDED_ASSET]: (node, children) => {
        // render the EMBEDDED_ASSET as you need
        return (
          <img
            src={`https://${node.data.target.fields.file.url}`}
            height="auto"
            width={node.data.target.fields.file.details.image.width}
            alt={node.data.target.fields.description}
          />
        );
      },
    },
  };

  if (!post) return <div>Getting content...</div>;

  return (
    <div className="blog-content">
      <button className="back-btn" onClick={() => router.back()}>
        Back
      </button>
      <article>
        {thumbnail ? (
          <Image
            src={"https:" + thumbnail.fields.file.url}
            width={thumbnail.fields.file.details.image.width}
            height={thumbnail.fields.file.details.image.height}
          />
        ) : null}
        <header>
          <h1>{title}</h1>
          <p>{summary}</p>
        </header>
        <section className="article">
          {documentToReactComponents(content, renderOptions)}
        </section>
      </article>

      <style jsx>{`
        .blog-content {
          background: rgba(243, 244, 246, 1);
          padding: 20px;
          border-radius: 7px;
        }
        .back-btn {
          cursor: pointer;
          outline: none;
          border: none;
          background: black;
          padding: 7px 12px;
          border-radius: 3px;
          color: white;
          margin-bottom: 2rem;
        }
        .thumbnail {
          margin: 20px 0;
        }
      `}</style>
    </div>
  );
};

export default Post;

const client = createClient({
  space: process.env.SPACE,
  accessToken: process.env.ACCESS_TOKEN,
});

export async function getStaticProps({ params }) {
  const response = await client.getEntries({
    content_type: "chaooBlog",
    "fields.slug": params.slug,
  });

  return {
    props: {
      post: response.items[0],
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const response = await client.getEntries({ content_type: "chaooBlog" });

  const paths = response.items.map((item) => {
    return { params: { slug: item.fields.slug } };
  });

  return {
    paths: paths,
    fallback: true,
  };
}
