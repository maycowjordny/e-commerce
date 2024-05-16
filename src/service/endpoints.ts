export const endpoints = {
    user: {
        create: "/users"
    },
    session: {
        create: "/session"
    },
    product: {
        create: "/products/add",
        list: "/products",
        getById: (id?: string) => `/products/${id}`,
        update: (id: string) => `/products/${id}`,
        delete: "/products/",
    },

}