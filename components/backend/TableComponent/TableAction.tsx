import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteBannerMutation } from "../../../lib/features/bannerapi";
import { useDeleteBrandMutation } from "../../../lib/features/brandapi";
import { useDeleteCategoryMutation } from "../../../lib/features/categoryapi";
import { useDeleteCommunityMutation } from "../../../lib/features/communityapi";
import { useDeleteCouponMutation } from "../../../lib/features/couponsapi";
import { useDeleteCustomerMutation } from "../../../lib/features/customerapi";
import { useDeleteFarmerMutation } from "../../../lib/features/farmerapi";
import { useDeleteMarketMutation } from "../../../lib/features/marketapi";
import { useDeleteProductMutation } from "../../../lib/features/productapi";
import { useDeleteStaffMutation } from "../../../lib/features/staffapi";
import { useDeleteTagMutation } from "../../../lib/features/tagapi";
import { useDeleteUserMutation } from "../../../lib/features/userapi";
import { useDeleteOrderMutation } from "../../../lib/features/orderapi";
import toast from "react-hot-toast";
const TableAction = ({
  editUrl,
  name,
  id,
}: {
  editUrl: string;
  name: string;
  id: string;
}) => {
  const [deleteBanner, { isSuccess }] = useDeleteBannerMutation();
  const [deleteBrand, { isSuccess: brandSuccess }] =
    useDeleteBrandMutation();
  const [
    deleteCategory,
    { isSuccess: categorySuccess },
  ] = useDeleteCategoryMutation();
  const [
    deleteCommunity,
    { isSuccess: communitySuccess,  },
  ] = useDeleteCommunityMutation();
  const [deleteCoupon, { isSuccess: couponSuccess }] =
    useDeleteCouponMutation();
  const [
    deleteCustomer,
    { isSuccess: customerSuccess },
  ] = useDeleteCustomerMutation()
  const [deleteFarmer, { isSuccess: farmerSuccess }] =
    useDeleteFarmerMutation();
  const [deleteMarket, { isSuccess: marketSuccess }] =
    useDeleteMarketMutation();
  const [
    deleteProduct,
    { isSuccess: productSuccess },
  ] = useDeleteProductMutation();
  const [deleteStaff, { isSuccess: staffSuccess }] =
    useDeleteStaffMutation();
  const [deleteTag, { isSuccess: tagSuccess }] =
    useDeleteTagMutation();
  const [deleteUser, { isSuccess: userSuccess }] =
    useDeleteUserMutation();
  const [deleteOrder, { isSuccess: orderSuccess }] =
    useDeleteOrderMutation();
  const handleDelete = (id: string) => {
    switch (name) {
      case "banner":
        deleteBanner(id);
        break;
      case "order":
        deleteOrder(id);
        break;
      case "brand":
        deleteBrand(id);
        break;
      case "category":
        deleteCategory(id);
        break;
      case "community":
        deleteCommunity(id);
        break;
      case "coupon":
        deleteCoupon(id);
        break;
      case "customer":
        deleteCustomer(id);
        break;
      case "farmer":
        deleteFarmer(id);
        break;
      case "market":
        deleteMarket(id);
        break;
      case "product":
        deleteProduct(id);
        break;
      case "staff":
        deleteStaff(id);
        break;
      case "tag":
        deleteTag(id);
        break;
      case "user":
        deleteUser(`/user/${id}`);
        break;

      default:
        break;
    }
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("Banner deleted!");
 
    } else if (brandSuccess) {
      toast.success("Brand deleted!");
      
    } else if (categorySuccess) {
      toast.success("Category deleted!");
      
    } else if (communitySuccess) {
      toast.success("Community deleted!");
    
    } else if (couponSuccess) {
      toast.success("Coupon deleted!");
     
    } else if (customerSuccess) {
      toast.success("Customer deleted!");
     
    } else if (farmerSuccess) {
      toast.success("Farmer deleted!");
    
    } else if (marketSuccess) {
      toast.success("Market deleted!");
      
    } else if (productSuccess) {
      toast.success("Product deleted!");
      
    } else if (staffSuccess) {
      toast.success("Staff deleted!");
      
    } else if (tagSuccess) {
      toast.success("Tag deleted!");
     
    } else if (userSuccess) {
      toast.success("User deleted!");
      
    } else if (orderSuccess) {
      toast.success("Order deleted!");
      
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
    userSuccess,

  ]);
  return (
    <div>
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
          <DropdownMenuItem onClick={() => navigator.clipboard.writeText(id)}>
            Copy {name} ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>View {name}</DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={`${editUrl}`}>Edit {name}</Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleDelete(id)}>
            Delete {name}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default TableAction;
