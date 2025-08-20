// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// interface Product {
//   id: string;
//   name: string;
//   description: string;
//   price: number;
//   category: string;
// }

// export const productApi = createApi({
//   reducerPath: 'productApi',
//   baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api/' }),
//   tagTypes: ['Product'],
//   endpoints: (builder) => ({
//     // Create product
//     createProduct: builder.mutation<Product, Partial<Product>>({
//       query: (body) => ({
//         url: 'products',
//         method: 'POST',
//         body,
//       }),
//       invalidatesTags: ['Product'],
//     }),

//     // Search products
//     searchProducts: builder.query<Product[], { 
//       query?: string; 
//       category?: string; 
//       minPrice?: number; 
//       maxPrice?: number 
//     }>({
//       query: ({ query, category, minPrice, maxPrice }) => ({
//         url: 'products/search',
//         params: { 
//           query, 
//           category, 
//           minPrice, 
//           maxPrice 
//         },
//       }),
//       providesTags: (result) =>
//         result
//           ? [
//               ...result.map(({ id }) => ({ type: 'Product' as const, id })),
//               { type: 'Product', id: 'LIST' },
//             ]
//           : [{ type: 'Product', id: 'LIST' }],
//     }),
//   }),
// });

// export const { 
//   useCreateProductMutation, 
//   useSearchProductsQuery,
//   useLazySearchProductsQuery 
// } = productApi;