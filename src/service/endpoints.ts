export const endpoints = {
    user: {
        create: "/users"
    },
    session: {
        create: "/session"
    },
    product: {
        create: "/products/add",
        list: "/products/",
        listById: "/products/",
        update: (id: string) => `/products/${id}`,
        delete: "/products/",
    },

}