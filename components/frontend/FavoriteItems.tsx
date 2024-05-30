"use client";
import React, { useEffect, useState } from "react";
import {
  useGetFavoriteQuery,
  useDeleteFavoriteMutation,
} from "../../lib/features/favoriteapi";
import { useAddNewCartMutation } from "../../lib/features/cartapi";
import Loading from "../Loading";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Plus, Minus, ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import useSessionData from "./../../hooks/useSessionData";
import CartQuantity from "./CartQuantity";
interface SessionData {
  user: {
    id: string;
    name: string | null | undefined;
    email: string | null | undefined;
    image: string | null | undefined;
  };
  expires: string;
}
const Favorite = ({ id }: { id: string }) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [favId, setFavId] = useState<number>(null);
  const { data: favorites, isLoading } = useGetFavoriteQuery(id);
  const [
    deleteFavorite,
    { isSuccess: isDeleteSuccess, isError: isDeleteError },
  ] = useDeleteFavoriteMutation();
  const [addNewCart, {data:cartItem, isSuccess, isError }] = useAddNewCartMutation();
  const router = useRouter();
  const session = useSessionData() as SessionData;
  const handleDelete = (id: string) => {
    deleteFavorite(id);
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("Product added to cart!");
    } else if (isError) {
      toast.error("Failed to add product to cart!");
    }
  }, [isSuccess, isError]);
  
 
  useEffect(() => {
    if (isDeleteSuccess) {
      toast.success("Favorite deleted!");
    } else if (isDeleteError) {
      toast.error("Failed to delete favorite!");
    }
  }, [isDeleteSuccess, isDeleteError]);
  if (isLoading)
    return (
      <div className="w-full h-full">
        <Loading className="mx-auto my-auto" />
      </div>
    );

  const handleAddToCart =  (id: string, price: number) => {
    try {
      if (!session?.user?.id) {
        router.push("/login");
      } else {
        setFavId(id)
        const data = {
          productId: id,
          quantity,
          userId: session?.user?.id,
          total: quantity * price,
        };
         addNewCart(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-full bg-slate-200 dark:bg-slate-700">
      <div className="lg:flex px-5 md:flex sm:flex-col w-full  shadow-xl">
        <div className="flex-1 w-full px-4 py-6 sm:px-6">
          <div className="flex items-start justify-between">
            <h2
              className="text-lg font-medium"
              id="slide-over-title"
            >
              Favorite Products
            </h2>
          </div>
          <div className="mt-8">
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y  divide-gray-200">
                {favorites?.length > 0 ? (
                  favorites.map((favorite, index) => (
                    <li
                      key={index}
                      className="grid grid-cols-3 items-center justify-between w-full py-3"
                    >
                      <div className="h-10 w-10 flex items-center gap-x-5 rounded-md border border-gray-200">
                        <Image
                        blurDataURL={favorite?.product?.imgUrl[0]} loading="lazy"
                          width={1000}
                          height={1000}
                          src={favorite?.product?.imgUrl[0]}
                          alt={favorite?.product?.name}
                          className="w-full h-full object-cover object-center"
                        />
                        <div className="flex flex-col  font-medium ">
                          <h3 className="block w-24 truncate">
                            <a className="block w-24 truncate" href={`/products/${favorite.product.id}`}>
                              {favorite?.product?.name}
                            </a>
                          </h3>
                        </div>
                      </div>
                      <div>
                        <CartQuantity
                        id={favorite?.id}
                          className="flex gap-x-4 max-sm:flex-col items-center"
                          quantity={quantity}
                          setQuantity={setQuantity}
                        />
                      </div>
                      <div className="ml-4 grid grid-cols-1 gap-x-4 items-center justify-center">
                        <div className="flex max-sm:flex-col gap-x-3 gap-y-3 items-center justify-center">
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() =>
                              handleAddToCart(
                                favorite?.product?.id,
                                favorite?.product?.salesPrice
                              )
                            }
                            type="Button"
                            className="font-medium"
                          >
                            <Plus /> <ShoppingBag />
                          </Button>
                          <Button
                            size="sm"
                            variant="default"
                            onClick={() => handleDelete(favorite?.id)}
                            type="button"
                            className="font-medium"
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  <div>No favorite items</div>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Favorite;
