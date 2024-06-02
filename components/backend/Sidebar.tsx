"use client";
import React, { useEffect,useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  LayoutGrid,
  Slack,
  User,
  Compass,
  Warehouse,
  UserSquare2,
  Settings,
  ExternalLink,
  LogOut,
  Boxes,
  LayoutList,
  SendToBack,
  ScanSearch,
  MonitorPlay,
  X,
  DollarSign,
  Building2,
  Tag,
  Hexagon,
} from "lucide-react";
import { SidebarProps, LinkType, SessionData } from "../../typescript";
import useSessionData from "../../hooks/useSessionData";
const Sidebar = ({ setShowSidebar, showSidebar }: SidebarProps) => {
  const session = useSessionData() as SessionData;
  const [links, setLinks] = useState<LinkType[]>([]);
  const path = usePathname();
 
  useEffect(() => {
    if (session?.user?.role === "USER") {
      
      setLinks([{ href: "/dashboard/orders", icon: <Compass />, text: "Orders" }])
      
    } else if (session?.user?.role === "SELLER") {
      setLinks(
        [{ href: "/dashboard", icon: <LayoutGrid />, text: "Dashboard" },
        {
          href: "/dashboard/catalogue",
          icon: <Slack />,
          text: "Catalogue",
          subMenu: [
            { href: "/dashboard/products", icon: <Boxes />, text: "Products" },
          ],
        },
        { href: "/dashboard/customers", icon: <User />, text: "Customers" },

        { href: "/dashboard/orders", icon: <Compass />, text: "Orders" },

        { href: "/dashboard/wallet", icon: <DollarSign />, text: "Wallet" },
        { href: "/dashboard/settings", icon: <Settings />, text: "Settings" },
        {
          href: "/dashboard/store",
          icon: <ExternalLink />,
          text: "Online Store",
        }],
  )
    } else if (session?.user?.role === "FARMER") {
      setLinks(
        [{ href: "/dashboard", icon: <LayoutGrid />, text: "Dashboard" },
        {
          href: "/dashboard/catalogue",
          icon: <Slack />,
          text: "Catalogue",
          subMenu: [
            { href: "/dashboard/products", icon: <Boxes />, text: "Products" },
          ],
        },
        { href: "/dashboard/customers", icon: <User />, text: "Customers" },
        { href: "/dashboard/farmers", icon: <UserSquare2 />, text: "Farmers" },
        { href: "/dashboard/orders", icon: <Compass />, text: "Orders" },
        { href: "/dashboard/staff", icon: <User />, text: "Our Staff" },
        { href: "/dashboard/settings", icon: <Settings />, text: "Settings" },
        {
          href: "/dashboard/store",
          icon: <ExternalLink />,
          text: "Online Store",
        }]
      )
    } else if (session?.user?.role === "ADMIN") {
      setLinks(
        [
        { href: "/dashboard", icon: <LayoutGrid />, text: "Dashboard" },
        { href: "/dashboard/users", icon: <User />, text: "Users" },
        {
          href: "/dashboard/catalogue",
          icon: <Slack />,
          text: "Catalogue",
          subMenu: [
            { href: "/dashboard/products", icon: <Boxes />, text: "Products" },
            {
              href: "/dashboard/attributes",
              icon: <SendToBack />,
              text: "Attributes",
            },
            {
              href: "/dashboard/banners",
              icon: <MonitorPlay />,
              text: "Banners",
            },
            {
              href: "/dashboard/categories",
              icon: <LayoutList />,
              text: "Categories",
            },
            {
              href: "/dashboard/coupons",
              icon: <ScanSearch />,
              text: "Coupons",
            },
            { href: "/dashboard/tags", icon: <Tag />, text: "Tags" },
            { href: "/dashboard/brands", icon: <Hexagon />, text: "Brands" },
          ],
        },
        { href: "/dashboard/customers", icon: <User />, text: "Customers" },
        { href: "/dashboard/markets", icon: <Warehouse />, text: "Markets" },
        { href: "/dashboard/farmers", icon: <UserSquare2 />, text: "Farmers" },
        { href: "/dashboard/orders", icon: <Compass />, text: "Orders" },
        { href: "/dashboard/staff", icon: <User />, text: "Our Staff" },
        {
          href: "/dashboard/community",
          icon: <Building2 />,
          text: "Vendor Community",
        },
        { href: "/dashboard/wallet", icon: <DollarSign />, text: "Wallet" },
        { href: "/dashboard/settings", icon: <Settings />, text: "Settings" },
        {
          href: "/dashboard/store",
          icon: <ExternalLink />,
          text: "Online Store",
        }],
      )
    } else if (session?.user?.role === "MODERATOR") {
      setLinks(
        [{ href: "/dashboard", icon: <LayoutGrid />, text: "Dashboard" },
        {
          href: "/dashboard/catalogue",
          icon: <Slack />,
          text: "Catalogue",
          subMenu: [
            { href: "/dashboard/products", icon: <Boxes />, text: "Products" },
            {
              href: "/dashboard/attributes",
              icon: <SendToBack />,
              text: "Attributes",
            },
            {
              href: "/dashboard/banners",
              icon: <MonitorPlay />,
              text: "Banners",
            },
            {
              href: "/dashboard/categories",
              icon: <LayoutList />,
              text: "Categories",
            },
            {
              href: "/dashboard/coupons",
              icon: <ScanSearch />,
              text: "Coupons",
            },
            { href: "/dashboard/tags", icon: <Tag />, text: "Tags" },
            { href: "/dashboard/brands", icon: <Hexagon />, text: "Brands" },
          ],
        },
        { href: "/dashboard/customers", icon: <User />, text: "Customers" },
        { href: "/dashboard/markets", icon: <Warehouse />, text: "Markets" },
        { href: "/dashboard/farmers", icon: <UserSquare2 />, text: "Farmers" },
        { href: "/dashboard/orders", icon: <Compass />, text: "Orders" },
        { href: "/dashboard/staff", icon: <User />, text: "Our Staff" },
        {
          href: "/dashboard/community",
          icon: <Building2 />,
          text: "Vendor Community",
        },
        { href: "/dashboard/wallet", icon: <DollarSign />, text: "Wallet" },
        { href: "/dashboard/settings", icon: <Settings />, text: "Settings" },
        {
          href: "/dashboard/store",
          icon: <ExternalLink />,
          text: "Online Store",
        }],
      );
    } else if (session?.user?.role === "CUSTOMER") {
      setLinks(
        [{ href: "/dashboard/customers", icon: <User />, text: "Customers" },

        { href: "/dashboard/wallet", icon: <DollarSign />, text: "Wallet" },
        { href: "/dashboard/settings", icon: <Settings />, text: "Settings" }]
      );
    }
  }, [session?.user?.role]);

  return (
    <div className="bg-slate-700  dark:bg-white  space-y-2 min-h-screen">
      <div className="flex justify-between gap-x-2 p-5 overflow-hidden items-center">
        <Link
          className=" flex justify-between items-center px-2 gap-x-2"
          href="/dashboard"
        >
          <Image
            alt="logo"
            loading='lazy'
            blurDataURL={"/logo.jpeg"}
            width={1000}
            height={1000}
            className="w-10 h-10"
            src="/logo.jpeg"
          />
          <span className="inline-block uppercase font-bold text-white dark:text-slate-900">
            Multi <br /> Vendor
          </span>
        </Link>
        <X
          onClick={() => setShowSidebar(!showSidebar)}
          className="hidden max-sm:!block dark:bg-slate-100 rounded-full p-1 w-10 h-10 max-sm:fixed dark:bg-white max-sm:bottom-5 max-sm:right-5 text-white dark:text-slate-900 cursor-pointer "
        />
      </div>
      <div className="space-y-2 flex flex-col dark:text-slate-800 text-slate-50 overflow-y-scroll max-h-[80vh] z-[9999999999] min-h-[80vh]">
        {links?.map((item, i) => (
          <Accordion key={i} type="single" collapsible className="w-full">
            <AccordionItem className="border-none" value={`item-${i}`}>
              {item.subMenu ? (
                <AccordionTrigger className="px-2">
                  <Link
                    className={`flex gap-x-4 py-2 font-bold capitalize px-5  `}
                    href="#"
                  >
                    {item.icon}
                    <span>{item.text}</span>
                  </Link>
                </AccordionTrigger>
              ) : (
                <Link
                  onClick={() => setShowSidebar(false)}
                  className={`flex gap-x-4 py-3 font-bold capitalize px-5 ${
                    path === item.href
                      ? "border-l-blue-500 text-blue-500 border-l-4"
                      : "border-l-gray-700 dark:border-l-gray-100 border-l-4"
                  }`}
                  href={item.href}
                >
                  {item.icon}
                  <span>{item.text}</span>
                </Link>
              )}

              {item.subMenu &&
                item.subMenu.map((subItem, j) => (
                  <AccordionContent
                    className="bg-slate-900 dark:bg-slate-100 py-2"
                    key={j}
                  >
                    <Link
                      onClick={() => setShowSidebar(!showSidebar)}
                      className={`flex gap-x-4 font-bold text-white dark:text-slate-900 capitalize px-5 mx-4 ${
                        path === subItem.href
                          ? "border-l-blue-500 !text-blue-500 border-l-4"
                          : "border-l-gray-900 dark:border-l-gray-100 border-l-4"
                      }`}
                      href={subItem.href}
                    >
                      {subItem.icon}
                      <span>{subItem.text}</span>
                    </Link>
                  </AccordionContent>
                ))}
            </AccordionItem>
          </Accordion>
        ))}
      </div>
      <Button
        variant="secondary"
        className="flex gap-x-4 mx-4 py-3 font-bold capitalize  px-5"
      >
        <LogOut />
        <span>Logout</span>
      </Button>
    </div>
  );
};

export default Sidebar;
