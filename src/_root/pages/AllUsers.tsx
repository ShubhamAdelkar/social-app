const AllUsers = () => {
  return (
    <div className="explore-container mb-14 lg:mb-0">
      <div className="flex-between w-full max-w-5xl mt-8 mb-7 lg:mt-14 gap-3">
        <img
          src="/assets/icons/people.svg"
          alt="add"
          width={36}
          height={36}
        />
        <h3 className="h3-bold md:h2-bold text-left w-full">
          Popular Creators
        </h3>
      </div>
      <p className="text-light-3">This is a beta version</p>
    </div>
  );
};

export default AllUsers;
