import { UploadButton } from "../../../lib/uploadthing";
import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Edit, CloudUpload } from "lucide-react";
import {MultipleImageUploadProps} from "../../../typescript"
export default function MultipleImageUpload({ multiple,images, setImages, endpoint }:MultipleImageUploadProps) {
  

  return (
    <main className="flex border mt-4 rounded-md min-h-52 flex-col items-center justify-between p-10">

      {images.length > 0 ? (
        <div>
          <Button variant="secondary" onClick={() => setImages([])} className="my-5 flex items-center justify-between gap-x-2">
            <Edit /> Change images
          </Button>
          {images?.map((image, index) => (
            <div key={index}>
              <Image blurDataURL={image} loading="lazy" width={50} height={50} src={image} alt={`Uploaded Image ${index}`} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-3">
          <CloudUpload />
          <UploadButton

            endpoint={endpoint}
            onClientUploadComplete={(res) => {
              //console.log(res)
              setImages(res?.map((item)=>item.url))
            }}
            onUploadError={(error: Error) => {
             
              alert(`ERROR! ${error.message}`);
            }}
          />
        </div>
      )}
    </main>
  );
}
