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
    id?: number;
    model?: string;
    mac?: string;
    plan?: string;
    planId?: number;
    concurrentCalls?: number;
    expireDate?: any;
    subscriptionDate?: any;
    userEmail?: string;
    name?: string;
    tierNumber?: number;
    paidAmount?: number;
    isSubscriped?: boolean;
    createdAt?: any;
    updatedAt?: any;
}
export interface CloudLicenceDto {
    mac?: string;
    periodId?: number;
    periodMultiplier?: number;
    paidAmount?: number;
}

export interface MigrateLicenceDto {
    mac?: string;
    isRecycled: boolean;
    mac2?: string;
}