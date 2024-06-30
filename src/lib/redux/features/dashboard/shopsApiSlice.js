import { apiSlice } from "../../api/rootApi";
import TokenFromPersist from "../../../../utils/persistToken";


export const shopApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllShops: builder.query({
            query: () => {
                const token = TokenFromPersist();
                return {
                    url: 'shop/getAll',
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                };
            },
        }),
        getShopById: builder.query({
            query: (id) => {
                const token = TokenFromPersist();
                return {
                    url: `shop/getByID?_id=${id}`,
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                };
            },
        }),
    }),
});

export const { useGetAllShopsQuery, useGetShopByIdQuery } = shopApiSlice;
