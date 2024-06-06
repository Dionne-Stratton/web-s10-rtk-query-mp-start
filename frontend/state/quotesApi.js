// create your RTK Query endpoints here
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// 1. GET `/quotes` **returns all quotes from the server**
//     - Expects no parameters nor a request body

// 2. POST `/quotes` **posts a new quote to the server**
//     - Expects a `{ "quoteAuthor": "example author", "quoteText": "example text" }` as the request body
//     - Both properties must be longer than two characters or a 422 error response is returned

// 3. DELETE `/quotes/:id` **removes a quote from the server**
//     - Expects an actual quote ID at the end of the URL (instead of the ":id")

// 4. PUT `/quotes/:id` **updates the apocryphal key of a given quote**
//     - Expects an actual quote ID at the end of the URL
//     - Expects a `{ "apocryphal": true (or false) }` as the request body

export const quotesApi = createApi({
  reducerPath: "quotesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:9009/api/" }),
  tagTypes: ["Quotes"],
  endpoints: (builder) => ({
    getQuotes: builder.query({
      query: () => "quotes",
      providesTags: ["Quotes"],
    }),
    addQuote: builder.mutation({
      query: (quote) => ({
        url: "quotes",
        method: "POST",
        body: quote,
      }),
      invalidatesTags: ["Quotes"],
    }),
    deleteQuote: builder.mutation({
      query: (id) => ({
        url: `quotes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Quotes"],
    }),
    updateApocryphal: builder.mutation({
      query: ({ id, apocryphal }) => ({
        url: `quotes/${id}`,
        method: "PUT",
        body: { apocryphal },
      }),
      invalidatesTags: ["Quotes"],
    }),
  }),
});

export const {
  useGetQuotesQuery,
  useAddQuoteMutation,
  useDeleteQuoteMutation,
  useUpdateApocryphalMutation,
} = quotesApi;
