import React from "react";

const HomePageShimmer = () => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
        <div className="animate-pulse mx-1" style={{minWidth:"250px"}}>
          <div className="h-48 bg-gray-200"></div>
          <div className="h-6 my-1 rounded-md bg-gray-300"></div>
          <div className="h-4 my-1 bg-gray-300"></div>
        </div>
        <div className="animate-pulse mx-1"style={{minWidth:"250px"}}>
          <div className="h-48 bg-gray-200"></div>
          <div className="h-6 my-1 rounded-md bg-gray-300"></div>
          <div className="h-4 my-1 bg-gray-300"></div>
        </div>
        <div className="animate-pulse mx-1"style={{minWidth:"250px"}}>
          <div className="h-48 bg-gray-200"></div>
          <div className="h-6 my-1 rounded-md bg-gray-300"></div>
          <div className="h-4 my-1 bg-gray-300"></div>
        </div>
      </div>
    </>
  );
};

export default HomePageShimmer;
