import {z} from "zod";
import {
    BranchListResponseSchema,
    BranchListSchema,
    CampaignListResponseSchema,
    CampaignListSchema,
    PathnameFiltersSchema
} from "@/types/schema";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";

// types schemas
export type BranchList = z.infer<typeof BranchListSchema>
export type BranchResponse = z.infer<typeof BranchListResponseSchema>
export type PathnameFilters = z.infer<typeof PathnameFiltersSchema>
export type CampaignList = z.infer<typeof CampaignListSchema>
export type CampaignListResponse = z.infer<typeof CampaignListResponseSchema>

// types filters
export interface BaseFilters {
    search?: string
    page: number;
    page_size: number;
}

export interface BranchFilters extends BaseFilters {
    period_start?:Date;
    period_end?:Date;
    status?:string;
}

export interface ColumnsProps {
    push:AppRouterInstance["push"]
}
