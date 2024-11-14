import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { Product } from '@/types/product';
import { Category } from '@/types/category';
import { GetServerSideProps } from 'next';
import ProductCard from '@/component/ProductCard';
import CategoryBadge from '@/component/CategoryBadge';
import Header from '@/component/Header';

interface SearchResultsProps {
  query: string;
  products: Product[];
  categories: Category[];
}

const SearchResults: React.FC<SearchResultsProps> = ({
  products,
  categories,
}) => {
  const { t } = useTranslation();

  if (!products.length) {
    return (
      <div className="w-full p-8">
        <h1 className="text-3xl font-bold leading-tight text-center">
          {t('search-page-search-results')}
        </h1>
        <p className="text-xl font-bold leading-tight text-center">
          {t('search-page-no-results')}
        </p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="w-full px-8">
        <h1 className="text-3xl font-bold leading-tight text-center mb-6">
          {t('search-page-search-results')}
        </h1>
        {categories.length > 0 && (
          <h2 className="text-2xl font-bold leading-tight my-4">
            {t('categories-title')}
          </h2>
        )}
        {categories.map((category) => (
          <CategoryBadge key={category.id} category={category} />
        ))}
        {products.length > 0 && (
          <h2 className="text-2xl font-bold leading-tight my-4">
            {t('products-title')}
          </h2>
        )}
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <li key={product.id} className="h-full">
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context.params as { query: string };
  const locale = context.locale || 'en';

  const [productsResponse, categoriesResponse] = await Promise.all([
    fetch(`http://185.65.246.4/api/v1/products?lang=${locale}&search=${query}`),
    fetch(
      `http://185.65.246.4/api/v1/categories?lang=${locale}&search=${query}`
    ),
  ]);

  const productsData = await productsResponse.json();
  const categoriesData = await categoriesResponse.json();

  const products =
    productsData.data?.items?.map((product: Product) => ({
      ...product,
    })) || [];

  const categories =
    categoriesData.data?.items?.map((category: Category) => ({
      ...category,
    })) || [];

  return {
    props: {
      query,
      products,
      categories,
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

export default SearchResults;
