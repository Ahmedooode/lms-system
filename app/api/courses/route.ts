import { auth } from "@clerk/nextjs/server";

import { db } from "@/lib/db";

import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   try {
//     const { userId } = await auth();
//     const { title } = await req.json();

//     if (!userId) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }
//     const course = await db.course.create({
//       data: {
//         userId,
//         title,
//       },
//     });

//     return NextResponse.json(course);
//   } catch (error) {
//     console.log("[COURSES]", error);
//     return new NextResponse("Internal Error", { status: 500 });
//   }
// }

import { Prisma } from "@prisma/client"; // ✅ import this

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { title, price, imageUrl, description } = body;

    if (!title) {
      return new NextResponse("Title is required", { status: 400 });
    }

    // ✅ Create a typed object for CourseCreateInput
    const courseData: Prisma.CourseCreateInput = {
      userId,
      title,
      price: price ?? null,
      imageUrl: imageUrl ?? null,
      description: description ?? null,
      category: undefined, // optional relation, not required in create
      attachments: {
        create: [],
      },
    };

    const course = await db.course.create({
      data: courseData,
    });

    return NextResponse.json(course);
  } catch (error) {
    console.error("[COURSES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
