import { Category } from '@/types/category';
import React from 'react';

type CategoriesListProps = {
  categories: Category[];
};

const CategoriesList = ({ categories }: CategoriesListProps) => {
  return (
    <ul>
      {categories.map((category) => (
        <li
          key={category.id}
          className="px-4 py-2 text-sm text-gray-700 hover:bg-blue-100"
        >
          {category.name}
        </li>
      ))}
    </ul>
  );
};

export default CategoriesList;
