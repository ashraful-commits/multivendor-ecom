"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TableAction from "./TableComponent/TableAction";
import OrderManagement from './TableComponent/OrderManagement';
import TableSelectTab from './TableComponent/TableSelectTab';
import TableSingleSelectTab from './TableComponent/TableSingleSelectTab';

import {
  bannerData,
  brandData,
  CategoryData,
  couponData,
  ProductData,
  TagData,
  communityData,
  customerData,
  farmerData,
  marketData,
  staffData,orderData,userData
} from "../../typescript";


export const bannerColumns: ColumnDef<bannerData>[] = [
  {
    accessorKey: "id",
    header: ({ table }) => (
      <TableSelectTab name="banner" table={table}/>
    ),
    cell: ({ row }) => (
      <TableSingleSelectTab name="banner" row={row}/>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <Button
        className="text-white dark:text-slate-900"
        variant="ghost"
        onClick={() => column.toggleSorting()}
      >
        Title
        <ArrowUpDown
          className={`ml-2 h-4 w-4 ${
            column.getIsSorted() === "asc" ? "rotate-180" : ""
          }`}
        />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="lowercase text-white dark:text-slate-900">
        {row.getValue("title")}
      </div>
    ),
  },
  {
    accessorKey: "imgUrl",
    header: "Image",
    cell: ({ row }) => (
      <Image
      loading="lazy"
      blurDataURL={row.getValue("imgUrl")}
        src={row.getValue("imgUrl")}
        alt={row.getValue("title")}
        width={1000}
        height={1000}
        className="h-8 w-8"
      />
    ),
  },
  {
    accessorKey: "isActive",
    header: "Active",
    cell: ({ row }) => <Checkbox checked={row.getValue("isActive")} />,
  },
  {
    accessorKey: "action",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const banner = row.original;

      return (
        <TableAction
          name="banner"
          id={banner.id}
          editUrl={`/dashboard/banners/update/${banner.id}`}
        />
      );
    },
  },
];
export const brandColumns: ColumnDef<brandData>[] = [
  {
    accessorKey: "id",
    header: ({ table }) => (
      <TableSelectTab name="brand" table={table}/>
    ),
    cell: ({ row }) => (
      <TableSingleSelectTab name="brand" row={row}/>
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        className="text-white dark:text-slate-900"
        variant="ghost"
        onClick={() => column.toggleSorting()}
      >
        Name
        <ArrowUpDown
          className={`ml-2 h-4 w-4 ${
            column.getIsSorted() === "asc" ? "rotate-180" : ""
          }`}
        />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="lowercase text-white dark:text-slate-900">
        {row.getValue("name")}
      </div>
    ),
  },
  {
    accessorKey: "imgUrl",
    header: "Image",
    cell: ({ row }) => (
      <Image
        src={row.getValue("imgUrl")}
        alt={row.getValue("name")}
        width={1000}
        height={1000}
        className="h-8 w-8"
      />
    ),
  },
  {
    accessorKey: "isActive",
    header: "Active",
    cell: ({ row }) => <Checkbox checked={row.getValue("isActive")} />,
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const brand = row.original;
      return (
        <TableAction
          name="brand"
          id={brand.id}
          editUrl={`/dashboard/brands/update/${brand.id}`}
        />
      );
    },
  },
];
export const CategoryColumns: ColumnDef<CategoryData>[] = [
  {
    accessorKey: "id",
    header: ({ table }) => (
      <TableSelectTab name="category" table={table}/>
    ),
    cell: ({ row }) => (
      <TableSingleSelectTab name="category" row={row}/>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        className="text-white dark:text-slate-900"
        variant="ghost"
        onClick={() => column.toggleSorting()}
      >
        Name
        <ArrowUpDown
          className={`ml-2 h-4 w-4 ${
            column.getIsSorted() === "asc" ? "rotate-180" : ""
          }`}
        />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="lowercase text-white dark:text-slate-900">
        {row.getValue("name")}
      </div>
    ),
  },

  {
    accessorKey: "slug",
    header: ({ column }) => (
      <Button
        className="text-white dark:text-slate-900"
        variant="ghost"
        onClick={() => column.toggleSorting()}
      >
        Slug
        <ArrowUpDown
          className={`ml-2 h-4 w-4 ${
            column.getIsSorted() === "asc" ? "rotate-180" : ""
          }`}
        />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="lowercase text-white dark:text-slate-900">
        {row.getValue("slug")}
      </div>
    ),
  },
  {
    accessorKey: "imgUrl",
    header: "Image",
    cell: ({ row }) => (
      <Image
        src={row.getValue("imgUrl")}
        alt={row.getValue("name")}
        width={1000}
        height={1000}
        className="h-8 w-8"
      />
    ),
  },
  {
    accessorKey: "isActive",
    header: "Active",
    cell: ({ row }) => <Checkbox checked={row.getValue("isActive")} />,
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const category = row.original;
      return (
        <TableAction
          name="category"
          id={category.id}
          editUrl={`/dashboard/categories/update/${category.id}`}
        />
      );
    },
  },
];
export const CouponColumns: ColumnDef<couponData>[] = [
  {
    accessorKey: "id",
    header: ({ table }) => (
      <TableSelectTab name="coupon" table={table}/>
    ),
    cell: ({ row }) => (
      <TableSingleSelectTab name="coupon" row={row}/>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        className="text-white dark:text-slate-900"
        variant="ghost"
        onClick={() => column.toggleSorting()}
      >
        Name
        <ArrowUpDown
          className={`ml-2 h-4 w-4 ${
            column.getIsSorted() === "asc" ? "rotate-180" : ""
          }`}
        />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="lowercase text-white dark:text-slate-900">
        {row.getValue("name")}
      </div>
    ),
  },
  {
    accessorKey: "coupon",
    header: ({ column }) => (
      <Button
        className="text-white dark:text-slate-900"
        variant="ghost"
        onClick={() => column.toggleSorting()}
      >
        Coupon
        <ArrowUpDown
          className={`ml-2 h-4 w-4 ${
            column.getIsSorted() === "asc" ? "rotate-180" : ""
          }`}
        />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="lowercase text-white dark:text-slate-900">
        {row.getValue("coupon")}
      </div>
    ),
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <Button
        className="text-white dark:text-slate-900"
        variant="ghost"
        onClick={() => column.toggleSorting()}
      >
        Date
        <ArrowUpDown
          className={`ml-2 h-4 w-4 ${
            column.getIsSorted() === "asc" ? "rotate-180" : ""
          }`}
        />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="lowercase text-white dark:text-slate-900">
        {row.getValue("date")}
      </div>
    ),
  },
  {
    accessorKey: "isActive",
    header: "Active",
    cell: ({ row }) => <Checkbox checked={row.getValue("isActive")} />,
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const coupon = row.original;
      return (
        <TableAction
          name="coupon"
          id={coupon.id}
          editUrl={`/dashboard/coupons/update/${coupon.id}`}
        />
      );
    },
  },
];
export const ProductColumns: ColumnDef<ProductData>[] = [
  {
    accessorKey: "id",
    header: ({ table }) => (
      <TableSelectTab name="product" table={table}/>
    ),
    cell: ({ row }) => (
      <TableSingleSelectTab name="product" row={row}/>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <span className="text-white block dark:text-slate-900 min-w-32 truncate max-w-32">
        {row.original.name}
      </span>
    ),
  },
  {
    accessorKey: "imgUrl",
    header: "Image",
    cell: ({ row }) => (
      <Image
        src={row.original.imgUrl.length > 0 ? row.original.imgUrl[0] : ""}
        alt={row.original.name}
        width={1000}
        height={1000}
        className="h-8 w-8"
      />
    ),
  },
  {
    accessorKey: "isActive",
    header: "Active",
    cell: ({ row }) => <Checkbox checked={row.original.isActive} />,
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const product = row.original;
      return (
        <TableAction
          name="product"
          id={product.id}
          editUrl={`/dashboard/products/update/${product.id}`}
        />
      );
    },
  },
];
export const TagColumns: ColumnDef<TagData>[] = [
  {
    accessorKey: "id",
    header: ({ table }) => (
      <TableSelectTab name="tag" table={table}/>
    ),
    cell: ({ row }) => (
      <TableSingleSelectTab name="tag" row={row}/>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        className="text-white dark:text-slate-900"
        variant="ghost"
        onClick={() => column.toggleSorting()}
      >
        Name
        <ArrowUpDown
          className={`ml-2 h-4 w-4 ${
            column.getIsSorted() === "asc" ? "rotate-180" : ""
          }`}
        />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="lowercase text-white dark:text-slate-900">
        {row.getValue("name")}
      </div>
    ),
  },

  {
    accessorKey: "slug",
    header: ({ column }) => (
      <Button
        className="text-white dark:text-slate-900"
        variant="ghost"
        onClick={() => column.toggleSorting()}
      >
        Slug
        <ArrowUpDown
          className={`ml-2 h-4 w-4 ${
            column.getIsSorted() === "asc" ? "rotate-180" : ""
          }`}
        />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="lowercase text-white dark:text-slate-900">
        {row.getValue("slug")}
      </div>
    ),
  },

  {
    accessorKey: "isActive",
    header: "Active",
    cell: ({ row }) => <Checkbox checked={row.getValue("isActive")} />,
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const tag = row.original;
      return (
        <TableAction
          name="tag"
          id={tag.id}
          editUrl={`/dashboard/tags/update/${tag.id}`}
        />
      );
    },
  },
];
export const CommunityColumns: ColumnDef<communityData>[] = [
  {
    accessorKey: "id",
    header: ({ table }) => (
      <TableSelectTab name="community" table={table}/>
    ),
    cell: ({ row }) => (
      <TableSingleSelectTab name="community" row={row}/>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <Button
        className="text-white dark:text-slate-900"
        variant="ghost"
        onClick={() => column.toggleSorting()}
      >
        Title
        <ArrowUpDown
          className={`ml-2 h-4 w-4 ${
            column.getIsSorted() === "asc" ? "rotate-180" : ""
          }`}
        />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="lowercase text-white dark:text-slate-900">
        {row.getValue("title")}
      </div>
    ),
  },
 

  {
    accessorKey: "imgUrl",
    header: "Image",
    cell: ({ row }) => (
      <Image
        src={row.getValue("imgUrl") ? row.getValue("imgUrl") : ""}
        alt={row.getValue("name")}
        width={1000}
        height={1000}
        className="h-8 w-8"
      />
    ),
  },
  {
    accessorKey: "isActive",
    header: "Active",
    cell: ({ row }) => <Checkbox checked={row.getValue("isActive")} />,
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const training = row.original;
      return (
        <TableAction
          name="training"
          id={training.id}
          editUrl={`/dashboard/community/update/${training.id}`}
        />
      );
    },
  },
];

