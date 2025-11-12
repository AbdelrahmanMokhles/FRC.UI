export interface PlanDto {
    planName: string;
    concurrentCalls: number;
    period: number;
    internalNote: string;
    periods: PlanPeriod[];
}

export interface PlanPeriod {
    period: number;
    price: number;
    distiDiscount: number;
}

export interface Plan {
    id: number;
    selected?: boolean;
    planName: string;
    concurentCall: number;
    period: number;
    endUserPeriodPrice: number;
    activeSubscribers: number;
    status: boolean;
}