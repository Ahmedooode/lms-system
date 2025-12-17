export const dynamic = "force-dynamic";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { getCourses } from "@/actions/get-courses";
import SearchPageClient from "./SearchPageClient";

type SearchPageProps = {
  searchParams?: Promise<{
    title?: string;
    categoryId?: string;
  }>;
};

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const resolvedSearchParams = await searchParams;

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const courses = await getCourses({
    userId,
    ...resolvedSearchParams,
  });

  return <SearchPageClient categories={categories} courses={courses} />;
};

export default SearchPage;
