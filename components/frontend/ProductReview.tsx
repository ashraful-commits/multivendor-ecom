"use client"

import
{ Rate }
from
"antd"
;
import Image from "next/image"
import {useGetSingleProductQuery} from "../../lib/features/productapi"
import Loading from './../Loading';
import { Button } from '@/components/ui/button';
import ContainerBox from "./ContainerBox"
const ProductReview = ({id}:{id:string}) => {
    const {data:product,isLoading} =useGetSingleProductQuery(id)
    const handleRate =(e:any)=>{
      console.log(e)
    }
  return <ContainerBox>
    <section className="bg-white py-8  max-sm:w-[85vw] antialiased dark:bg-gray-900 md:py-16">
    <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
      <div className="flex items-center gap-2">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Reviews
        </h2>
        <div className="mt-2 flex items-center gap-2 sm:mt-0">
          <div className="flex items-center gap-0.5">
            <Rate onChange={handleRate} count={5}/>
          </div>
          <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
            (4.6)
          </p>
          <a
            href="#"
            className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline dark:text-white"
          >
            {" "}
            645 Reviews{" "}
          </a>
        </div>
      </div>
      <div className="my-6 gap-8 sm:flex sm:items-start md:my-8">
        <div className="shrink-0 space-y-4">
          <p className="text-2xl font-semibold leading-none text-gray-900 dark:text-white">
            4.65 out of 5
          </p>
          <Button
          variant="default"
            className="mb-2 me-2 rounded-lg bg-slate-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-300 dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800"
          >
            Write a review
          </Button>
        </div>
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
                style={{ width: "20%" }}
              />
            </div>
            <a
              href="#"
              className="w-8 shrink-0 text-right text-sm font-medium leading-none text-slate-700 hover:underline dark:text-slate-500 sm:w-auto sm:text-left"
            >
              239 <span className="hidden sm:inline">reviews</span>
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
                style={{ width: "60%" }}
              />
            </div>
            <a
              href="#"
              className="w-8 shrink-0 text-right text-sm font-medium leading-none text-slate-700 hover:underline dark:text-slate-500 sm:w-auto sm:text-left"
            >
              432 <span className="hidden sm:inline">reviews</span>
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
                style={{ width: "15%" }}
              />
            </div>
            <a
              href="#"
              className="w-8 shrink-0 text-right text-sm font-medium leading-none text-slate-700 hover:underline dark:text-slate-500 sm:w-auto sm:text-left"
            >
              53 <span className="hidden sm:inline">reviews</span>
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
                style={{ width: "5%" }}
              />
            </div>
            <a
              href="#"
              className="w-8 shrink-0 text-right text-sm font-medium leading-none text-slate-700 hover:underline dark:text-slate-500 sm:w-auto sm:text-left"
            >
              32 <span className="hidden sm:inline">reviews</span>
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
                style={{ width: "0%" }}
              />
            </div>
            <a
              href="#"
              className="w-8 shrink-0 text-right text-sm font-medium leading-none text-slate-700 hover:underline dark:text-slate-500 sm:w-auto sm:text-left"
            >
              13 <span className="hidden sm:inline">reviews</span>
            </a>
          </div>
        </div>
      </div>
      <div className="mt-6 divide-y divide-gray-200 dark:divide-gray-700">
        <div className="gap-3 pb-6 sm:flex sm:items-start">
          <div className="shrink-0 space-y-2 sm:w-48 md:w-72">
            <div className="flex items-center gap-0.5">
              <svg
                className="h-4 w-4 text-yellow-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
              </svg>
              <svg
                className="h-4 w-4 text-yellow-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
              </svg>
              <svg
                className="h-4 w-4 text-yellow-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
              </svg>
              <svg
                className="h-4 w-4 text-yellow-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
              </svg>
              <svg
                className="h-4 w-4 text-yellow-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
              </svg>
            </div>
            <div className="space-y-0.5">
              <p className="text-base font-semibold text-gray-900 dark:text-white">
                Micheal Gough
              </p>
              <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                November 18 2023 at 15:35
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
              My old IMAC was from 2013. This replacement was well needed. Very
              fast, and the colour matches my office set up perfectly. The
              display is out of this world and I’m very happy with this
              purchase.
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
        <div className="gap-3 py-6 sm:flex sm:items-start">
          <div className="shrink-0 space-y-2 sm:w-48 md:w-72">
            <div className="flex items-center gap-0.5">
              <svg
                className="h-4 w-4 text-yellow-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
              </svg>
              <svg
                className="h-4 w-4 text-yellow-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
              </svg>
              <svg
                className="h-4 w-4 text-yellow-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
              </svg>
              <svg
                className="h-4 w-4 text-yellow-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
              </svg>
              <svg
                className="h-4 w-4 text-yellow-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
              </svg>
            </div>
            <div className="space-y-0.5">
              <p className="text-base font-semibold text-gray-900 dark:text-white">
                Jese Leos
              </p>
              <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                November 18 2023 at 15:35
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
              It’s fancy, amazing keyboard, matching accessories. Super fast,
              batteries last more than usual, everything runs perfect in this
              computer. Highly recommend!
            </p>
            <div className="flex gap-2">
              <Image width={1000} height={1000}
                className="h-32 w-20 rounded-lg object-cover"
                src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-photo-1.jpg"
                alt=""
              />
              <Image width={1000} height={1000}
                className="h-32 w-20 rounded-lg object-cover"
                src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-photo-2.jpg"
                alt=""
              />
            </div>
            <div className="flex items-center gap-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Was it helpful to you?
              </p>
              <div className="flex items-center">
                <input
                  id="reviews-radio-3"
                  type="radio"
                  defaultValue=""
                  name="reviews-radio-2"
                  className="h-4 w-4 border-gray-300 bg-gray-100 text-slate-600 focus:ring-2 focus:ring-slate-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-slate-600"
                />
                <label
                  htmlFor="reviews-radio-3"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  {" "}
                  Yes: 1{" "}
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="reviews-radio-4"
                  type="radio"
                  defaultValue=""
                  name="reviews-radio-2"
                  className="h-4 w-4 border-gray-300 bg-gray-100 text-slate-600 focus:ring-2 focus:ring-slate-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-slate-600"
                />
                <label
                  htmlFor="reviews-radio-4"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  No: 0{" "}
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 text-center">
        <button
          type="button"
          className="mb-2 me-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-slate-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
        >
          View more reviews
        </button>
      </div>
    </div>
  </section>

 
  </ContainerBox>;
};

export default ProductReview;
