// src > features > mill > mill.types.ts

export interface CreateMillPayload {
    millName: string;
    millCode: string;
    address: string;
    cityId: number;
    stateId: number;
    contactPerson: string;
    contactNumber: string;
    email: string;
    gstNumber: string;
    pincode: string;
}


export interface Mill {
    millId: number;
    millName: string;
    millCode: string;
    address: string;
    cityId: number;
    cityName: number;
    stateName: number;
    country: string;
    isActive: boolean;
    contactPerson: string;
    contactNumber: string;
    email: string;
    gstNumber: string;
    pincode: string;
}

export interface PaginatedResponse<T> {
    totalCount: number;
    pageSize: number;
    currentPage: number;
    totalPages: number;
    data: T[];
}
    
export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
    error: any;
    errors: any;
}
