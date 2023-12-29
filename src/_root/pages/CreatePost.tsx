import PostForm from "@/components/forms/PostForm";

const CreatePost = () => {
  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5x1 flex-start gap-3 justify-start w-full">
          <img
            src="/assets/icons/add-post.svg"
            alt="add"
            width={36}
            height={36}
          />
          <h3 className="h3-bold md:h2-bold text-left w-full">Create Post</h3>
        </div>
        <PostForm action="Create" />
      </div>
    </div>
  );
};

export default CreatePost;
