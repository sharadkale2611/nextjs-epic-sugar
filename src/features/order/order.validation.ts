// src/features/order/order.validation.ts

import { z } from "zod";

export const orderSchema = z.object({
    productId: z.number().min(1, "Product is required"),
    buyerId: z.number().min(1, "Buyer is required"),
    orderQuantity: z.number().min(1, "Quantity must be at least 1"),
    totalAmount: z.number().min(1, "Total amount required"),
    status: z.string().min(1, "Order status is required"),

    driverName: z.string().optional(),
    mobileNumber: z.string().optional(),
    vehicleNumber: z.string().optional(),
    vehicleType: z.string().optional(),
});

export type OrderFormValues = z.infer<typeof orderSchema>;
