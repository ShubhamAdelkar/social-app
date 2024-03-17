import { useUserContext } from "@/context/AuthContext";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { multiFormatDateString } from "@/lib/utils";
import { Models } from "appwrite";
import { Link } from "react-router-dom";
import PostStats from "./PostStats";
import { useState } from "react";

type PostCardProps = {
  post: Models.Document;
};

type ReactImageEventHandler = React.SyntheticEvent<HTMLImageElement>;

const PostCard = ({ post }: PostCardProps) => {
  const [imageUrl, setImageUrl] = useState(post.imageUrl);

  const handleError = (e: ReactImageEventHandler) => {
    setImageUrl("/assets/images/side-img.jpeg");
    (e.target as HTMLImageElement).onerror = null;
  };

  const { user } = useUserContext();
  if (!post.creator) return;

  return (
    <div className="post-card">
      <div className="flex-between p-4">
        <div className="flex items-center gap-3">
          {/* <Link to={`/profile/${post.creator.$id}`}> */}
            <img
              src={
                post?.creator?.imageUrl ||
                "/assets/icons/profile-placeholder.svg"
              }
              alt="creator"
              className="rounded-full w-10 lg:h-11 lg:w-11"
            />
          {/* </Link> */}

          <div className="flex flex-col">
            <p className="base-medium lg:body-bold text-light-1">
              {post.creator.name}
            </p>
            <div className="flex-start gap-2 text-light-3">
              <p className="subtle-semibold lg:small-regular">
                {post.location}
              </p>
            </div>
          </div>
        </div>

        <Link
          to={`/update-post/${post.$id}`}
          className={`${user.id !== post.creator.$id && "hidden"}`}
        >
          <img
            src="/assets/icons/edit.svg"
            alt="edit"
            className="lg:w-6 lg:h-6 h-5 w-5"
          />
        </Link>
      </div>

      <Link to={`/posts/${post.$id}`}>
        <div className="small-medium lg:base-medium p-3 border-t border-dark-4">
          <p>{post.caption}</p>
          <ul className="flex gap-1.5">
            {post.tags.map((tag: string) => (
              <li key={tag} className="text-light-4">
                #{tag}
              </li>
            ))}
          </ul>
        </div>
        <LazyLoadImage
          src={imageUrl}
          alt="post-image"
          effect="blur"
          className="post-card_img"
          onError={handleError}
        />
      </Link>
      <p className="subtle-semibold  lg:small-regular text-light-4 px-3">
        {multiFormatDateString(post.$createdAt)}
      </p>
      <PostStats post={post} userId={user.id} />
    </div>
  );
};

export default PostCard;
