import {
  useLazySearchCategoriesQuery,
  useLazySearchProductsQuery,
} from '@/pages/api/searchAPI';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import LoadingSpinner from './Spinner';
import CategoriesList from './CategoriesList';
import ProductsList from './ProductsList';

export default function SearchForm() {
  const router = useRouter();
  const [query, setQuery] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const { t } = useTranslation('common');
  const locale = router.locale || 'en';

  const [
    triggerProducts,
    { data: productsData, isLoading: isLoadingProducts },
  ] = useLazySearchProductsQuery();
  const [
    triggerCategories,
    { data: categoriesData, isLoading: isLoadingCategories },
  ] = useLazySearchCategoriesQuery();

  useEffect(() => {
    if (query.length >= 3) {
      const delayDebounceFn = setTimeout(() => {
        triggerProducts({ query, lang: locale });
        triggerCategories({ query, lang: locale });
      }, 1500);

      return () => clearTimeout(delayDebounceFn);
    }
  }, [query, triggerProducts, triggerCategories, locale]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.length >= 3) {
      router.push(`/search/${query}`);
    }
  };

  const isCategoriesFounded =
    categoriesData &&
    'data' in categoriesData &&
    categoriesData.data.items.length > 0;

  const isProductsFounded =
    productsData &&
    'data' in productsData &&
    productsData.data.items.length > 0;

  return (
    <form onSubmit={handleSearch} className="w-full flex flex-col">
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute left-4 inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          className="block w-full p-4 ps-10 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={t('search-page-search-placeholder')}
        />
      </div>

      {isLoadingCategories && isLoadingProducts && <LoadingSpinner />}
      {isFocused &&
        query.length >= 3 &&
        (isCategoriesFounded || isProductsFounded) && (
          <div className="z-10 bg-white border border-gray-300 rounded-md shadow-lg">
            <div>
              <h3 className="px-4 py-2 text-sm text-center text-gray-700 bg-gray-100">
                {t('categories')}
              </h3>
              {isCategoriesFounded ? (
                <CategoriesList categories={categoriesData.data.items} />
              ) : (
                <p className="ml-4">No categories found</p>
              )}
            </div>
            <div>
              <h3 className="px-4 py-2 text-center text-sm bg-gray-100 text-gray-700">
                {t('products')}
              </h3>
              {isProductsFounded ? (
                <ProductsList products={productsData.data.items} />
              ) : (
                <p className="ml-4">No products found</p>
              )}
            </div>
          </div>
        )}
    </form>
  );
}
