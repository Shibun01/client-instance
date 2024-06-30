import { apiSlice } from "../../api/rootApi";
import TokenFromPersist from "../../../../utils/persistToken";


export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProductByShopId: builder.query({
            query: (id) => {
                const token = TokenFromPersist();
                return {
                    url: `product/getByID?shop_id=${id}`,
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                };
            },
        }),
    }),
});

export const { useGetProductByShopIdQuery } = productApiSlice;
