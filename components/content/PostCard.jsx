import Link from "next/link";
import Image from "next/image";

const PostCard = ({ post }) => {
  const { title, slug, summary, thumbnail } = post.fields;

  console.log("post", post);

  return (
    <div className="post-card">
      <Link href={`post/${slug}`}>
        <div>
          <div className="thumbnail">
            {thumbnail ? (
              <Image
                src={"https:" + thumbnail.fields.file.url}
                width={thumbnail.fields.file.details.image.width}
                height={thumbnail.fields.file.details.image.height}
              />
            ) : null}
          </div>
          <h2>{title}</h2>
          <p>{summary}</p>
        </div>
      </Link>

      <style jsx>{`
        .post-card {
          border: 2px solid gray;
          padding: 9px;
          margin-bottom: 30px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default PostCard;
