import { Models } from "appwrite";

type PostStatsProps = {
  post: Models.Document;
  userId: string;
};

const PostStats = ({ post, userId }: PostStatsProps) => {

    
  return (
    <div className="flex justify-between items-center z-20 mt-2">
      <div className="flex gap-2 content-center justify-center items-center">
        <img
          src="/assets/icons/like.svg"
          alt="like"
          width={20}
          height={20}
          onClick={() => {}}
          className="cursor-pointer" 
        />
        <p className="small-medium lg:base-medium text-light-3">3</p>
      </div>


      <div className="flex gap-2 content-center justify-center items-center">
        <img
          src="/assets/icons/save.svg"
          alt="like"
          width={20}
          height={20}
          onClick={() => {}}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};

export default PostStats;
