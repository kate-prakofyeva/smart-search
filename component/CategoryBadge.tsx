import { Category } from '@/types/category';
import React from 'react';

type CategoryBadgeProps = {
  category: Category;
};

const CategoryBadge = ({ category }: CategoryBadgeProps) => {
  return (
    <span className="inline-block mb-2 bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
      {category.name}
    </span>
  );
};

export default CategoryBadge;
