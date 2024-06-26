import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
 
const f = createUploadthing();
 
const auth = (req: Request) => ({ id: "fakeId" }); // Fake auth function
 
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "1MB" } })
    // // Set permissions and file types for this FileRoute
    // .middleware(async ({ req }) => {
    //   // This code runs on your server before upload
    //   const user = await auth(req);
 
    //   // If you throw, the user will not be able to upload
    //   if (!user) throw new UploadThingError("Unauthorized");
 
    //   // Whatever is returned here is accessible in onUploadComplete as `metadata`
    //   return { userId: user.id };
    // })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      //console.log("Upload complete for userId:" );
 
      //console.log("file url", file.url);
 
    
      return { uploadedBy: "done" };
    }),
    bannerUploader: f({ image: { maxFileSize: "2MB" } })
    // // Set permissions and file types for this FileRoute
    // .middleware(async ({ req }) => {
    //   // This code runs on your server before upload
    //   const user = await auth(req);
 
    //   // If you throw, the user will not be able to upload
    //   if (!user) throw new UploadThingError("Unauthorized");
 
    //   // Whatever is returned here is accessible in onUploadComplete as `metadata`
    //   return { userId: user.id };
    // })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      //console.log("Upload complete for userId:" );
 
      //console.log("file url", file.url);
 
    
      return { uploadedBy: "done" };
    }),
    marketImageUpload: f({ image: { maxFileSize: "2MB" } })
    // // Set permissions and file types for this FileRoute
    // .middleware(async ({ req }) => {
    //   // This code runs on your server before upload
    //   const user = await auth(req);
 
    //   // If you throw, the user will not be able to upload
    //   if (!user) throw new UploadThingError("Unauthorized");
 
    //   // Whatever is returned here is accessible in onUploadComplete as `metadata`
    //   return { userId: user.id };
    // })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      //console.log("Upload complete for userId:" );
 
      //console.log("file url", file.url);
 
    
      return { uploadedBy: "done" };
    }),
    farmerImageUpload: f({ image: { maxFileSize: "2MB" } })
    // // Set permissions and file types for this FileRoute
    // .middleware(async ({ req }) => {
    //   // This code runs on your server before upload
    //   const user = await auth(req);
 
    //   // If you throw, the user will not be able to upload
    //   if (!user) throw new UploadThingError("Unauthorized");
 
    //   // Whatever is returned here is accessible in onUploadComplete as `metadata`
    //   return { userId: user.id };
    // })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      //console.log("Upload complete for userId:" );
 
      //console.log("file url", file.url);
 
    
      return { uploadedBy: "done" };
    }),
    productImageUpload: f({image: { maxFileSize: "2MB", maxFileCount: 2 }})
    // // Set permissions and file types for this FileRoute
    // .middleware(async ({ req }) => {
    //   // This code runs on your server before upload
    //   const user = await auth(req);
 
    //   // If you throw, the user will not be able to upload
    //   if (!user) throw new UploadThingError("Unauthorized");
 
    //   // Whatever is returned here is accessible in onUploadComplete as `metadata`
    //   return { userId: user.id };
    // })
    .onUploadComplete(async ({ metadata, file }) => {

      //console.log("Upload complete for userId:" );
      return { uploadedBy: "done" };
    }),
    staffImageUpload: f({ image: { maxFileSize: "2MB" } })
    // // Set permissions and file types for this FileRoute
    // .middleware(async ({ req }) => {
    //   // This code runs on your server before upload
    //   const user = await auth(req);
 
    //   // If you throw, the user will not be able to upload
    //   if (!user) throw new UploadThingError("Unauthorized");
 
    //   // Whatever is returned here is accessible in onUploadComplete as `metadata`
    //   return { userId: user.id };
    // })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      //console.log("Upload complete for userId:" );
 
      //console.log("file url", file.url);
 
    
      return { uploadedBy: "done" };
    }),
    profileImageUpload: f({ image: { maxFileSize: "2MB" } })
    // // Set permissions and file types for this FileRoute
    // .middleware(async ({ req }) => {
    //   // This code runs on your server before upload
    //   const user = await auth(req);
 
    //   // If you throw, the user will not be able to upload
    //   if (!user) throw new UploadThingError("Unauthorized");
 
    //   // Whatever is returned here is accessible in onUploadComplete as `metadata`
    //   return { userId: user.id };
    // })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      //console.log("Upload complete for userId:" );
 
      //console.log("file url", file.url);
 
    
      return { uploadedBy: "done" };
    }),
    registerImageUpload: f({ image: { maxFileSize: "2MB" } })
    // // Set permissions and file types for this FileRoute
    // .middleware(async ({ req }) => {
    //   // This code runs on your server before upload
    //   const user = await auth(req);
 
    //   // If you throw, the user will not be able to upload
    //   if (!user) throw new UploadThingError("Unauthorized");
 
    //   // Whatever is returned here is accessible in onUploadComplete as `metadata`
    //   return { userId: user.id };
    // })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      //console.log("Upload complete for userId:" );
 
      //console.log("file url", file.url);
 
    
      return { uploadedBy: "done" };
    }),
    trainingImageUpload: f({ image: { maxFileSize: "2MB" } })
    // // Set permissions and file types for this FileRoute
    // .middleware(async ({ req }) => {
    //   // This code runs on your server before upload
    //   const user = await auth(req);
 
    //   // If you throw, the user will not be able to upload
    //   if (!user) throw new UploadThingError("Unauthorized");
 
    //   // Whatever is returned here is accessible in onUploadComplete as `metadata`
    //   return { userId: user.id };
    // })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      //console.log("Upload complete for userId:" );
 
      //console.log("file url", file.url);
 
    
      return { uploadedBy: "done" };
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;