"use client"
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useTheme } from "next-themes"
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
} from '@/components/ui/dropdown-menu';

import { Button } from '@/components/ui/button';
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
  Moon
} from 'lucide-react';
import { NavbarProps, SessionData } from '../../typescript';
import { signOut } from 'next-auth/react';
import useSessionData from './../../hooks/useSessionData';
import Link from "next/link"
const Navbar = ({setShowSidebar,showSidebar}:NavbarProps) => {
  const handleLogout=()=>{
    signOut()
  }
  const {theme,setTheme} = useTheme()
  const session = useSessionData() as SessionData;
  return (
    <div className="flex items-center  right-0 justify-between bg-slate-800 dark:bg-slate-200 text-slate-100 dark:text-slate-900 h-20 px-4">
      <button className="border" onClick={()=>setShowSidebar(!showSidebar)}>
        <AlignJustify />
      </button>
      <div className="flex space-x-3">
        <button onClick={()=>setTheme(theme=="light"?"dark":"light")} className="relative inline-flex items-center p-3 text-sm font-medium text-center text-blue-500 dark:text-white  rounded-lg hover:bg-blue-800 focus:ring-4  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">

          {theme=="light"?<Sun className="fill-blue-500 " />:<Moon/>}
        </button>
        <button
          type="button"
          className="relative inline-flex items-center p-3 text-sm font-medium text-center text-blue-500  rounded-lg hover:bg-blue-800 focus:ring-4 dark:text-white dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <DropdownMenu>
            <DropdownMenuTrigger>
              {' '}
              <Bell className="fill-blue-500" />
              <span className="sr-only">Notifications</span>
              <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white dark:text-slate-900 bg-red-500 border-2 border-white rounded-full -top-1 -start-2 dark:border-gray-500 ">
                20
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-slate-700 dark:bg-white dark:border-slate-500 dark:text-slate-900 text-white dark" >
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex gap-x-2">
              <Avatar className="w-5 h-5">
              <AvatarImage src={session?.user?.imgUrl?session?.user?.imgUrl:"/Profile-PNG-Picture.png"} />
              <AvatarFallback>AB</AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start justify-center">
              <p className="truncate text-[10px]">Yellow Sweet Corn Stock out...</p>
              <div className="flex gap-x-2 items-center">
              <span className="bg-red-500 px-2 py-1 rounded-full text-white text-[10px] inline-block" >Stock out</span>
              <span className="text-[10px]">Dec 12 2021-12:40PM</span>
              </div>
            </div>
            <X className="size-[14px]"/>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex gap-x-2">
              <Avatar className="w-5 h-5">
              <AvatarImage src={session?.user?.imgUrl?session?.user?.imgUrl:"/Profile-PNG-Picture.png"} />
              <AvatarFallback>AB</AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start justify-center">
              <p className="truncate text-[10px]">Yellow Sweet Corn Stock out...</p>
              <div className="flex gap-x-2 items-center">
              <span className="bg-red-500 px-2 py-1 rounded-full text-white text-[10px] inline-block" >Stock out</span>
              <span className="text-[10px]">Dec 12 2021-12:40PM</span>
              </div>
            </div>
            <X className="size-[14px]"/>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex gap-x-2">
              <Avatar className="w-5 h-5">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>AB</AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start justify-center">
              <p className="truncate text-[10px]">Yellow Sweet Corn Stock out...</p>
              <div className="flex gap-x-2 items-center">
              <span className="bg-red-500 px-2 py-1 rounded-full text-white text-[10px] inline-block" >Stock out</span>
              <span className="text-[10px]">Dec 12 2021-12:40PM</span>
              </div>
            </div>
            <X className="size-[14px]"/>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex gap-x-2">
              <Avatar className="w-5 h-5">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>AB</AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start justify-center">
              <p className="truncate text-[10px]">Yellow Sweet Corn Stock out...</p>
              <div className="flex gap-x-2 items-center">
              <span className="bg-green-500 px-2 py-1 rounded-full text-white text-[10px] inline-block" >New order</span>
              <span className="text-[10px]">Dec 12 2021-12:40PM</span>
              </div>
            </div>
            <X className="size-[14px]"/>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex gap-x-2">
              <Avatar className="w-5 h-5">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>AB</AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start justify-center">
              <p className="truncate text-[10px]">Yellow Sweet Corn Stock out...</p>
              <div className="flex gap-x-2 items-center">
              <span className="bg-red-500 px-2 py-1 rounded-full text-white text-[10px] inline-block" >Stock out</span>
              <span className="text-[10px]">Dec 12 2021-12:40PM</span>
              </div>
            </div>
            <X className="size-[14px]"/>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </button>
        <DropdownMenu>
          <DropdownMenuTrigger className="w-10 h-10 flex juc items-center ">
            <Avatar>
              <AvatarImage src={session?.user?.imgUrl?session?.user?.imgUrl:"/Profile-PNG-Picture.png"} />
              <AvatarFallback>AB</AvatarFallback>
            </Avatar>
            {/* <User /> */}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-auto px-5 dark:bg-white dark:text-slate-900 bg-slate-700 text-white mr-5">
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <LayoutGrid className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <Link href="/">Home</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <Link href="/setting">Edit Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuItem>
              <LifeBuoy className="mr-2 h-4 w-4" />
              <span>Support</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Navbar;
