import Link from "next/link";
import Image from "next/image";
import moment from "moment";

const PostCard = ({ post }) => {
  const { title, slug, summary, thumbnail } = post.fields;

  console.log("post", post);

  return (
    <div className="post-card">
      <Link href={`post/${slug}`}>
        <div className="details">
          <div className="info">
            <h2>{title}</h2>
            <p>{summary}</p>
            <p className="date">
              Added: {moment(post.sys.createdAt).fromNow()}
            </p>
          </div>
          <div className="thumbnail">
            {thumbnail ? (
              <Image
                src={"https:" + thumbnail.fields.file.url}
                width="100%"
                height="100%"
                layout="responsive"
                objectFit="contain"
              />
            ) : null}
          </div>
        </div>
      </Link>

      <style jsx>{`
        .post-card {
          background: rgba(243, 244, 246, 1);
          padding: 9px 20px;
          margin-bottom: 30px;
          cursor: pointer;
          border-radius: 7px;
        }
        .details {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .info {
          flex: 2;
          padding-right: 7px;
        }
        .thumbnail {
          flex: 1;
        }
        .date {
          color: gray;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default PostCard;
