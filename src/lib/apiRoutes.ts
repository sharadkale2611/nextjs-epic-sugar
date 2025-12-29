export const API_ROUTES = {
    STATES: "/states",
    CITIES: "/cities/state",
    AUTH: {
        LOGIN: "/auth/login",
        LOGOUT: "/auth/logout",
    },

    // Add Authebntication routes here in the future
    MILLS: "/mills",
    MILL_DETAILS: (id: number) => `/mills/mill-details/${id}`,

    COMPANIES: "/companies",
    COMPANY_DETAILS: (id: number) => `/companies/company-details/${id}`,


};
