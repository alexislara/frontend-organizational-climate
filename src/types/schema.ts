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

// type list response
export const BranchListResponseSchema = PaginatedResponseSchema(BranchListSchema)

