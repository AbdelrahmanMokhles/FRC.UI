export interface LicenceDataTable {
    id: number;
    model?: string;
    mac?: string;
    plan?: string;
    concurrentCalls?: number;
    expireDate?: any;
    userEmail?: string;
    isSubscriped?: boolean;
}

export interface LicenceDetails {
    id: number;
    model?: string;
    mac?: string;
    plan?: string;
    concurrentCalls?: number;
    expireDate?: any;
    userEmail?: string;
    name?: string;
    paidAmount?: number;
    isSubscriped?: boolean;
    createdAt?: any;
    updatedAt?: any;
}
export interface UpgradeLicenceDto {
    mac?: string;
    periodId?: number;
}