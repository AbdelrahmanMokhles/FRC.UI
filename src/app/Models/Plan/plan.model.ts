export interface AddPlanDto {
    planName?: string;
    concurrentCalls?: number;
    period?: number;
    internalNote?: string;
    periods?: PlanPeriod[];
    isUpdate?: boolean;
}

export interface PlanDetailsDto {
    planName?: string;
    concurrentCalls?: number;
    period?: number;
    internalNote?: string;
    periods?: PlanPeriod[];
    status?: string;
    createdDate?: any;
}

export interface PlanPeriod {
    id?: number;
    tierNumber: number;
    price: number;
    distiDiscount: number;
}

export interface PlansDataTableDto {
    id: number;
    selected?: boolean;
    planName: string;
    concurentCalls: number;
    period: number;
    endUserPeriodPrice: number;
    activeSubscribers: number;
    status: string;
}
