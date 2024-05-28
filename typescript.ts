import { ReactNode,InputHTMLAttributes } from 'react';
import {Session}from "next-auth"
import {UseFormRegister, FieldValues } from 'react-hook-form'

export interface bannerType {
  title: string;
  link: string;
  imgUrl?: string |null;
  isActive?: boolean;
}

  export interface bannerData {
    id: string;
    title: string;
    link?: string;
    imgUrl: string|null;
    isActive: boolean;
    createdAt?: Date|undefined;
    updatedAt?: Date|undefined;
  }
  

export interface brandType {
  name: string;
  slug?:string;
  imgUrl?: string |null;
  isActive: boolean;
}
export interface brandData {
  id: string;
  name: string;
  slug: string;
  imgUrl: string|null;
  description: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}
export interface categoryType {
  name: string;
  slug: string;
  description: string;
  isActive: boolean;
  imgUrl?: string |null|undefined;
}
export interface CategoryData {
  id: string;
  name: string;
  slug: string;
  imgUrl: string;
  description: string;
  isActive: boolean;
  marketIds: string[]; 
  createdAt?: string;
  updatedAt?: string;
}
export interface couponType { name: string; coupon: string; date: string; isActive: boolean; }
export interface couponData {
  id: string;
  name: string;
  coupon: string;
  date: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}
export interface tagType {
  name: string;
  date: string;
  isActive: boolean;
}
export interface TagData {
  id: string;
  name: string;
  date: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}
export interface T {
  id:string;
  name: string;
  date: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}
export interface communityType {
  title: string;
  description: string;
  isActive: boolean;
}
export interface communityData {
  id: string;
  title: string;
  slug: string;
  content: string;
  imgUrl: string;
  description: string;
  isActive: boolean; 
  createdAt?: string;
  updatedAt?: string;
}
export interface farmerType {
  name: string;
  description?: string;
  uniqueCode?: string;
  email: string;
  phone: string;
  address?: string;
  contact?: string;
  landSize?: string;
  terms?: string;
  notes?: string;
  mainCrop?: string;
  productIds?:string[];
  userId?:string;
  imgUrl?:string|null;
  isActive?:boolean;
}
export interface farmerData {
  id: string;
  name: string;
  contact: string;
  email: string;
  landSize: string;
  mainCrop: string;
  phone: string;
  uniqueCode: string;
  slug: string;
  imgUrl: string;
  description: string;
  isActive: boolean;
  marketIds: string[];
  createdAt?: string;
  updatedAt?: string;
  product:ProductData[]
}
export interface marketType {
  name: string;
  description: string;
  isActive: boolean;
  imgUrl:string|null;
  categoryIds: string;
}
export interface marketData {
  id: string;
  name: string;
  slug: string;
  imgUrl: string;
  description: string;
  isActive: boolean;
  marketIds: string[]; 
  createdAt?: string;
  updatedAt?: string;
  categoryIds:string;
}
export interface staffType {
  name: string;
  address: string;
  email: string;
  isActive: boolean;
  password: string;
  description: string;
  phone: string;
  notes: string;
  idNumber: string;
  code: string;
  dob: string; 
  imgUrl: string;
}
export interface staffData {
  id: string;
  name: string;
  slug: string;
  imgUrl: string;
  description: string;
  isActive: boolean;
  marketIds: string[]; 
  createdAt?: string;
  updatedAt?: string;
}
export interface FormContainerProps {
  children: ReactNode;
  className?: string;
}

export interface ProductData {
  id: string;
  name: string;
  slug: string;
  imgUrl: string[];
  salesPrice: number;
  barCode: string;
  productCode: string;
  price: number;
  WholesalesPrice: number;
  minWholeSaleQty: number;
  unit: number;
  stock: number;
  userId: string;
  tagIds: string[];
  tags:TagData[];
  brand:brandData[]
  category:CategoryData[]
  brandId: string;
  categoryId: string;
  description: string;
  isActive: boolean;
  marketIds: string[];
  createdAt?: string;
  updatedAt?: string;
}


export interface CategoryTableProps<TData> {
  columns: ColumnDef<TData>[]
  data: TData[]
}
export interface DatePickerDemoProps {
  date?: Date|undefined;
  setDate?: (date: Date|undefined ) => void; 
}
export interface ImageUploadProps {
  image: string | null;
  setImage: (image: string | null) => void;
  endpoint: string|any;
}
export interface MultipleImageUploadProps {
  images: string[]|any[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
  endpoint: string|any;
  multiple?: boolean|undefined;
}
export interface OptionType {
  label: string;
  value: string;
}
export interface Option {
  id: string;
  name: string;
}

export interface SingleSelectProps {
  defaultValue?: string;
  value?: string ; 
  setValue?: (value: string) => void; 
  data: Option[];
}

export interface TextAreaProps {
  label?: string;
  name: string;
  register:UseFormRegister<FieldValues>;
  errors?: any ;
  type?: string|undefined;
  isRequired?: boolean;
  className?: string;
  defaultValue?: string;
  placeholder?: string;
}


export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name?: string;
  register?: any; 
  errors?: any;
  isRequired?: boolean;
  className?: string;
  defaultValue?: string;
  placeholder?: string;
}


