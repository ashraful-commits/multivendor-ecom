"use client";
import React, { useState } from "react";
import ContainerBox from "./ContainerBox";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Products from "./Products";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetCategoryQuery } from "../../lib/features/categoryapi";
import { useGetBrandQuery } from "../../lib/features/brandapi";
import { useGetFilterProductQuery } from "../../lib/features/productapi";
import { useGetTagQuery } from "../../lib/features/tagapi";
import { SingleSelect } from "./../backend/Form/SingleSelect";
import { Input } from "@/components/ui/input";
import { Filter ,ChevronLeft} from "lucide-react";
import { Button } from "@/components/ui/button";
import Loading from "./../Loading";
import { ProductData } from "../../typescript";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { updateFilterData } from "../../lib/features/filterSlice";
import { X, Tag } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../lib/store";
import { SelectInput } from "./../backend/Form/SelectInput";
import  Link  from 'next/link';

const AllProducts = () => {
  const filter = useSelector((state: RootState) => state.filter.filter);
  console.log(filter);
  const dispatch = useDispatch();
  const [mobile, setMobile] = useState(false);
  const { data: categories } = useGetCategoryQuery();
  const { data: brands } = useGetBrandQuery();
  const { data: tags } = useGetTagQuery();
  const {
    data: products,
    refetch,
    isLoading,
  } = useGetFilterProductQuery(filter);

  if (isLoading)
    return (
      <div className="w-full h-full">
        <Loading className="mx-auto my-auto" />
      </div>
    );
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    dispatch(
      updateFilterData({
        [name]: value,
      })
    );
    refetch();
  };
  const handleTagClick = (isSelected:boolean, id:string) => {
    if (isSelected) {
      // Remove the tag if it is already selected
      dispatch(
        updateFilterData({
          ...filter,
          tag: filter.tag.filter((tagId) => tagId !== id),
        })
      );
    } else {
      // Add the tag if it is not selected
      dispatch(
        updateFilterData({
          ...filter,
          tag: [...filter.tag, id],
        })
      );
    }
  };

  return (
    <ContainerBox className="mx-auto  w-full  ">
      <div
        className={`m-2 max-sm:!hidden  max-h-[65px]  sticky top-0 flex w-full gap-5 bg-slate-200 justify-between max-auto dark:bg-slate-900 p-2 z-[99999] mx-auto`}
      >
        <Link  className="bg-slate-900 text-white dark:bg-white dark:text-slate-900 flex items-center gap-x-2  px-2 py-2" href="/"><ChevronLeft /> Back</Link>
        <Input
          placeholder="Search product"
          name="search"
          type="text"
          value={filter.search}
          className="max-sm:w-full w-52"
          onChange={handleChange}
        />
        <Select
          onValueChange={(value: string) =>
            dispatch(updateFilterData({ ...filter, category: value }))
          }
          defaultValue={filter.category}
        >
          <SelectTrigger className="max-sm:w-full w-[180px]">
            <SelectValue placeholder="Select a Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Category</SelectLabel>
              {categories?.length &&
                categories?.map((item: any, index: number) => {
                  return (
                    <SelectItem key={index} value={item.id}>
                      {item.name}
                    </SelectItem>
                  );
                })}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          onValueChange={(value: string) =>
            dispatch(updateFilterData({ ...filter, brand: value }))
          }
          defaultValue={filter.brand}
        >
          <SelectTrigger className="max-sm:w-full w-[180px]">
            <SelectValue placeholder="Select a brand" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Brands</SelectLabel>
              {brands?.length &&
                brands?.map((item: any, index: number) => {
                  return (
                    <SelectItem key={index} value={item.id}>
                      {item.name}
                    </SelectItem>
                  );
                })}
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="flex gap-x-2">
          <Input
            className="max-sm:w-full"
            placeholder="min price"
            name="minPrice"
            type="number"
            value={filter.minPrice}
            onChange={handleChange}
          />
          <Input
            className="max-sm:w-full"
            placeholder="max price"
            name="maxPrice"
            type="number"
            value={filter.maxPrice}
            onChange={handleChange}
          />
        </div>
        <Button
          onClick={() =>
            dispatch(
              updateFilterData({
                search: "",
                category: "",
                brand: "",
                minPrice: 0,
                maxPrice: 1000000,
                tag: [],
              })
            )
          }
          className="max-sm:w-full"
          variant="default"
        >
          <X />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="sm"
              className="  rounded-full min-h-10 min-w-10 justify-center items-center bottom-2 !p-0  right-2 z-[9999]"
              variant="default"
            >
              <Tag />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full relative top-4 right-[20%] p-4">
            <div className="flex flex-wrap md:w-[80vw] lg:w-[70vw] max-h-[8] overflow-y-scroll w-full gap-2 p-5">
              {tags?.length  &&
                tags?.map((item: any, index: number) => {
                  const isSelected = filter.tag.includes(item.id);

                  return (
                    <span
                      onClick={() => handleTagClick(isSelected, item?.id)}
                      className={`truncate block p-2 dark:bg-slate-800 bg-slate-100 rounded-md cursor-pointer ${
                        isSelected ? "text-blue-500 bg-blue-100" : ""
                      }`}
                      key={index}
                    >
                      {item?.name}
                    </span>
                  );
                })}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button
            size="sm"
            className=" !hidden max-sm:!fixed max-sm:!block rounded-full h-10 w-10 justify-center items-center bottom-2 !p-0  right-2 z-[999999999999]"
            variant="default"
          >
            <Filter className="block m-auto" />
          </Button>
        </DialogTrigger>
        <DialogContent className=" border-none w-[100%] overflow-y-scroll  ">
          <div
            className={`m-2  flex gap-2 flex-col py-2 w-full`}
          >
            <Input
              placeholder="Search product"
              name="search"
              value={filter.search}
              className="max-sm:w-full mt-2 w-72"
              onChange={handleChange}
            />
            <Select
              onValueChange={(value: string) =>
                dispatch(updateFilterData({ ...filter, category: value }))
              }
              defaultValue={filter.category}
            >
              <SelectTrigger className="max-sm:w-full w-[180px]">
                <SelectValue placeholder="Select a Category" />
              </SelectTrigger>
              <SelectContent className="z-[9999999]">
                <SelectGroup>
                  <SelectLabel>Category</SelectLabel>
                  {categories?.length &&
                    categories?.map((item: any, index: number) => {
                      return (
                        <SelectItem key={index} value={item.id}>
                          {item.name}
                        </SelectItem>
                      );
                    })}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select
              onValueChange={(value: string) =>
                dispatch(updateFilterData({ ...filter, brand: value }))
              }
              defaultValue={filter.brand}
            >
              <SelectTrigger className="max-sm:w-full w-[180px]">
                <SelectValue placeholder="Select a brand" />
              </SelectTrigger>
              <SelectContent className="z-[9999999]">
                <SelectGroup>
                  <SelectLabel>Brands</SelectLabel>
                  {brands?.length &&
                    brands?.map((item: any, index: number) => {
                      return (
                        <SelectItem key={index} value={item.id}>
                          {item.name}
                        </SelectItem>
                      );
                    })}
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className="flex gap-x-2">
              <Input
                className="max-sm:w-full"
                placeholder="min price"
                name="minPrice"
                type="number"
                value={filter.minPrice}
                onChange={handleChange}
              />
              <Input
                className="max-sm:w-full"
                placeholder="max price"
                name="maxPrice"
                type="number"
                value={filter.maxPrice}
                onChange={handleChange}
              />
            </div>

            <h5 className="flex gap-x-4 my-2 items-center">
              <Tag />Product tags
            </h5>
            <div className=" border rounded-lg border-slate-500  max-h-[110px] overflow-y-scroll flex flex-wrap gap-4 p-3">
              {tags?.length  &&
                tags?.map((item: any, index: number) => {
                  const isSelected = filter.tag.includes(item.id);

                  return (
                    <span
                      onClick={() => handleTagClick(isSelected, item?.id)}
                      className={`truncate block  rounded-md  p-1 cursor-pointer ${
                        isSelected ? "text-blue-500 bg-blue-100" : ""
                      }`}
                      key={index}
                    >
                      {item?.name}
                    </span>
                  );
                })}
            </div>
            <Link role="button" className="bg-blue-500 block w-full mx-auto text-sm flex items-center gap-x-2  px-2 py-2" href="/"><ChevronLeft /> Back</Link>
            <Button
              onClick={() =>
                dispatch(
                  updateFilterData({
                    search: "",
                    category: "",
                    brand: "",
                    minPrice: 0,
                    tag: [],
                    maxPrice: 1000000,
                  })
                )
              }
              className="max-sm:w-full"
              variant="default"
            >
              <X />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <div className="mt-20 max-sm:mt-0">
        <Products products={products as ProductData[]} />
      </div>
    </ContainerBox>
  );
};

export default AllProducts;
