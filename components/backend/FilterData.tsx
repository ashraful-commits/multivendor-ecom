"use client";
import { Download, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Table } from "@tanstack/react-table";
import * as XLSX from "xlsx";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDeleteMultiBannerMutation } from "@/lib/features/bannerapi";
import { useDeleteMultiBrandMutation } from "@/lib/features/brandapi";
import { useDeleteMultiCategoryMutation } from "@/lib/features/categoryapi";
import { useDeleteMultiCommunityMutation } from "@/lib/features/communityapi";
import { useDeleteMultiCouponMutation } from "@/lib/features/couponsapi";
import { useDeleteMultiCustomerMutation } from "@/lib/features/customerapi";
import { useDeleteMultiFarmerMutation } from "@/lib/features/farmerapi";
import { useDeleteMultiMarketMutation } from "@/lib/features/marketapi";
import { useDeleteMultiProductMutation } from "@/lib/features/productapi";
import { useDeleteMultiStaffMutation } from "@/lib/features/staffapi";
import { useDeleteMultiTagMutation } from "@/lib/features/tagapi";

import { useDeleteMultiOrderMutation } from "@/lib/features/orderapi";
import { RootState } from "@/lib/store";
import { updateBulkData } from "@/lib/features/bulkSlice";

import {
  TagData,
  bannerData,
  brandData,
  CategoryData,
  ProductData,
  marketData,
  staffData,
  communityData,
  couponData,
  tagType,
  bannerType,
} from "../../typescript";
interface DataTableFilterProps<TData> {
  table: Table<TData>;
}
export default function TableFilter<TData>({
  table,
}: DataTableFilterProps<TData>) {
  const bulkIds = useSelector((state: RootState) => state.bulk.bulk);

  const [deleteMultiBanner, { isSuccess }] =
    useDeleteMultiBannerMutation();

  const [deleteMultiBrand, { isSuccess: brandSuccess }] =
    useDeleteMultiBrandMutation();

  const [
    deleteMultiCategory,
    { isSuccess: categorySuccess  },
  ] = useDeleteMultiCategoryMutation();

  const [
    deleteMultiCommunity,
    { isSuccess: communitySuccess },
  ] = useDeleteMultiCommunityMutation();

  const [
    deleteMultiCoupon,
    { isSuccess: couponSuccess },
  ] = useDeleteMultiCouponMutation();

  const [
    deleteMultiCustomer,
    { isSuccess: customerSuccess },
  ] = useDeleteMultiCustomerMutation();
  const [
    deleteMultiFarmer,
    { isSuccess: farmerSuccess },
  ] = useDeleteMultiFarmerMutation()
  const [
    deleteMultiMarket,
    { isSuccess: marketSuccess },
  ] = useDeleteMultiMarketMutation();

  const [
    deleteMultiProduct,
    { isSuccess: productSuccess },
  ] = useDeleteMultiProductMutation();

  const [deleteMultiStaff, { isSuccess: staffSuccess }] =
    useDeleteMultiStaffMutation();

  const [deleteMultiTag, { isSuccess: tagSuccess }] =
    useDeleteMultiTagMutation();

  const [deleteMultiOrder, { isSuccess: orderSuccess }] =
    useDeleteMultiOrderMutation();

  const dispatch = useDispatch();

  const handleDelete = () => {
    switch (bulkIds.client) {
      case "banner":
        deleteMultiBanner(bulkIds.ids);
        break;
      case "order":
        deleteMultiOrder(bulkIds.ids);
        break;
      case "brand":
        deleteMultiBrand(bulkIds.ids);
        break;
      case "category":
        deleteMultiCategory(bulkIds.ids);
        break;
      case "community":
        deleteMultiCommunity(bulkIds.ids);
        break;
      case "coupon":
        deleteMultiCoupon(bulkIds.ids);
        break;
      case "customer":
        deleteMultiCustomer(bulkIds.ids);
        break;
      case "farmer":
        deleteMultiFarmer(bulkIds.ids);
        break;
      case "market":
        deleteMultiMarket(bulkIds.ids);
        break;
      case "product":
        deleteMultiProduct(bulkIds.ids);
        break;
      case "staff":
        deleteMultiStaff(bulkIds.ids);
        break;
      case "tag":
        deleteMultiTag(bulkIds.ids);
        break;

      default:
        break;
    }
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("Banners deleted!");
      
    } else if (brandSuccess) {
      toast.success("Brands deleted!");

    } else if (categorySuccess) {
      toast.success("Categories deleted!");
     
    } else if (communitySuccess) {
      toast.success("Communities deleted!");

    } else if (couponSuccess) {
      toast.success("Coupons deleted!");
   
    } else if (customerSuccess) {
      toast.success("Customers deleted!");
 
    } else if (farmerSuccess) {
      toast.success("Farmers deleted!");

    } else if (marketSuccess) {
      toast.success("Markets deleted!");
  
    } else if (productSuccess) {
      toast.success("Products deleted!");

    } else if (staffSuccess) {
      toast.success("Staffs deleted!");

    } else if (tagSuccess) {
      toast.success("Tags deleted!");

    } else if (orderSuccess) {
      toast.success("Orders deleted!");

    } else {
      toast.dismiss();
    }
  }, [
    orderSuccess,
    isSuccess,
    brandSuccess,
    categorySuccess,
    communitySuccess,
    couponSuccess,
    customerSuccess,
    farmerSuccess,
    marketSuccess,
    productSuccess,
    staffSuccess,
    tagSuccess,
    
  ]);

  return (
    <div className="px-4">
      <div className="flex items-center py-4 gap-x-4">
        <div className="flex gap-4">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                className="bg-red-500 flex gap-x-4 items-center"
                variant="default"
              >
                <Trash2 />
                Bulk Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <Input
          placeholder="Filter name..."
          value={
            ((table?.getColumn("name")?.getFilterValue() as string) ||
              (table?.getColumn("firstName")?.getFilterValue() as string) ||
              (table?.getColumn("title")?.getFilterValue() as string)) ??
            ""
          }
          onChange={(event) => {
            const columnName = ["name", "firstName", "title"];
            for (const name of columnName) {
              const column = table?.getColumn(name);
              if (column) {
                column.setFilterValue(event.target.value);
              }
            }
          }}
          className="w-full"
        />
      </div>
    </div>
  );
}
