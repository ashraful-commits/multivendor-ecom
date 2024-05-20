"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  staffData,
} from "../../typescript";

export const bannerColumns: ColumnDef<bannerData>[] = [
  {
    accessorKey: "id",
    header: ({ table }) => (
      <Checkbox
        className="border border-white dark:border-black"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0 text-white dark:text-slate-900"
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(banner.id)}
            >
              Copy banner ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View banner</DropdownMenuItem>
            <DropdownMenuItem>Edit banner</DropdownMenuItem>
            <DropdownMenuItem>Delete banner</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
export const brandColumns: ColumnDef<brandData>[] = [
  {
    accessorKey: "id",
    header: ({ table }) => (
      <Checkbox
        className="border border-white dark:border-black"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0 text-white dark:text-slate-900"
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(brand.id)}
            >
              Copy brand ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View brand</DropdownMenuItem>
            <DropdownMenuItem>Edit brand</DropdownMenuItem>
            <DropdownMenuItem>Delete brand</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
export const CategoryColumns: ColumnDef<CategoryData>[] = [
  {
    accessorKey: "id",
    header: ({ table }) => (
      <Checkbox
        className="border border-white dark:border-black"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0 text-white dark:text-slate-900"
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(category.id)}
            >
              Copy category ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View category</DropdownMenuItem>
            <DropdownMenuItem>Edit category</DropdownMenuItem>
            <DropdownMenuItem>Delete category</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
export const CouponColumns: ColumnDef<couponData>[] = [
  {
    accessorKey: "id",
    header: ({ table }) => (
      <Checkbox
        className="border border-white dark:border-black"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0 text-white dark:text-slate-900"
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(coupon.id)}
            >
              Copy coupon ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View coupon</DropdownMenuItem>
            <DropdownMenuItem>Edit coupon</DropdownMenuItem>
            <DropdownMenuItem>Delete coupon</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
export const ProductColumns: ColumnDef<ProductData>[] = [
  {
    accessorKey: "id",
    header: ({ table }) => (
      <Checkbox
        className="border border-white dark:border-black"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <span className="text-white dark:text-slate-900">
        {row.original.name}
      </span>
    )
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0 text-white dark:text-slate-900"
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(product.id)}
            >
              Copy product ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View product</DropdownMenuItem>
            <DropdownMenuItem>Edit product</DropdownMenuItem>
            <DropdownMenuItem>Delete product</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
export const TagColumns: ColumnDef<TagData>[] = [
  {
    accessorKey: "id",
    header: ({ table }) => (
      <Checkbox
        className="border border-white dark:border-black"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0 text-white dark:text-slate-900"
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(tag.id)}
            >
              Copy tag ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View tag</DropdownMenuItem>
            <DropdownMenuItem>Edit tag</DropdownMenuItem>
            <DropdownMenuItem>Delete tag</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
export const CommunityColumns: ColumnDef<communityData>[] = [
  {
    accessorKey: "id",
    header: ({ table }) => (
      <Checkbox
        className="border border-white dark:border-black"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
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
    accessorKey: "content",
    header: ({ column }) => (
      <Button
        className="text-white dark:text-slate-900"
        variant="ghost"
        onClick={() => column.toggleSorting()}
      >
        Content
        <ArrowUpDown
          className={`ml-2 h-4 w-4 ${
            column.getIsSorted() === "asc" ? "rotate-180" : ""
          }`}
        />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="lowercase text-white dark:text-slate-900">
        {row.getValue("content")}
      </div>
    ),
  },

  {
    accessorKey: "description",
    header: ({ column }) => (
      <Button
        className="text-white dark:text-slate-900"
        variant="ghost"
        onClick={() => column.toggleSorting()}
      >
        Description
        <ArrowUpDown
          className={`ml-2 h-4 w-4 ${
            column.getIsSorted() === "asc" ? "rotate-180" : ""
          }`}
        />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="lowercase text-white dark:text-slate-900">
        {row.getValue("description")}
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0 text-white dark:text-slate-900"
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(training.id)}
            >
              Copy training ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View training</DropdownMenuItem>
            <DropdownMenuItem>Edit training</DropdownMenuItem>
            <DropdownMenuItem>Delete training</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const CustomerColumns: ColumnDef<customerData>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        className="border border-white dark:border-black"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
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
      const product = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0 text-white dark:text-slate-900"
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(product.id)}
            >
              Copy product ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View product</DropdownMenuItem>
            <DropdownMenuItem>Edit product</DropdownMenuItem>
            <DropdownMenuItem>Delete product</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
export const FarmerColumns: ColumnDef<farmerData>[] = [
  {
    accessorKey: "id",
    header: ({ table }) => (
      <Checkbox
        className="border border-white dark:border-black"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0 text-white dark:text-slate-900"
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(farmer.id)}
            >
              Copy farmer ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View farmer</DropdownMenuItem>
            <DropdownMenuItem>Edit farmer</DropdownMenuItem>
            <DropdownMenuItem>Delete farmer</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
export const MarketColumns: ColumnDef<marketData>[] = [
  {
    accessorKey: "id",
    header: ({ table }) => (
      <Checkbox
        className="border border-white dark:border-black"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
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
      const product = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0 text-white dark:text-slate-900"
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(product.id)}
            >
              Copy product ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View product</DropdownMenuItem>
            <DropdownMenuItem>Edit product</DropdownMenuItem>
            <DropdownMenuItem>Delete product</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
export const StaffColumns: ColumnDef<staffData>[] = [
  {
    accessorKey: "id",
    header: ({ table }) => (
      <Checkbox
        className="border border-white dark:border-black"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0 text-white dark:text-slate-900"
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(staff.id)}
            >
              Copy staff ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View staff</DropdownMenuItem>
            <DropdownMenuItem>Edit staff</DropdownMenuItem>
            <DropdownMenuItem>Delete staff</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
