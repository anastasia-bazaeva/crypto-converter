import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_KEY, API_URL } from '../../app-config';

export const currencyApi = createApi({
    reducerPath: 'api',
    tagTypes: ['Currency'],
    baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}`}),
    endpoints: (build) => ({
        getRate: build.query({
            query: (params) => `/simple/price/?ids=${params.from}&vs_currencies=${params.to}&x_cg_demo_api_key=${API_KEY}`,
        }),
    })
});

export const { useGetRateQuery } = currencyApi;