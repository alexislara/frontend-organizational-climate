import { z } from "zod"


const PaginatedResponseSchema = <T extends z.ZodTypeAny>(itemSchema: T) => (
    z.object({
        count: z.number(),
        next: z.string().nullable(),
        previous: z.string().nullable(),
        results: z.array(itemSchema),
    })
);

export const BranchListSchema = z.object({
    id: z.string(),
    name: z.string(),
    commercial_distributor: z.string(),
    users: z.array(z.string()),
    manual_flow: z.boolean(),
    created: z.string(),
    modified: z.string()
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

