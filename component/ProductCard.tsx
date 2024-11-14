import { Product } from '@/types/product';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { t } = useTranslation('common');

  return (
    <div className="h-full flex flex-col p-4 justify-between max-w-sm rounded overflow-hidden border-gray-200 rounded-lg shadow">
      <Image
        width={200}
        height={200}
        src={product.thumbnail?.src}
        alt={product.name}
        className="w-52 w-52 mr-auto ml-auto rounded h-40 mb-2"
      />

      <div className="h-52 overflow-hidden mb-4">
        <p className="font-bold text-sm text-blue-700 mb-2 line-clamp-1">
          {product.name}
        </p>
        <p className="text-gray-500 text-sm overflow-hidden line-clamp-3">
          {product.description}
        </p>
      </div>
      <div className="flex justify-center bg-blue-200">
        <span className="inline-block bg-blue-200 px-3 py-2 text-sm font-semibold text-gray-700 mr-2">
          {t('currency')} {product.min_price}
        </span>
      </div>
    </div>
  );
};

export default ProductCard;