export const CustomerColumns: ColumnDef<customerData>[] = [
  {
    accessorKey: "id",
    header: ({ table }) => (
      <TableSelectTab name="customer" table={table}/>
    ),
    cell: ({ row }) => (
      <TableSingleSelectTab name="customer" row={row}/>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "firstName",
    header: ({ column }) => (
      <Button
        className="text-white dark:text-slate-900"
        variant="ghost"
        onClick={() => column.toggleSorting()}
      >
        Name
        <ArrowUpDown
          className={`ml-2 h-4 w-4 ${
            column.getIsSorted() === "asc" ? "rotate-180" : ""
          }`}
        />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="lowercase flex items-center gap-x-2 text-white dark:text-slate-900">
        <span>{row.getValue("firstName")}</span>
        <span>

        {row.getValue("firstName")}
        {row.getValue("lastName")}
        </span>
      </div>
    ),
  },

  {
    accessorKey: "email",
    header: ({ column }) => (
      <Button
        className="text-white dark:text-slate-900"
        variant="ghost"
        onClick={() => column.toggleSorting()}
      >
        Email
        <ArrowUpDown
          className={`ml-2 h-4 w-4 ${
            column.getIsSorted() === "asc" ? "rotate-180" : ""
          }`}
        />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="lowercase text-white dark:text-slate-900">
        {row.getValue("email")}
      </div>
    ),
  },
  {
    accessorKey: "streetAddress",
    header:"Street Address",
    cell: ({ row }) => (
      <div className="lowercase text-white dark:text-slate-900">
        {row.getValue("streetAddress")}
      </div>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const customer = row.original;
      return (
        <TableAction
          name="customer"
          id={customer.id}
          editUrl={`/dashboard/customers/update/${customer.id}`}
        />
      );
    },
  },
];
export const FarmerColumns: ColumnDef<farmerData>[] = [
  {
    accessorKey: "id",
    header: ({ table }) => (
      <TableSelectTab name="farmer" table={table}/>
    ),
    cell: ({ row }) => (
      <TableSingleSelectTab name="farmer" row={row}/>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        className="text-white dark:text-slate-900"
        variant="ghost"
        onClick={() => column.toggleSorting()}
      >
        Name
        <ArrowUpDown
          className={`ml-2 h-4 w-4 ${
            column.getIsSorted() === "asc" ? "rotate-180" : ""
          }`}
        />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="lowercase text-white dark:text-slate-900">
        {row.getValue("name")}
      </div>
    ),
  },
  {
    accessorKey: "contact",
    header: ({ column }) => (
      <Button
        className="text-white dark:text-slate-900"
        variant="ghost"
        onClick={() => column.toggleSorting()}
      >
        Contact
        <ArrowUpDown
          className={`ml-2 h-4 w-4 ${
            column.getIsSorted() === "asc" ? "rotate-180" : ""
          }`}
        />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="lowercase text-white dark:text-slate-900">
        {row.getValue("contact")}
      </div>
    ),
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <Button
        className="text-white dark:text-slate-900"
        variant="ghost"
        onClick={() => column.toggleSorting()}
      >
        Phone
        <ArrowUpDown
          className={`ml-2 h-4 w-4 ${
            column.getIsSorted() === "asc" ? "rotate-180" : ""
          }`}
        />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="lowercase text-white dark:text-slate-900">
        {row.getValue("phone")}
      </div>
    ),
  },
  {
    accessorKey: "uniqueCode",
    header: ({ column }) => (
      <Button
        className="text-white dark:text-slate-900"
        variant="ghost"
        onClick={() => column.toggleSorting()}
      >
        Unique Code
        <ArrowUpDown
          className={`ml-2 h-4 w-4 ${
            column.getIsSorted() === "asc" ? "rotate-180" : ""
          }`}
        />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="lowercase text-white dark:text-slate-900">
        {row.getValue("uniqueCode")}
      </div>
    ),
  },
  {
    accessorKey: "landSize",
    header: ({ column }) => (
      <Button
        className="text-white dark:text-slate-900"
        variant="ghost"
        onClick={() => column.toggleSorting()}
      >
        Land Size
        <ArrowUpDown
          className={`ml-2 h-4 w-4 ${
            column.getIsSorted() === "asc" ? "rotate-180" : ""
          }`}
        />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="lowercase text-white dark:text-slate-900">
        {row.getValue("landSize")}
      </div>
    ),
  },
  {
    accessorKey: "mainCrop",
    header: ({ column }) => (
      <Button
        className="text-white dark:text-slate-900"
        variant="ghost"
        onClick={() => column.toggleSorting()}
      >
        Main Crop
        <ArrowUpDown
          className={`ml-2 h-4 w-4 ${
            column.getIsSorted() === "asc" ? "rotate-180" : ""
          }`}
        />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="lowercase text-white dark:text-slate-900">
        {row.getValue("mainCrop")}
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <Button
        className="text-white dark:text-slate-900"
        variant="ghost"
        onClick={() => column.toggleSorting()}
      >
        email
        <ArrowUpDown
          className={`ml-2 h-4 w-4 ${
            column.getIsSorted() === "asc" ? "rotate-180" : ""
          }`}
        />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="lowercase text-white dark:text-slate-900">
        {row.getValue("email")}
      </div>
    ),
  },
  {
    accessorKey: "imgUrl",
    header: "Image",
    cell: ({ row }) => (
      <Image
        src={row.getValue("imgUrl") ? row.getValue("imgUrl") : ""}
        alt={row.getValue("name")}
        width={1000}
        height={1000}
        className="h-8 w-8"
      />
    ),
  },
  {
    accessorKey: "isActive",
    header: "Active",
    cell: ({ row }) => <Checkbox checked={row.getValue("isActive")} />,
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const farmer = row.original;
      return (
        <TableAction
          name="farmer"
          id={farmer.id}
          editUrl={`/dashboard/farmers/update/${farmer.id}`}
        />
      );
    },
  },
];
export const MarketColumns: ColumnDef<marketData>[] = [
  {
    accessorKey: "id",
    header: ({ table }) => (
      <TableSelectTab name="market" table={table}/>
    ),
    cell: ({ row }) => (
      <TableSingleSelectTab name="market" row={row}/>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        className="text-white dark:text-slate-900"
        variant="ghost"
        onClick={() => column.toggleSorting()}
      >
        Name
        <ArrowUpDown
          className={`ml-2 h-4 w-4 ${
            column.getIsSorted() === "asc" ? "rotate-180" : ""
          }`}
        />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="lowercase text-white dark:text-slate-900">
        {row.getValue("name")}
      </div>
    ),
  },

  {
    accessorKey: "slug",
    header: "Slug",
    cell: ({ row }) => (
      <div className="lowercase text-white dark:text-slate-900">
        {row.getValue("slug")}
      </div>
    ),
  },
  {
    accessorKey: "imgUrl",
    header: "Image",
    cell: ({ row }) => (
      <Image
        src={row.getValue("imgUrl")}
        alt={row.getValue("name")}
        width={1000}
        height={1000}
        className="h-8 w-8"
      />
    ),
  },
  {
    accessorKey: "isActive",
    header: "Active",
    cell: ({ row }) => <Checkbox checked={row.getValue("isActive")} />,
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const market = row.original;
      return (
        <TableAction
          name="market"
          id={market.id}
          editUrl={`/dashboard/markets/update/${market.id}`}
        />
      );
    },
  },
];
export const StaffColumns: ColumnDef<staffData>[] = [
  {
    accessorKey: "id",
    header: ({ table }) => (
      <TableSelectTab name="staff" table={table}/>
    ),
    cell: ({ row }) => (
      <TableSingleSelectTab name="staff" row={row}/>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        className="text-white dark:text-slate-900"
        variant="ghost"
        onClick={() => column.toggleSorting()}
      >
        Name
        <ArrowUpDown
          className={`ml-2 h-4 w-4 ${
            column.getIsSorted() === "asc" ? "rotate-180" : ""
          }`}
        />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="lowercase text-white dark:text-slate-900">
        {row.getValue("name")}
      </div>
    ),
  },

  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <div className="lowercase text-white dark:text-slate-900">
        {row.getValue("email")}
      </div>
    ),
  },
  {
    accessorKey: "imgUrl",
    header: "Image",
    cell: ({ row }) => (
      <Image
        src={row.getValue("imgUrl") ? row.getValue("imgUrl") : ""}
        alt={row.getValue("name")}
        width={1000}
        height={1000}
        className="h-8 w-8"
      />
    ),
  },
  {
    accessorKey: "isActive",
    header: "Active",
    cell: ({ row }) => <Checkbox checked={row.getValue("isActive")} />,
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const staff = row.original;
      return (
        <TableAction
          name="staff"
          id={staff.id}
          editUrl={`/dashboard/staff/update/${staff.id}`}
        />
      );
    },
  },
];
export const OrderColumns: ColumnDef<orderData>[] = [
  {
    accessorKey: "id",
    header: ({ table }) => (
      <TableSelectTab name="order" table={table}/>
    ),
    cell: ({ row }) => (
      <TableSingleSelectTab name="order" row={row}/>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "firstName",
    header: ({ column }) => (
      <Button
        className="text-white dark:text-slate-900"
        variant="ghost"
        onClick={() => column.toggleSorting()}
      >
        Full name
        <ArrowUpDown
          className={`ml-2 h-4 w-4 ${
            column.getIsSorted() === "asc" ? "rotate-180" : ""
          }`}
        />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="lowercase text-white flex items-center gap-x-2 dark:text-slate-900">
        <span>

        {row.getValue("firstName")}
        </span>
        <span>

        {row.getValue("lastName")}
        </span>
      </div>
    ),
  },

  {
    accessorKey: "streetAddress",
    header: "Street Address",
    cell: ({ row }) => (
      <div className="lowercase text-white dark:text-slate-900">
        {row.getValue("streetAddress")}
      </div>
    ),
  },
  {
    accessorKey: "user",
    header: "Image",
 
    cell: ({ row }) => {
      const user: userData = row.getValue("user");
      const imgUrl = user?.imgUrl;
      const altName = user?.name;

      return (
        <Image
          src={imgUrl||""}
          alt={altName || "User Image"}
          width={1000}
          height={1000}
          className="h-8 w-8"
        />
      );
    },
  },
  {
    accessorKey: "status",
    header: "Order status",
    cell: ({ row }) => <OrderManagement id={row.original.id}/>,
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const order = row.original;
      return (
        <TableAction
          name="order"
          id={order.id}
          editUrl={`/dashboard/orders/update/${order.id}`}
        />
      );
    },
  },
];