export interface ToggleInputProps {
  label: string;
  name: string;
  register: any; 
}

export interface FromHeaderProps {
  title: string;
  href: string; 
}
export interface LargeCardProps {
  data: {
    color: string;
    icon: React.ReactNode;
    period: string;
    sales: number;
  };
}
export interface NavbarProps {
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  showSidebar: boolean;
}
export interface PageHeaderProps {
  title: string;
  href: string;
  linkTitle: string;
}
export interface FormData {
  name: string;
  sku: string;
  barCode: string;
  price: number;
  salesPrice: number;
  description: string;
  
  wholesalesPrice?: number | undefined;
  minWholeSaleQty?: number | undefined;
  unit?: number | undefined;
  stock: number;
  isActive: boolean;
  isWholesales: boolean;
  categoryIds: string;
  productCode: string;
  slug: string;
  imgUrl: string[];
  tagIds: string[];
  brandId: string;
  userId: string;
}


export interface AuthProviderProps {
  children: ReactNode;
  session:Session;
}
 export interface LinkType {
  href: string;
  icon: React.ReactNode;
  text: string;
  subMenu?: string[];
}

export interface SidebarProps {
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  showSidebar: boolean;
}

export interface SmallCardProps {
  data: {
    title: string;
    sales: number;
    color: string;
    icon: string;
  };
}
export interface DataItem {
  title: string;
  sales: number;
  color: string;
  icon: any;
}
export interface HeadingProps {
  title: string;
}

export interface ColumnDef<T> {
  accessorKey: keyof T;
  header: React.ComponentType<{ column?: any; table?: any }>;
  cell: React.ComponentType<{ row: any }>;
  enableSorting?: boolean;
  enableHiding?: boolean;
}

export interface TextInputProps {
  label?: string;
  name?: string;
  register?: any; 
  errors?: any|undefined; 
  type?: string; 
  isRequired?: boolean;
  className?: string;
  defaultValue?: string;
  placeholder?: string;
}
export interface ProductSingleItem {
  id: string;
  name: string;
  slug: string;
  imgUrl: string[];
  barCode: string;
  productCode: string;
  price: number;
  salesPrice: number;
  wholesalesPrice: number;
  minWholeSaleQty: number;
  unit: number;
  stock: number;
  description: string;
  userId: string;
  tagIds: string[];
  brandId: string;
  categoryId: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}
export interface customerData {
  id: string;
  name: string;
  slug: string;
  imgUrl: string;
  description: string;
  isActive: boolean;
  marketIds: string[]; 
  createdAt: string;
  updatedAt: string;
}
export interface cartData {
  id: string;
  productId:string;
  userId:string;
  quantity:number;
  total:number;
  createdAt: string;
  product:ProductData;
  updatedAt: string;
  msg:string;
}
export interface FavoriteData {
  id: string;
  productId:string;
  userId:string;
  createdAt: string;
  updatedAt: string;
  msg:string;
}
export interface userData {
  id: string;
  name: string;
  password: string;
  email:string;
  verificationToken: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  imgUrl:string|null;
}
export interface orderData {
  id:string;
  lastName:string;
  email:string;
  phone:string;
  quantity:number;
  total:number;
  shippingCost:number;
  paymentMethod:string;
  firstName:string;
  userId: string;
  zipCode:string;
  streetAddress:string;
  city:string;
  country:string;
  cartItems:string[]
  createdAt: string;
  updatedAt: string;
  status:string;
}
export interface PaymentData {
  name: string;
  phone: string;
  email: string;
  streetAddress: string;
  city: string;
  country: string;
  zipCode: string;
  url:string;
  carts: cartData[];
}
export interface SessionData {
  user: {
    id: string;
    name: string | null | undefined;
    email: string | null | undefined;
    imgUrl: string | null ;
  };
  expires: string;
}
export interface CheckoutFormData {
  
  lastName:string;
  email:string;
  phone:string;
  shippingCost:number;
  paymentMethod:string;
  firstName:string;
  userId: string;
  zipCode:string;
  streetAddress:string;
  city:string;
  country:string;
  orderStatus:boolean
  
} 
export interface ReviewData {
  productId:string;
  rating:number;
  review:string;
  id:string;
  city:string;
  country:string;
  
} 