import {z} from "zod";
import {BranchListResponseSchema, BranchListSchema} from "@/types/schema";

export type BranchList = z.infer<typeof BranchListSchema>
export type BranchResponse = z.infer<typeof BranchListResponseSchema>