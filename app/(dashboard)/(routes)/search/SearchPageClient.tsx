"use client";

import { Suspense } from "react";
import { SearchInput } from "@/components/search-input";
import { CoursesList } from "@/components/courses-list";
import { Categories } from "./_components/categories";

import { Category } from "@prisma/client";
import { CourseWithProgressWithCategory } from "@/actions/get-courses";

interface SearchPageClientProps {
  categories: Category[];
  courses: CourseWithProgressWithCategory[];
}

export default function SearchPageClient({
  categories,
  courses,
}: SearchPageClientProps) {
  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <Suspense
          fallback={<div className="text-slate-500">Loading search...</div>}
        >
          <SearchInput />
        </Suspense>
      </div>
      <div className="p-6">
        <Categories items={categories} />
        <CoursesList items={courses} />
      </div>
    </>
  );
}
