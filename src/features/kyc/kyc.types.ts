// features/kyc/kyc.types.ts

export interface KYCDocumentDto {
  kycId: number;
  userId: number;
  userName: string;
  documentId: number;
  documentNumber: string;
  documentPath: string | null;
  status: string;
  verifiedBy: string | null;
  verifiedAt: string | null;
  remarks: string | null;
  documentTypeName: string | null;
}

export interface KycVerificationResponse {
  userId: number;
  userName: string;
  documents: KYCDocumentDto[];
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
