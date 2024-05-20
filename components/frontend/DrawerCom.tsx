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
export default function DrawerDemo() {
  const { data: user, isLoading } = useGetSingleUserQuery(
    "beautifulmind429@gmail.com"
  );
  if (isLoading)
    return (
      <div className="w-full h-full">
        <Loading className="mx-auto my-auto" />
      </div>
    );
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="bg-slate-200 hover:bg-slate-200 dark:bg-slate-800" variant="default">
          <CartTotal id={user?.id} />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="border-none">
        <div className="max-h-[500px] overflow-y-scroll" >
      <CartItems id={user?.id} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
