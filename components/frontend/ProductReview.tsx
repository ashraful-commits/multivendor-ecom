"use client";
import { useState, useEffect } from "react";
import { Rate } from "antd";
import Image from "next/image";
import Loading from "./../Loading";
import { Button } from "@/components/ui/button";
import ContainerBox from "./ContainerBox";
import TextArea from "@/components/backend/Form/TextArea";
import useSessionData from "../../hooks/useSessionData";
import { SessionData } from "./../../typescript";
import { toast } from "react-hot-toast";
import convertDateTime from "./../../lib/TimeFormate";
import {
  useGetReviewQuery,
  useAddNewReviewMutation,
  useGetSingleReviewQuery,
} from "../../lib/features/reviewapi";
const ProductReview = ({ id }: { id: string }) => {
  const session = useSessionData() as SessionData;
  const { data: reviews, isLoading, refetch } = useGetReviewQuery(id);
  const [addNewReview, { isLoading: isAddLoading, isSuccess }] =
    useAddNewReviewMutation();
  const {
    data: oneRates,
    isLoading: isOneLoading,
    refetch: oneRefetch,
  } = useGetSingleReviewQuery({ rate: 1, id });
  const {
    data: twoRates,
    isLoading: isTwoLoading,
    refetch: twoRefetch,
  } = useGetSingleReviewQuery({ rate: 2, id });
  const {
    data: threeRates,
    isLoading: isThreeLoading,
    refetch: threeRefetch,
  } = useGetSingleReviewQuery({ rate: 3, id });
  const {
    data: fourRates,
    isLoading: isFourLoading,
    refetch: fourRefetch,
  } = useGetSingleReviewQuery({ rate: 4, id });
  const {
    data: fiveRates,
    isLoading: isFiveLoading,
    refetch: fiveRefetch,
  } = useGetSingleReviewQuery({ rate: 5, id });

  const [reviewModel, setReviewModel] = useState<boolean>(false);
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>("");

  const calculateWidthPercentage = (reviews: any, maxRating: number = 5) => {
    if (!Array.isArray(reviews) || reviews.length === 0) {
      return 0; // Return 0 if reviews is not an array or is empty
    }

    // Filter out reviews that don't have a valid rating
    const validReviews = reviews.filter((review: any) => {
      return typeof review.rating === "number" && !isNaN(review.rating);
    });

    if (validReviews.length === 0) {
      return 0; // Return 0 if there are no valid reviews
    }

    const totalRating = validReviews.reduce(
      (accumulator: number, review: any) => {
        return accumulator + review.rating;
      },
      0
    );

    const averageRating = totalRating / validReviews.length;
    return (averageRating * 100) / maxRating;
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Review done");
      refetch();
      oneRefetch();
      twoRefetch();
      threeRefetch();
      fourRefetch();
      fiveRefetch();
      setReviewModel(false);
    }
  }, [
    fiveRefetch,
    fourRefetch,
    isSuccess,
    oneRefetch,
    refetch,
    threeRefetch,
    twoRefetch,
  ]);
  if (isAddLoading) {
    <div className="w-full h-full">
      <Loading className="" />
    </div>;
  }
  if (isLoading) {
    <div className="w-full h-full">
      <Loading className="" />
    </div>;
  }
  if (isOneLoading) {
    <div className="w-full h-full">
      <Loading className="" />
    </div>;
  }
  if (isTwoLoading) {
    <div className="w-full h-full">
      <Loading className="" />
    </div>;
  }
  if (isThreeLoading) {
    <div className="w-full h-full">
      <Loading className="" />
    </div>;
  }
  if (isFourLoading) {
    <div className="w-full h-full">
      <Loading className="" />
    </div>;
  }
  if (isFiveLoading) {
    <div className="w-full h-full">
      <Loading className="" />
    </div>;
  }
  const handleRate = (e: any) => {
    setRating(e);
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const data = {
      rating,
      review,
      userId: session?.user?.id,
      productId: id,
    };
    addNewReview(data);
  };
  const [startIndex, setStartIndex] = useState(0);
  const batchSize = 2;

  // Other code...

  const handleViewMoreReviews = () => {
    setStartIndex((prevIndex) => prevIndex + batchSize);
  };
  return (
    <ContainerBox>
      <section className="bg-white rounded-lg py-8  max-sm:w-[85vw] antialiased dark:bg-gray-900 md:py-16">
        <div className="mx-auto lg:mx-5 max-w-screen-xl px-4 2xl:px-0">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Reviews
            </h2>
            <div className="mt-2 flex items-center gap-2 sm:mt-0">
              <div className="flex items-center gap-0.5">
                <Rate
                  style={{ color: "orange" }}
                  onChange={handleRate}
                  defaultValue={Number(
                    (
                      reviews?.reduce((accumulator: any, review: any) => {
                        return accumulator + review?.rating;
                      }, 0) / (reviews?.length || 1)
                    ).toFixed(0)
                  )}
                  disabled
                  count={5}
                />
              </div>
              <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
                {(
                  reviews?.reduce((accumulator: any, review: any) => {
                    return accumulator + review?.rating;
                  }, 0) / (reviews?.length || 1) || 0
                ).toFixed(2)}
              </p>
              <a
                href="#"
                className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline dark:text-white"
              >
                {" "}
                {reviews?.length ? reviews?.length : 0} Reviews{" "}
              </a>
            </div>
          </div>
          <div className="my-6 gap-8 sm:flex sm:items-start md:my-8">
            <div className="shrink-0 space-y-4">
              <p className="text-2xl font-semibold leading-none text-gray-900 dark:text-white">
                {(
                  reviews?.reduce((accumulator: any, review: any) => {
                    return accumulator + review.rating;
                  }, 0) / (reviews?.length || 1)
                ).toFixed(2)}{" "}
                out of 5
              </p>
              <Button
                onClick={() => setReviewModel(!reviewModel)}
                variant="default"
                className="mb-2 me-2 rounded-lg bg-slate-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-300 dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800"
              >
                Write a review
              </Button>
            </div>
            {/* review modle */}
            {reviewModel ? (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col w-full p-5 gap-3"
              >
                <p>Rate please</p>
                <Rate
                  style={{ color: "orange" }}
                  count={5}
                  onChange={handleRate}
                  defaultValue={5}
                />
                <textarea
                  className="bg-slate-200 text-slate-900 dark:text-white dark:bg-slate-800"
                  value={review}
                  onChange={(e: any) => setReview(e.target.value)}
                  cols={5}
                  rows={5}
                ></textarea>
                <Button variant="default">Send</Button>
              </form>
            ) : (
              <div className="mt-6 min-w-0 flex-1 space-y-3 sm:mt-0">
                <div className="flex items-center gap-2">
                  <p className="w-2 shrink-0 text-start text-sm font-medium leading-none text-gray-900 dark:text-white">
                    5
                  </p>
                  <svg
                    className="h-4 w-4 shrink-0 text-yellow-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                  </svg>
                  <div className="h-1.5 w-80 rounded-full bg-gray-200 dark:bg-gray-700">
                    <div
                      className="h-1.5 rounded-full bg-yellow-300"
                      style={{
                        width: `${calculateWidthPercentage(fiveRates, 5)}%`,
                      }}
                    />
                  </div>
                  <a
                    href="#"
                    className="w-8 shrink-0 text-right text-sm font-medium leading-none text-slate-700 hover:underline dark:text-slate-500 sm:w-auto sm:text-left"
                  >
                    {fiveRates?.length ? fiveRates?.length : 0}{" "}
                    <span className="hidden sm:inline">reviews</span>
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <p className="w-2 shrink-0 text-start text-sm font-medium leading-none text-gray-900 dark:text-white">
                    4
                  </p>
                  <svg
                    className="h-4 w-4 shrink-0 text-yellow-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                  </svg>
                  <div className="h-1.5 w-80 rounded-full bg-gray-200 dark:bg-gray-700">
                    <div
                      className="h-1.5 rounded-full bg-yellow-300"
                      style={{
                        width: `${calculateWidthPercentage(fourRates, 4)}%`,
                      }}
                    />
                  </div>
                  <a
                    href="#"
                    className="w-8 shrink-0 text-right text-sm font-medium leading-none text-slate-700 hover:underline dark:text-slate-500 sm:w-auto sm:text-left"
                  >
                    {fourRates?.length ? fourRates?.length : 0}{" "}
                    <span className="hidden sm:inline">reviews</span>
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <p className="w-2 shrink-0 text-start text-sm font-medium leading-none text-gray-900 dark:text-white">
                    3
                  </p>
                  <svg
                    className="h-4 w-4 shrink-0 text-yellow-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                  </svg>
                  <div className="h-1.5 w-80 rounded-full bg-gray-200 dark:bg-gray-700">
                    <div
                      className="h-1.5 rounded-full bg-yellow-300"
                      style={{
                        width: `${calculateWidthPercentage(threeRates, 3)}%`,
                      }}
                    />
                  </div>
                  <a
                    href="#"
                    className="w-8 shrink-0 text-right text-sm font-medium leading-none text-slate-700 hover:underline dark:text-slate-500 sm:w-auto sm:text-left"
                  >
                    {threeRates?.length ? threeRates?.length : 0}{" "}
                    <span className="hidden sm:inline">reviews</span>
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <p className="w-2 shrink-0 text-start text-sm font-medium leading-none text-gray-900 dark:text-white">
                    2
                  </p>
                  <svg
                    className="h-4 w-4 shrink-0 text-yellow-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                  </svg>
                  <div className="h-1.5 w-80 rounded-full bg-gray-200 dark:bg-gray-700">
                    <div
                      className="h-1.5 rounded-full bg-yellow-300"
                      style={{
                        width: `${calculateWidthPercentage(twoRates, 2)}%`,
                      }}
                    />
                  </div>
                  <a
                    href="#"
                    className="w-8 shrink-0 text-right text-sm font-medium leading-none text-slate-700 hover:underline dark:text-slate-500 sm:w-auto sm:text-left"
                  >
                    {twoRates?.length ? twoRates?.length : 0}{" "}
                    <span className="hidden sm:inline">reviews</span>
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <p className="w-2 shrink-0 text-start text-sm font-medium leading-none text-gray-900 dark:text-white">
                    1
                  </p>
                  <svg
                    className="h-4 w-4 shrink-0 text-yellow-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                  </svg>
                  <div className="h-1.5 w-80 rounded-full bg-gray-200 dark:bg-gray-700">
                    <div
                      className="h-1.5 rounded-full bg-yellow-300"
                      style={{
                        width: `${calculateWidthPercentage(oneRates, 1)}%`,
                      }}
                    />
                  </div>
                  <a
                    href="#"
                    className="w-8 shrink-0 text-right text-sm font-medium leading-none text-slate-700 hover:underline dark:text-slate-500 sm:w-auto sm:text-left"
                  >
                    {oneRates?.length ? oneRates?.length : 0}{" "}
                    <span className="hidden sm:inline">reviews</span>
                  </a>
                </div>
              </div>
            )}
          </div>
          <div className="mt-6 divide-y divide-gray-200 dark:divide-gray-700">
            {reviews?.length ? (
              reviews?.map((item: any, index: number) => {
                return (
                  <div
                    key={index}
                    className="gap-3 pb-6 sm:flex sm:items-start"
                  >
                    <div className="shrink-0 space-y-2 sm:w-48 md:w-72">
                      <div className="flex items-center gap-0.5">
                        <Rate
                          disabled
                          style={{ color: "orange" }}
                          count={5}
                          defaultValue={item?.rating}
                        />
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-base font-semibold text-gray-900 dark:text-white">
                          {item?.user?.name}
                        </p>
                        <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                          {convertDateTime(item?.createdAt)}
                        </p>
                      </div>
                      <div className="inline-flex items-center gap-1">
                        <svg
                          className="h-5 w-5 text-slate-700 dark:text-slate-500"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12 2c-.791 0-1.55.314-2.11.874l-.893.893a.985.985 0 0 1-.696.288H7.04A2.984 2.984 0 0 0 4.055 7.04v1.262a.986.986 0 0 1-.288.696l-.893.893a2.984 2.984 0 0 0 0 4.22l.893.893a.985.985 0 0 1 .288.696v1.262a2.984 2.984 0 0 0 2.984 2.984h1.262c.261 0 .512.104.696.288l.893.893a2.984 2.984 0 0 0 4.22 0l.893-.893a.985.985 0 0 1 .696-.288h1.262a2.984 2.984 0 0 0 2.984-2.984V15.7c0-.261.104-.512.288-.696l.893-.893a2.984 2.984 0 0 0 0-4.22l-.893-.893a.985.985 0 0 1-.288-.696V7.04a2.984 2.984 0 0 0-2.984-2.984h-1.262a.985.985 0 0 1-.696-.288l-.893-.893A2.984 2.984 0 0 0 12 2Zm3.683 7.73a1 1 0 1 0-1.414-1.413l-4.253 4.253-1.277-1.277a1 1 0 0 0-1.415 1.414l1.985 1.984a1 1 0 0 0 1.414 0l4.96-4.96Z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          Verified purchase
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 min-w-0 flex-1 space-y-4 sm:mt-0">
                      <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                        {item?.review}
                      </p>
                      <div className="flex items-center gap-4">
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Was it helpful to you?
                        </p>
                        <div className="flex items-center">
                          <input
                            id="reviews-radio-1"
                            type="radio"
                            defaultValue=""
                            name="reviews-radio"
                            className="h-4 w-4 border-gray-300 bg-gray-100 text-slate-600 focus:ring-2 focus:ring-slate-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-slate-600"
                          />
                          <label
                            htmlFor="reviews-radio-1"
                            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            {" "}
                            Yes: 3{" "}
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="reviews-radio-2"
                            type="radio"
                            defaultValue=""
                            name="reviews-radio"
                            className="h-4 w-4 border-gray-300 bg-gray-100 text-slate-600 focus:ring-2 focus:ring-slate-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-slate-600"
                          />
                          <label
                            htmlFor="reviews-radio-2"
                            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            No: 0{" "}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>No reviews </p>
            )}
          </div>
          <div className="mt-6 text-center">
          {reviews && reviews.length > startIndex + batchSize  && (
              <Button
                type="button"
                onClick={handleViewMoreReviews}
                className="mb-2 me-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-slate-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
              >
                View more reviews
              </Button>
            )}
          </div>
        </div>
      </section>
    </ContainerBox>
  );
};

export default ProductReview;
