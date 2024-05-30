"use client"
import React,{useEffect,useState} from 'react'
import { Download, Trash2 } from "lucide-react";
import Link  from 'next/link';
import {Plus} from "lucide-react"
import Heading from './Heading';
import { PageHeaderProps, TagData, bannerData, brandData, CategoryData, ProductData, marketData, staffData, communityData, couponData } from '../../typescript';
import { toast } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import {
  useDeleteMultiBannerMutation,
  useAddNewMultiBannerMutation,
} from "@/lib/features/bannerapi";
import {
  useDeleteMultiBrandMutation,
  useAddNewMultiBrandMutation,
} from "@/lib/features/brandapi";
import {
  useDeleteMultiCategoryMutation,
  useAddNewMultiCategoryMutation,
} from "@/lib/features/categoryapi";
import {
  useDeleteMultiCommunityMutation,
  useAddNewCommunityMutation,
} from "@/lib/features/communityapi";
import {
  useDeleteMultiCouponMutation,
  useAddNewMultiCouponMutation,
} from "@/lib/features/couponsapi";
import {
  useDeleteMultiMarketMutation,
  useAddNewMultiMarketMutation,
} from "@/lib/features/marketapi";
import {
  useDeleteMultiProductMutation,
  useAddNewMultiProductMutation,
} from "@/lib/features/productapi";
import {
  useDeleteMultiStaffMutation,
  useAddNewMultiStaffMutation,
} from "@/lib/features/staffapi";
import {
  useDeleteMultiTagMutation,
  useAddNewMultiTagMutation,
} from "@/lib/features/tagapi";

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
import { updateBulkData } from "@/lib/features/bulkSlice";
import * as XLSX from "xlsx";
import { RootState } from '@/lib/store';
import { filterDuplicates } from '@/lib/DataFilterFunction';
const PageHeader = ({title,href,linkTitle}:PageHeaderProps) => {
  const bulkIds = useSelector((state: RootState) => state.bulk.bulk);
  console.log(bulkIds.client)
  const dispatch = useDispatch();
  const [file, setFile] = useState<File | null>(null);
  const [jsonData, setJsonData] = useState<string | null>(null);
  const [addNewMultiBanner, { isSuccess: isAddBannerSuccess }] =
  useAddNewMultiBannerMutation();
const [addNewMultiBrand, { isSuccess: isAddBrandSuccess }] =
  useAddNewMultiBrandMutation();
const [addNewMultiCategory, { isSuccess: isAddCategorySuccess }] =
  useAddNewMultiCategoryMutation();
const [addNewMultiCommunity, { isSuccess: isAdCommunitySuccess }] =
  useAddNewCommunityMutation();
const [addNewMultiCoupon, { isSuccess: isAddCouponSuccess }] =
  useAddNewMultiCouponMutation();
const [addNewMultiMarket, { isSuccess: isAddMarketSuccess }] =
  useAddNewMultiMarketMutation();
const [addNewMultiProduct, { isSuccess: isAddProductSuccess }] =
  useAddNewMultiProductMutation();
const [addNewMultiStaff, { isSuccess: isAddNewMultiStaffSuccess }] =
  useAddNewMultiStaffMutation();

const [
  addNewMultiTag,
  { isSuccess: isMultiTagSuccess, isLoading: isMultiTagLoading },
] = useAddNewMultiTagMutation();
  function previewData() {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target?.result;
        if (data) {
          const workbook = XLSX.read(data, { type: "binary" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const json = XLSX.utils.sheet_to_json(worksheet);
          setJsonData(JSON.stringify(json, null, 2));
        }
      };
      reader.readAsBinaryString(file);
    }
  }

  const createData = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target?.result;
        if (data) {
          const workbook = XLSX.read(data, { type: "binary" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const json = XLSX.utils.sheet_to_json(worksheet);
          switch (bulkIds.client) {
            case "Tag":
              addNewMultiTag(
                filterDuplicates<TagData>(json as TagData[], "slug")
              );
              break;
            case "Banner":
              addNewMultiBanner(
                filterDuplicates<bannerData>(json as bannerData[], "title")
              );
              break;
            case "Brands":
              addNewMultiBrand(
                filterDuplicates<brandData>(json as brandData[], "slug")
              );
              break;
            case "Category":
              addNewMultiCategory(
                filterDuplicates<CategoryData>(json as CategoryData[], "slug")
              );
              break;
            case "Product":
              addNewMultiProduct(
                filterDuplicates<ProductData>(json as ProductData[], "slug")
              );
              break;
            case "Market":
              addNewMultiMarket(
                filterDuplicates<marketData>(json as marketData[], "slug")
              );
              break;
            case "Staff":
              addNewMultiStaff(
                filterDuplicates<staffData>(json as staffData[], "email")
              );
              break;
            // case "Community":
            //   addNewMultiCommunity(
            //     filterDuplicates<communityData>(json as communityData[], "slug")
            //   );
            //   break;
            case "Coupon":
              addNewMultiCoupon(
                filterDuplicates<couponData>(json as couponData[], "date")
              );
              break;
            default:
              console.warn("Unhandled client:", bulkIds.client);
              break;
          }
        }
      };
      reader.readAsBinaryString(file);
    }
  };
  useEffect(() => {
     if (isMultiTagSuccess) {
      toast.success("Add Bulk tag!");
    } else {
      toast.dismiss(); 
    }
  }, [
    
    isMultiTagSuccess,
    isMultiTagLoading,
  ]);

  return (

    <div className="flex justify-between items-center bg-slate-900 dark:bg-white text-white dark:text-slate-900">
   <Heading title={title}/>
   <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                onClick={() =>
                  dispatch(updateBulkData({ ...bulkIds, client: `${title}` }))
                }
                className="bg-orange-500 flex gap-x-4 items-center"
                variant="default"
              >
                <Download />
                Bulk Export
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <div className="max-h-[300px] min-h-[300px] overflow-y-scroll">
                <pre>{jsonData}</pre>
              </div>
              <div>
                <Input
                  onChange={(e: any) => setFile(e.target.files[0])}
                  accept=".xls,.xlsx"
                  type="file"
                />
              </div>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you want to export?</AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter className="flex gap-4 max-sm:flex-col">
                <Button onClick={() => previewData()}>Preview</Button>
                <Button
                  onClick={() => {
                    setJsonData(null), setFile(null);
                  }}
                >
                  clear
                </Button>
                <AlertDialogCancel className="bg-red-500">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction onClick={createData}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
   <Link className="flex gap-x-2 bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-700 dark:text-white text-slate-900" href={href}> <Plus/><span>{linkTitle}</span></Link>
  </div>
 
  
  )
}

export default PageHeader
