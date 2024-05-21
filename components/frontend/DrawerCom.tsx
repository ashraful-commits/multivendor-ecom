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
import CartTotal from "./CartTotal";
import Loading from "../Loading";
import CartItems from "./CartItems";
import ContainerBox from '@/components/frontend/ContainerBox';
import useSessionData from './../../hooks/useSessionData';
import { Session } from 'next-auth';
export default function DrawerDemo() {
  const session:Session|null = useSessionData()
  
  return (
    <div className="fixed  top-36 rounded-lg rounded-tr-none rounded-br-none right-0 bg-slate-200 dark:bg-slate-800 z-[9999999999] shadow-xl border-2 w-[100px]  max-sm:w-[60px] max-sm:h-[80px] h-[60px]  border-blue-500 border-r-0 flex justify-center items-center">
      <Drawer>
        <DrawerTrigger asChild>
          <Button
            className="bg-slate-200 !px-0 !py-0  w-full h-full hover:bg-slate-200 flex justify-center items-center dark:bg-slate-800"
            variant="default"
          >
            {session?.user?.id &&
            <CartTotal id={session?.user?.id} />
            }
          </Button>
        </DrawerTrigger>
        <DrawerContent className="border-none">
          <div className="max-h-[500px]  overflow-y-scroll">
          {session?.user?.id &&
            <CartItems id={session?.user?.id} />
          }
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
