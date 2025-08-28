"use client";

import { Category } from "@prisma/client";
import {
  FcElectronics,
  FcCommandLine,
  FcCurrencyExchange,
  FcEngineering,
  FcBusiness,
  FcPlanner,
  FcDatabase,
  FcManager,
} from "react-icons/fc";
import { IconType } from "react-icons";
import { CategoryItem } from "./category-item";

interface CategoriesProps {
  items: Category[];
}

const iconMap: Record<Category["name"], IconType> = {
  "Computer Science": FcElectronics,
  programming: FcCommandLine,
  Accounting: FcCurrencyExchange,
  Engineering: FcEngineering,
  Management: FcBusiness,
  "Projects Management": FcPlanner,
  "Engineering Management": FcManager,
  Database: FcDatabase,
};

export const Categories = ({ items }: CategoriesProps) => {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
      {items.map((item) => (
        <CategoryItem
          key={item.id}
          icon={iconMap[item.name]}
          label={item.name}
          value={item.id}
        />
      ))}
    </div>
  );
};
