// import { auth } from "@clerk/nextjs/server";
// import { createUploadthing, type FileRouter } from "uploadthing/next";

// const f = createUploadthing();

// const handleAuth = async () => {
//   const { userId } = await auth();

//   if (!userId) throw new Error("Unauthorized");
//   return { userId };
// };

// export const ourFileRouter = {
//   courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
//     .middleware(() => handleAuth())
//     .onUploadComplete(() => {}),
//   courseAttachment: f(["text", "image", "video", "audio", "pdf"])
//     .middleware(() => handleAuth())
//     .onUploadComplete(() => {}),
//   chapterVideo: f({ video: { maxFileCount: 1, maxFileSize: "512GB" } })
//     .middleware(() => handleAuth())
//     .onUploadComplete(() => {}),
// } satisfies FileRouter;

// export type OurFileRouter = typeof ourFileRouter;

import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const handleAuth = async () => {
  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorized");
  return { userId };
};

export const ourFileRouter = {
  courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(async ({ file }) => {
      console.log("Uploaded image:", file.url);
      // هنا هيرجع اللينك بتاع الصورة
      return { imageUrl: file.url };
    }),

  courseAttachment: f(["text", "image", "video", "audio", "pdf"])
    .middleware(() => handleAuth())
    .onUploadComplete(async ({ file }) => {
      console.log("Uploaded attachment:", file.url);
      return { url: file.url };
    }),

  chapterVideo: f({ video: { maxFileCount: 1, maxFileSize: "512GB" } })
    .middleware(() => handleAuth())
    .onUploadComplete(async ({ file }) => {
      console.log("Uploaded video:", file.url);
      return { url: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
