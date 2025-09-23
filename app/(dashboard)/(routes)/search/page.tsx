import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { getCourses } from "@/actions/get-courses";
import SearchPageClient from "./SearchPageClient";
import { Suspense } from "react";

const SearchPage = async ({
  searchParams,
}: {
  searchParams?: { title?: string; categoryId?: string };
}) => {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/");
  }

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const courses = await getCourses({
    userId,
    ...searchParams,
  });

  return (
    <Suspense fallback={<div>Loading search page...</div>}>
      <SearchPageClient categories={categories} courses={courses} />
    </Suspense>
  );
};

export default SearchPage;
