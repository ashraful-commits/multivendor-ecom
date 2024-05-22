"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import useSessionData from "./../../hooks/useSessionData";
import { SessionData } from "../../hooks/useSessionData";
import {
  Sun,
  User,
  Bell,
  LogOut,
  LayoutGrid,
  AlignJustify,
  Settings,
  LifeBuoy,
  X,
  Moon,
  Search,
} from "lucide-react";
import { signOut } from "next-auth/react"
const Navbar = () => {
  const handleSignOut=()=>{
    signOut()
  }
  const session = useSessionData() as SessionData;
  const { theme, setTheme } = useTheme();
  return (
    <div className="bg-slate-200 sticky top-0 left-0 z-[999999]  dark:bg-slate-800">
      <div className="flex  max-sm:container-fluid container  items-center  right-0 justify-between  h-20 px-4">
        <Link
          className=" flex justify-between  items-center px-2 gap-x-2"
          href="/"
        >
          <Image
            alt="logo "
            width={1000}
            height={1000}
            className="w-[45px] rounded-lg h-10  min-w-[45px]"
            src="/logo.jpeg"
          />
          <span className="inline-block max-sm:hidden uppercase font-bold text-slate-900 dark:text-white">
            Multi <br /> Vendor
          </span>
        </Link>
        <form className="flex max-sm:hidden items-center w-full md:px-20 px-10">
          <label htmlFor="simple-search" className="sr-only">
            Search
          </label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="text"
              id="simple-search"
              className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Search"
              required
            />
          </div>
        </form>
        <DropdownMenu className=" w-full">
          <DropdownMenuTrigger className="w-10 h-10 flex hidden max-sm:block items-center ">
            <Search />
          </DropdownMenuTrigger>
          <DropdownMenuContent className=" bg-slate-200  z-[999999] shadow-lg w-full mt-5  dark:bg-slate-800 border-none dark:border-slate-500 text-slate-900 dark:text-white">
            <div className="h-10 w-full max-sm:w-full items-center justify-center max-sm:border-b-2 border border-slate-200 dark:border-slate-900">
              <label htmlFor="simple-search" className="sr-only">
                Search
              </label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="simple-search"
                  className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Search"
                  required
                />
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="flex space-x-3">
          <DropdownMenu>
            <DropdownMenuTrigger className="w-10 h-10 flex justify-center items-center ">
              <LayoutGrid />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[90vw] shadow-lg max-h-[70vh] max-sm:overflow-y-scroll p-10 max-sm:p-5  mt-8 gap-5 flex flex-wrap bg-slate-300 dark:bg-slate-800 items-start max-sm:justify-center justify-start   md:mr-24 mr-5 border-none">
              <DropdownMenuItem className="h-32 w-32 max-sm:w-full items-center justify-center max-sm:border-b-2 border border-slate-200 dark:border-slate-900">
                <LayoutGrid className="mr-2 h-4 w-4" />
                <Link href="/dashboard">
                  <span>Dashboard</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="h-32 w-32 max-sm:w-full items-center justify-center max-sm:border-b-2 border border-slate-200 dark:border-slate-900">
                <User className="mr-2 h-4 w-4" />
                <Link href="/dashboard">
                  <span>Edit Profile</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem className="h-32 w-32 max-sm:w-full items-center justify-center max-sm:border-b-2 border border-slate-200 dark:border-slate-900">
                <Settings className="mr-2 h-4 w-4" />
                <Link href="/dashboard">
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem className="h-32 w-32 max-sm:w-full items-center justify-center max-sm:border-b-2 border border-slate-200 dark:border-slate-900">
                <LifeBuoy className="mr-2 h-4 w-4" />
                <Link href="/dashboard">
                  <span>Support</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem className="h-32 w-32 max-sm:w-full items-center justify-center max-sm:border-b-2 border border-slate-200 dark:border-slate-900">
                <LifeBuoy className="mr-2 h-4 w-4" />
                <Link href="/dashboard">
                  <span>Support</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem className="h-32 w-32 max-sm:w-full items-center justify-center max-sm:border-b-2 border border-slate-200 dark:border-slate-900">
                <LifeBuoy className="mr-2 h-4 w-4" />
                <Link href="/dashboard">
                  <span>Support</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem className="h-32 w-32 max-sm:w-full items-center justify-center max-sm:border-b-2 border border-slate-200 dark:border-slate-900">
                <LifeBuoy className="mr-2 h-4 w-4" />
                <Link href="/dashboard">
                  <span>Support</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem className="h-32 w-32 max-sm:w-full items-center justify-center max-sm:border-b-2 border border-slate-200 dark:border-slate-900">
                <LifeBuoy className="mr-2 h-4 w-4" />
                <Link href="/dashboard">
                  <span>Support</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem className="h-32 w-32 max-sm:w-full items-center justify-center max-sm:border-b-2 border border-slate-200 dark:border-slate-900">
                <LifeBuoy className="mr-2 h-4 w-4" />
                <Link href="/dashboard">
                  <span>Support</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem className="h-32 w-32 max-sm:w-full items-center justify-center max-sm:border-b-2 border border-slate-200 dark:border-slate-900">
                <LifeBuoy className="mr-2 h-4 w-4" />
                <Link href="/dashboard">
                  <span>Support</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem className="h-32 w-32 max-sm:w-full items-center justify-center max-sm:border-b-2 border border-slate-200 dark:border-slate-900">
                <LifeBuoy className="mr-2 h-4 w-4" />
                <Link href="/dashboard">
                  <span>Support</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem className="h-32 w-32 max-sm:w-full items-center justify-center max-sm:border-b-2 border border-slate-200 dark:border-slate-900">
                <LifeBuoy className="mr-2 h-4 w-4" />
                <Link href="/dashboard">
                  <span>Support</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem className="h-32 w-32 max-sm:w-full items-center justify-center max-sm:border-b-2 border border-slate-200 dark:border-slate-900">
                <LifeBuoy className="mr-2 h-4 w-4" />
                <Link href="/dashboard">
                  <span>Support</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem className="h-32 w-32 max-sm:w-full items-center justify-center max-sm:border-b-2 border border-slate-200 dark:border-slate-900">
                <LifeBuoy className="mr-2 h-4 w-4" />
                <Link href="/dashboard">
                  <span>Support</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem className="h-32 w-32 max-sm:w-full hidden max-sm:flex items-center justify-center max-sm:border-b-2 border border-slate-200 dark:border-slate-900">
                <Link
                  href="/login"
                  className="text-white min-w-24 inline-block bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Login
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="h-32 w-32 max-sm:w-full hidden  m-auto max-sm:flex items-center justify-center border-none">
                <button
                  onClick={() => setTheme(theme == "light" ? "dark" : "light")}
                  className=" flex justify-center items-center p-3 text-sm font-medium text-center text-blue-500 dark:text-white  rounded-lg hover:bg-blue-800 focus:ring-4  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  {theme == "light" ? (
                    <Sun className="fill-blue-500 " />
                  ) : (
                    <Moon />
                  )}
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <button
            onClick={() => setTheme(theme == "light" ? "dark" : "light")}
            className="relative inline-flex  items-center p-2 text-sm font-medium text-center text-blue-500 dark:text-white  rounded-lg hover:bg-blue-800 focus:ring-2  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {theme == "light" ? (
              <Sun className="fill-blue-500 size-5 " />
            ) : (
              <Moon className="size-5" />
            )}
          </button>

          <button
            type="button"
            className="relative inline-flex items-center p-2 text-sm font-medium text-center text-blue-500  rounded-lg hover:bg-blue-800 focus:ring-2 dark:text-white dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Bell className="fill-blue-500 size-5" />

                <div className="absolute inline-flex items-center justify-center w-5 h-5 text-[10px] font-bold text-white dark:text-slate-900 bg-red-500 border-2 border-white rounded-full -top-1 -end-1 dark:border-gray-500 ">
                  20
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-slate-200 z-[999999] mt-10 mr-5 dark:bg-slate-800 border-none dark:border-slate-500 text-slate-900 dark:text-white shadow-lg">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex gap-x-2">
                  <Avatar className="w-5 h-5">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>AB</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start justify-center">
                    <p className="truncate text-[10px]">
                      Yellow Sweet Corn Stock out...
                    </p>
                    <div className="flex gap-x-2 items-center">
                      <span className="bg-red-500 px-2 py-1 rounded-full text-white text-[10px] inline-block">
                        Stock out
                      </span>
                      <span className="text-[10px]">Dec 12 2021-12:40PM</span>
                    </div>
                  </div>
                  <X className="size-[14px]" />
                </DropdownMenuItem>
                <DropdownMenuItem className="flex gap-x-2">
                  <Avatar className="w-5 h-5">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>AB</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start justify-center">
                    <p className="truncate text-[10px]">
                      Yellow Sweet Corn Stock out...
                    </p>
                    <div className="flex gap-x-2 items-center">
                      <span className="bg-red-500 px-2 py-1 rounded-full text-white text-[10px] inline-block">
                        Stock out
                      </span>
                      <span className="text-[10px]">Dec 12 2021-12:40PM</span>
                    </div>
                  </div>
                  <X className="size-[14px]" />
                </DropdownMenuItem>
                <DropdownMenuItem className="flex gap-x-2">
                  <Avatar className="w-5 h-5">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>AB</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start justify-center">
                    <p className="truncate text-[10px]">
                      Yellow Sweet Corn Stock out...
                    </p>
                    <div className="flex gap-x-2 items-center">
                      <span className="bg-red-500 px-2 py-1 rounded-full text-white text-[10px] inline-block">
                        Stock out
                      </span>
                      <span className="text-[10px]">Dec 12 2021-12:40PM</span>
                    </div>
                  </div>
                  <X className="size-[14px]" />
                </DropdownMenuItem>
                <DropdownMenuItem className="flex gap-x-2">
                  <Avatar className="w-5 h-5">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>AB</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start justify-center">
                    <p className="truncate text-[10px]">
                      Yellow Sweet Corn Stock out...
                    </p>
                    <div className="flex gap-x-2 items-center">
                      <span className="bg-green-500 px-2 py-1 rounded-full text-white text-[10px] inline-block">
                        New order
                      </span>
                      <span className="text-[10px]">Dec 12 2021-12:40PM</span>
                    </div>
                  </div>
                  <X className="size-[14px]" />
                </DropdownMenuItem>
                <DropdownMenuItem className="flex gap-x-2">
                  <Avatar className="w-5 h-5">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>AB</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start justify-center">
                    <p className="truncate text-[10px]">
                      Yellow Sweet Corn Stock out...
                    </p>
                    <div className="flex gap-x-2 items-center">
                      <span className="bg-red-500 px-2 py-1 rounded-full text-white text-[10px] inline-block">
                        Stock out
                      </span>
                      <span className="text-[10px]">Dec 12 2021-12:40PM</span>
                    </div>
                  </div>
                  <X className="size-[14px]" />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </button>
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="w-10 h-10 flex juc items-center ">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>AB</AvatarFallback>
                </Avatar>
                {/* <User /> */}
              </DropdownMenuTrigger>
              <DropdownMenuContent className=" bg-slate-200 z-[99999999999] shadow-lg mt-5 mr-5 dark:bg-slate-800 border-none dark:border-slate-500 text-slate-900 dark:text-white">
                <DropdownMenuItem className="h-10 w-full max-sm:w-full items-center justify-center max-sm:border-b-2 border border-slate-200 dark:border-slate-900">
                  <User className="mr-2 h-4 w-4" />
                  <Link href="/dashboard">
                    <span>Edit Profile</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem className="h-10 w-full max-sm:w-full items-center justify-center max-sm:border-b-2 border border-slate-200 dark:border-slate-900">
                  <Settings className="mr-2 h-4 w-4" />
                  <Link href="/dashboard">
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                
                <DropdownMenuItem className="h-10 w-full max-sm:w-full items-center justify-center max-sm:border-b-2 border border-slate-200 dark:border-slate-900">
                  <LifeBuoy className="mr-2 h-4 w-4" />
                  <Link href="/dashboard">
                    <span>Support</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut} className=" w-32 py-3 max-sm:w-full items-center justify-center max-sm:border-b-2 border border-slate-200 dark:border-slate-900">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              href="/login"
              className="text-white min-w-24 max-sm:hidden inline-block bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
