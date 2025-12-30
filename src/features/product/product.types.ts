// =======================
// PRODUCT IMAGE TYPES
// =======================

export interface ProductImage {
    productImageId: number;
    productImagePath: string;
}

// Used when fetching images by productId
export interface ProductImageResponse {
    success: boolean;
    message: string;
    data: ProductImage[];
}

// Used when uploading images
export interface UploadProductImageResponse {
    success: boolean;
    message: string;
}

// =======================
// PRODUCT
// =======================

export interface Product {
    productId: number;
    productName: string;
    productGrade?: string;
    millId: number;
    stockQuantity: number;
    status: boolean;
    createdAt: string;

    sellingPrice?: number | null;

    // ✅ Product Images
    images?: ProductImage[];
}

// =======================
// CREATE PRODUCT PAYLOAD
// =======================

export interface CreateProductPayload {
    productName: string;
    productGrade?: string;
    millId: number;
    stockQuantity: number;
    status: boolean;
}

// =======================
// UPDATE PRODUCT PAYLOAD
// =======================

export interface UpdateProductPayload {
    productId: number;
    productName: string;
    productGrade?: string;
    millId: number;
    stockQuantity: number;
    status: boolean;
}

// =======================
// PAGINATED RESPONSE
// =======================

export interface PaginatedProductResponse {
    totalCount: number;
    pageSize: number;
    currentPage: number;
    totalPages: number;
    data: Product[];
}

// =======================
// COMMON API RESPONSE
// =======================

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
    error?: string | null;
    errors?: any;
}
