

import Image from "next/image";
import ContainerBox from "@/components/frontend/ContainerBox";

import SingleProudcutImg from "./../../../../components/frontend/SingleProudcutImg";
import ProductReview from "./../../../../components/frontend/ProductReview";
import Loading from './../../../../components/Loading';
const SingleProduct = ({params}:{params: {
  id: string;
}}) => {
  
  const {id} = params;
  if (!id) {
    return <div className="w-full h-full mt-10"><Loading className="mx-auto my-auto"/></div>;
  }
  return (
    <ContainerBox>
      <section className="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased">
        <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
          <SingleProudcutImg id={id} />
        </div>
      </section>
      <ProductReview id={id} />
    </ContainerBox>
  );
};

export default SingleProduct;
