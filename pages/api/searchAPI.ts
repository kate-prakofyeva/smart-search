import { Category } from '../../types/category';
import { Product } from '../../types/product';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface ItemsResponse<T> {
  data: {
    items: T[];
  };
}

const filterDuplicates = <T extends { id: string }>(items: T[]): T[] => {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (seen.has(item.id)) {
      return false;
    }
    seen.add(item.id);
    return true;
  });
};

export const searchApi = createApi({
  reducerPath: 'searchApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),
  endpoints: (builder) => ({
    searchProducts: builder.query<
      ItemsResponse<Product>,
      { query: string; lang: string }
    >({
      query: ({ query, lang }) => `products?lang=${lang}&search=${query}`,
      transformResponse: (response: ItemsResponse<Product>) => ({
        ...response,
        data: {
          items: filterDuplicates(response.data.items),
        },
      }),
    }),
    searchCategories: builder.query<
      ItemsResponse<Category>,
      { query: string; lang: string }
    >({
      query: ({ query, lang }) => `categories?lang=${lang}&search=${query}`,
      transformResponse: (response: ItemsResponse<Category>) => ({
        ...response,
        data: {
          items: filterDuplicates(response.data.items),
        },
      }),
    }),
  }),
});

export const { useLazySearchProductsQuery, useLazySearchCategoriesQuery } =
  searchApi;
