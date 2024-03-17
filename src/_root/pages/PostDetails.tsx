import { Button } from "@/components/ui/button";
import PostStats from "@/components/ui/shared/PostStats";
import { useUserContext } from "@/context/AuthContext";
import { useGetPostById } from "@/lib/react-query/queriesAndMutations";
import { multiFormatDateString } from "@/lib/utils";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link, useParams } from "react-router-dom";

const PostDetails = () => {
  const { id } = useParams();
  const { data: post, isPending } = useGetPostById(id || "");
  const { user } = useUserContext();

  const handleDeletePost = () => {};

  return (
    <div className="post_details-container">
      <div className="post_details-card">
        <iframe
          className=""
          src="https://open.spotify.com/embed/track/7MXVkk9YMctZqd1Srtv4MB?utm_source=generator"
          width="100%"
          height="152"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
      </div>
      {isPending ? (
        <ul className="flex flex-col flex-1 gap-0 w-full">
          {Array.from({ length: 1 }).map((_, index) => (
            <li key={index} className="flex justify-center w-full">
              <div className="placeholder-post_details"></div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="post_details-card">
          <h3 className="h3-bold md:h2-bold text-left w-full">
            {post?.creator.name}'s Post
          </h3>
          <LazyLoadImage
            src={post?.imageUrl}
            alt="post"
            effect="blur"
            className="post_details-img"
          />
          <div className="post_details-info">
            <div className="flex-between w-full">
              <Link
                to={`/profile/${post?.creator.$id}`}
                className="flex items-center gap-2"
              >
                <LazyLoadImage
                  src={
                    post?.creator?.imageUrl ||
                    "/assets/icons/profile-placeholder.svg"
                  }
                  effect="blur"
                  alt="creator"
                  className="rounded-full w-10 lg:h-14 lg:w-14"
                />

                <div className="flex flex-col">
                  <p className="base-medium lg:body-bold text-light-1">
                    {post?.creator.name}
                  </p>
                  <div className="flex flex-col gap-1 text-light-3">
                    <p className="subtle-semibold lg:small-regular">
                      {post?.location}
                    </p>
                    <p className="tiny-medium lg:subtle-semibold text-light-4">
                      {multiFormatDateString(post?.$createdAt)}
                    </p>
                  </div>
                </div>
              </Link>

              <div className="flex-center">
                <Link
                  to={`/update-post/${post?.id}`}
                  className={`${user.id !== post?.creator.$id && "hidden"}`}
                >
                  <img
                    src="/assets/icons/edit.svg"
                    alt="edit"
                    className="lg:w-6 lg:h-6 h-5 w-5"
                  />
                </Link>

                <Button
                  onClick={handleDeletePost}
                  variant="ghost"
                  className={`ghost_details-delete_btn ${
                    user.id !== post?.creator.$id && "hidden"
                  }`}
                >
                  <img
                    src="/assets/icons/delete.svg"
                    alt="delete"
                    className="lg:w-6 lg:h-6 h-5 w-5"
                  />
                </Button>
              </div>
            </div>

            <hr className="border w-full border-dark-4/80" />
            <div className="flex flex-col flex-1 w-full small-medium lg:base-regular">
              <p>{post?.caption}</p>
              <ul className="flex gap-1.5">
                {post?.tags.map((tag: string) => (
                  <li key={tag} className="text-light-4">
                    #{tag}
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full">
              <PostStats post={post} userId={user.id} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetails;
