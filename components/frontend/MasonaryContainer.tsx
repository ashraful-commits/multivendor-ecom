"use client"
import React from "react"
import Masonry from 'react-masonry-css';
import  ContainerBox  from './ContainerBox';
const MasonryContainer = ({ children }: { children: React.ReactNode }) => {
 

  return (
    <ContainerBox className="mx-auto !px-0">
        <Masonry
      breakpointCols={{ default: 3, 1100: 2, 700: 1 }}
      className="my-masonry-grid my-5"
      columnClassName="my-masonry-grid_column"
    >
     {children}
    </Masonry>
    </ContainerBox>
  );
};

export default MasonryContainer;
