import { z } from "zod";

const PaginatedResponseSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    count: z.number(),
    next: z.string().nullable(),
    previous: z.string().nullable(),
    results: z.array(itemSchema),
  });

const BaseDataListSchema = z.object({
  id: z.string(),
  created: z.string(),
  modified: z.string(),
});

export const BranchListSchema = BaseDataListSchema.extend({
  name: z.string(),
  commercial_distributor: z.string(),
  users: z.array(z.string()),
  manual_flow: z.boolean(),
});

export const BranchSchema = z.object({
  name: z.string(),
  commercial_distributor_id: z.string(),
  // users: z.array(z.string()),
});

export const CampaignListSchema = BaseDataListSchema.extend({
  commercial_distributor: z.string(),
  branch: z.string(),
  period_start: z.string(),
  period_end: z.string(),
  user_amount: z.number(),
  enabled: z.boolean(),
  completed: z.boolean(),
});

export const CampaignSchema = z.object({
  user_amount: z.number(),
  commercial_distributor_id: z.string(),
  branch_id: z.string(),
});

export const CommercialDistributorSchema = z.object({
  id: z.string(),
  name: z.string(),
  region: z.string(),
  zone: z.string(),
  users: z.array(z.string()),
  created: z.string(),
  modified: z.string(),
});

export const PathnameFiltersSchema = z.union([
  z.literal(""),
  z.literal("branches"),
  z.literal("users"),
  z.literal("reports"),
  z.literal("action-plans"),
  z.literal("evidences"),
]);

export const ReportListSchema = BaseDataListSchema.extend({
  id: z.string(),
  campaign: z.string(),
  commercial_distributor: z.string(),
  branch: z.string(),
  period_start: z.string(),
  period_end: z.string(),
  surveys_answered: z.number(),
  user_amount: z.number(),
}).omit({ created: true, modified: true });

// type list response
export const BranchListResponseSchema =
  PaginatedResponseSchema(BranchListSchema);
export const CampaignListResponseSchema =
  PaginatedResponseSchema(CampaignListSchema);
export const CommercialDistributorListResponseSchema = PaginatedResponseSchema(
  CommercialDistributorSchema,
);
export const ReportsListResponseSchema =
  PaginatedResponseSchema(ReportListSchema);
