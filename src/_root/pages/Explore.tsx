import { Input } from "@/components/ui/input";
import GridPostList from "@/components/ui/shared/GridPostList";
import SearchResults from "@/components/ui/shared/SearchResults";
import { useState } from "react";

const Explore = () => {
  const [searchValue, setSearchValue] = useState("");

  // const posts = [];

  // const shouldShowSearchResults = searchValue !== "";
  // const shouldShowPosts =
  //   !shouldShowSearchResults &&
  //   posts.pages.every((item) => item.documents.length === 0);

  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <h2 className="h3-bold md:h2-bold w-full">Explore</h2>
        <div className="flex gap-1 px-4 w-full rounded-lg bg-dark-4">
          <img
            src="/assets/icons/search.svg"
            alt="search"
            width={24}
            height={24}
          />

          <Input
            type="text"
            placeholder="Search"
            className="explore-search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>
      <div className="flex-between w-full max-w-5xl mt-8 mb-7 lg:mt-14">
        <h2 className="body-bold md:h3-bold">Popular Today</h2>

        <div className="flex-center gap-2 bg-dark-3 rounded-xl px-3.5 py-1.5 cursor-pointer">
          <p className="small-medium md:base-medium text-light-2">All</p>
          <img
            src="/assets/icons/filter.svg"
            alt="filter"
            width={18}
            height={18}
          />
        </div>
      </div>

      {/* <div className="flex flex-wrap gap-8 w-full max-w-5xl">
        {shouldShowSearchResults ? (
          <SearchResults />
        ) : shouldShowPosts ? (
          <p className="text-light-4 mt-10 text-center w-full">End of posts</p>
        ) : (
          posts.pages.map((item, index) => (
            <GridPostList key={`page-${index}`} posts={item.documents} />
          ))
        )}
      </div> */}
    </div>
  );
};

export default Explore;
