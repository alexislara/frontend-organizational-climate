import {z} from "zod";
import {
    BranchListResponseSchema,
    BranchListSchema,
    BranchSchema,
    CampaignListResponseSchema,
    CampaignListSchema,
    CampaignSchema,
    CommercialDistributorSchema,
    PathnameFiltersSchema
} from "@/types/schema";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";

// types schemas
export type BranchList = z.infer<typeof BranchListSchema>
export type BranchResponse = z.infer<typeof BranchListResponseSchema>
export type BranchType = z.infer<typeof BranchSchema>
export type PathnameFilters = z.infer<typeof PathnameFiltersSchema>
export type CampaignList = z.infer<typeof CampaignListSchema>
export type CampaignType = z.infer<typeof CampaignSchema>
export type CampaignListResponse = z.infer<typeof CampaignListResponseSchema>
export type CommercialDistributorListResponse = z.infer<typeof CommercialDistributorSchema>

// types filters
export interface BaseFilters {
    search?: string
    page: number;
    page_size: number;
}

export interface BranchFilters extends BaseFilters {
    period_start__gte?:string;
    period_start__lte?:string;
    period_end__gte?:string;
    period_end__lte?:string;
    completed?:boolean;
    enabled?:boolean;
}

export interface ColumnsProps {
    push:AppRouterInstance["push"]
}
