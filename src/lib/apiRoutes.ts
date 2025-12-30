export const API_ROUTES = {
  STATES: "/states",

  // City CRUD
  CITIES: "/cities",

  // Used only for cascading dropdown in Location module
  CITIES_BY_STATE: "/cities/state",

  AUTH: {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
  },

  MILLS: "/mills",
  MILL_DETAILS: (id: number) => `/mills/mill-details/${id}`,

  COMPANIES: "/companies",
  COMPANY_DETAILS: (id: number) => `/companies/company-details/${id}`,

  PRODUCTS: "/products",
  PRODUCT_DETAILS: (id: number) => `/products/${id}/details`,

  PRODUCT_IMAGES: "/product-images",
};
