

export interface DocumentType{
    documentId:number;
    documentTypeName:string;
    status:boolean;
    isDeleted:boolean;
    createdAt:string;
    updatedAt?:string|null;
}

export interface ApiResponse<T>{
    data:T;
    success:boolean;
    message?:string;
}