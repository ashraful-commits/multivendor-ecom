"use client";
 
import { UploadButton } from "../../../lib/uploadthing";
import { useState } from 'react';
import  Image  from 'next/image';
import { Button } from '@/components/ui/button';
import {Edit,CloudUpload} from "lucide-react"
import {ImageUploadProps} from "../../../typescript"
export default function ImageUpload({image,setImage,endpoint}:ImageUploadProps) {
  
  return (
    <main className="flex border mt-4 rounded-md min-h-52 flex-col items-center justify-between  p-10">
     
      {image ? <div>
        <Button variant="secondary" onClick={()=>setImage(null)} className="my-5 flex items-center justify-between gap-x-2"><Edit/> Change image</Button>
        <Image width={300} height={300} src={image} alt="upload"/>
      </div>:<div className="flex flex-col items-center justify-center gap-3">
        <CloudUpload/>
      <UploadButton

        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res[0].url);
          setImage(res[0].url)
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      /></div>}
    </main>
  );
}
