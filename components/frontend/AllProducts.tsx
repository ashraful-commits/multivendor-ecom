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
import { SingleSelect } from "./../backend/Form/SingleSelect";
import { Input } from "@/components/ui/input";
import { Filter } from "lucide-react";
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
import { X } from "lucide-react";
const AllProducts = () => {
  const [filter, setFilter] = useState<{
    search: string;
    category: string;
    brand: string;
    minPrice: number;
    maxPrice: number;
  }>({
    search: "",
    category: "",
    brand: "",
    minPrice: 0,
    maxPrice: 1000000,
  });

  const [mobile, setMobile] = useState(false);
  const { data: categories } = useGetCategoryQuery();
  const { data: brands } = useGetBrandQuery();
  const {
    data: products,
    refetch,
    isLoading,
  } = useGetFilterProductQuery(filter);

  console.log(products);
  if (isLoading)
    return (
      <div className="w-full h-full">
        <Loading className="mx-auto my-auto" />
      </div>
    );
  const handleChange = (e: any) => {
    setFilter((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    refetch();
  };

  return (
    <ContainerBox className="mx-auto relative w-full overflow-x-scroll ">
      <div
        className={`m-2  max-h-[65px] max-sm:hidden fixed top-20 left-[20%] flex gap-5 bg-slate-200 dark:bg-slate-900 p-2 z-[99999] mx-auto`}
      >
        <Input
          placeholder="Search product"
          name="search"
          type="text"
          value={filter.search}
          className="max-sm:w-full w-72"
          onChange={handleChange}
        />
        <Select
          onValueChange={(value: string) =>
            setFilter({ ...filter, category: value })
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
            setFilter({ ...filter, brand: value })
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
            setFilter({
              search: "",
              category: "",
              brand: "",
              minPrice: 0,
              maxPrice: 1000000,
            })
          }
          className="max-sm:w-full"
          variant="default"
        >
          <X />
        </Button>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="sm"
            className="hidden fixed max-sm:flex rounded-full h-10 w-10 justify-center items-center bottom-2 !p-0  right-2 z-[9999]"
            variant="default"
          >
            <Filter className="block m-auto" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-72">
          <div
            className={`m-2 max-sm:group-hover:block flex gap-5 max-sm:flex-col bg-slate-200 dark:bg-slate-900 p-2 w-full max-sm:bottom-10 right-0 z-[99999]`}
          >
            <Input
              placeholder="Search product"
              name="search"
              value={filter.search}
              className="max-sm:w-full w-72"
              onChange={handleChange}
            />
            <Select
              onValueChange={(value: string) =>
                setFilter({ ...filter, category: value })
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
                setFilter({ ...filter, brand: value })
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
                setFilter({
                  search: "",
                  category: "",
                  brand: "",
                  minPrice: 0,
                  maxPrice: 1000000,
                })
              }
              className="max-sm:w-full"
              variant="default"
            >
              <X/>
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="mt-20 max-sm:mt-0">
        <Products products={products as ProductData[]} />
      </div>
    </ContainerBox>
  );
};

export default AllProducts;
