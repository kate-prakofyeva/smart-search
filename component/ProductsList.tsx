import { Product } from '@/types/product';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import React from 'react';

type ProductsListProps = {
  products: Product[];
};
const ProductsList = ({ products }: ProductsListProps) => {
  const { t } = useTranslation('common');

  return (
    <ul>
      {products.map((product) => (
        <li
          key={product.id}
          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-100"
        >
          <Image
            width={40}
            height={40}
            src={product.thumbnail?.src}
            alt={product.name}
            className="w-10 h-10 mr-2 rounded"
          />
          <div className="flex justify-between w-full">
            <div className="w-6/6">{product.name}</div>
            <div className="w-1/6 self-end flex flex-col">
              <div className="self-end">
                {t('currency')} {product.min_price}
              </div>
              <div className="line-through self-end">
                {t('currency')} {product.max_price}
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ProductsList;
