"use client";
import * as React from "react";
import Image from "next/image";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { useGetSingleUserQuery } from "../../lib/features/userapi";
import FavTotal from "./FavTotal";
import Loading from "../Loading";
import FavoriteItems from "./FavoriteItems";
import { Session } from 'next-auth';
import useSessionData from './../../hooks/useSessionData';
import  ContainerBox  from '@/components/frontend/ContainerBox';
export default function DrawerDemoFav() {
  const session:Session|null = useSessionData()
  return (
    <div className="fixed  top-52 rounded-lg rounded-tr-none rounded-br-none right-0 bg-slate-200 dark:bg-slate-800 z-[9999999999] shadow-xl border-2 w-[100px] h-[60px] border-red-500 border-r-0 flex justify-center items-center">
      <Drawer>
        <DrawerTrigger asChild>
          <Button
            className="bg-slate-200 !px-0 !py-0  w-full h-full hover:bg-slate-200 flex justify-center items-center dark:bg-slate-800"
            variant="default"
          >
           {session?.user?.id && <FavTotal id={session?.user?.id} />}
          </Button>
        </DrawerTrigger>
        <DrawerContent className="border-none">
          <div className="max-h-[500px] overflow-y-scroll">
            {session?.user?.id &&
            <FavoriteItems id={session?.user?.id} />
            }
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
