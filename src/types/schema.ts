import { z } from "zod"

const PaginatedResponseSchema = <T extends z.ZodTypeAny>(itemSchema: T) => (
    z.object({
        count: z.number(),
        next: z.string().nullable(),
        previous: z.string().nullable(),
        results: z.array(itemSchema),
    })
);

const BaseDataListSchema = z.object({
    id: z.string(),
    created: z.string(),
    modified: z.string()
})

export const BranchListSchema = BaseDataListSchema.extend({
    name: z.string(),
    commercial_distributor: z.string(),
    users: z.array(z.string()),
    manual_flow: z.boolean(),
})
export const CampaignListSchema = BaseDataListSchema.extend({
    commercial_distributor: z.string(),
    branch: z.string(),
    period_start: z.string(),
    period_end: z.string(),
    user_amount: z.number(),
    enabled: z.boolean(),
    completed: z.boolean(),
})


export const PathnameFiltersSchema = z.union([
    z.literal(""),
    z.literal("branches"),
    z.literal("users"),
    z.literal("action-plans"),
    z.literal("evidences")
])

// type list response
export const BranchListResponseSchema = PaginatedResponseSchema(BranchListSchema)
export const CampaignListResponseSchema = PaginatedResponseSchema(CampaignListSchema)