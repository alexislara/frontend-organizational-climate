"use client";

import { NextPage } from "next";
import ReportIndex from "@/components/layouts/reports-index";
import { useState } from "react";
import { useAtom, useAtomValue } from "jotai/index";
import {
  format_paginated,
  gte_page_count,
  ReportDataTableAtom,
  reportFilters,
} from "@/lib/utils";
import { ReportsListResponseSchema } from "@/types/schema";
import useReport from "@/hooks/use-report";

const Page: NextPage = () => {
  const [search, setSearch] = useState<string>("");
  const [pagination, setPagination] = useAtom(ReportDataTableAtom.pagination);
  const filters = useAtomValue(reportFilters.filters);

  const { isError, isLoading, data } = useReport({
    queryName: "report-list",
    enable: true,
    filters: {
      ...filters,
      search,
      page: format_paginated(pagination.pageIndex),
      page_size: String(pagination.pageSize),
    },
  });

  if (isLoading) return <>Loading...</>;
  if (isError) return <>Error</>;

  const parse_data = ReportsListResponseSchema.safeParse(data);

  if (!parse_data.success) return <>Error data parse</>;

  const page_count = gte_page_count(parse_data.data.count, pagination.pageSize);

  return (
    <ReportIndex
      data={parse_data.data.results ?? []}
      search={search}
      setSearch={setSearch}
      pageCount={page_count}
      pagination={pagination}
      setPagination={setPagination}
    />
  );
};

export default Page;
