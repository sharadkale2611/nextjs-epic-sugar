// src/features/order/order.types.ts

export interface CreateOrderPayload {
    productId: number;
    buyerId: number;
    orderQuantity: number;
    totalAmount: number;
    status: string;

    driverName?: string;
    mobileNumber?: string;
    vehicleNumber?: string;
    vehicleType?: string;
}

export interface OrderResponse {
    buyerPurchaseId: number;
    productId: number;
    orderQuantity: number;
    totalAmount: number;
    status: string;
}

export interface InvoiceResponse {
    paymentId: number;
    amount: number;
    paymentMethod: string | null;
    paymentStatus: string | null;
    paymentReference: string | null;
    gatewayTransactionId: string | null;
    paymentDate: string | null;
    isVerified: boolean;

    buyerPurchaseId: number;
    productName: string;
    productGrade: string;
    quantity: number;
    totalAmount: number;
    orderStatus: string;
    purchaseOrderNumber: string;
    purchaseOrderDate: string;

    buyerName: string;
    buyerMobile: string;
    buyerGSTNumber: string;
    buyerPANNumber: string;
    buyerFullAddress: string;

    millName: string;
    millGSTNumber: string;
    millPANNumber: string | null;
    millFullAddress: string;

    driverName: string | null;
    vehicleNumber: string | null;
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
    error?: string;
    errors?: any;
}
