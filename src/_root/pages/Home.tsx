import Loader from "@/components/ui/shared/Loader";
import PostCard from "@/components/ui/shared/PostCard";
import { useGetRecentPosts } from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";

const Home = () => {
  const {
    data: posts,
    isPending: isPostLoading,
    // isError: isErrorPosts,
  } = useGetRecentPosts();
  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts mb-20 lg:mb-0 md:mb-0">
          <p className="font-thin text-light-2 py-0 m-0 lg:small-medium"></p>
          <h3 className="h3-bold md:h2-bold text-left w-full">Home Feed</h3>
          <iframe
            className="br-10"
            src="https://open.spotify.com/embed/playlist/6ZB0T4ZttlFzUIZt01l1HH?utm_source=generator&theme=0"
            width="86%"
            height="152"
            frameBorder="0"
            // allowfullscreen=""
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
          {isPostLoading && !posts ? (
            <Loader />
          ) : (
            <ul className="flex flex-col flex-1 gap-9 w-full">
              {posts?.documents.map((post: Models.Document) => (
                <li key={post.id} className="flex justify-center w-full">
                  <PostCard post={post} key={post.caption} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
