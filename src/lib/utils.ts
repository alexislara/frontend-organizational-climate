import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import ApiFetch from "@/lib/api-fetch";
import {BranchResponse} from "@/types/types-schemas";
import {HTTPRequestError} from "@/types/interfaces";
import AtomsDataTable from "@/lib/atoms/atoms-data-table";
import AtomFilters from "@/lib/atoms/atoms-filters";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate = (date: string) => {
  const set_format = new Date(date);

  const options:Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return new Intl.DateTimeFormat("es-ES", options).format(set_format);
}

export const format_paginated = (page: number) => {
  return page !== 0 ? String(page + 1): ""
}

export const gte_page_count = (page_count: number, page_size:number) => {
  return Math.ceil((page_count ?? 1) / page_size)
}

export const LOGOUT_URL = `${process.env.NEXT_PUBLIC_SERVER_ECO_URL ?? "http://localhost:8000"}/o/logout/?next=${process.env.NEXT_PUBLIC_URL ?? "http://localhost:3000"}/auth/sign-in`

const url_base = process.env.NEXT_PUBLIC_SERVER_ECO_URL ?? "http://localhost:8000";

export const fetchBranch = new ApiFetch<BranchResponse, HTTPRequestError<string[]>>({
  url:url_base,
  endpoint:"v1/branch",
});


export const branchDataTableAtom = new AtomsDataTable({
  pagination:{
    pageIndex:0,
    pageSize:20
  }
});

export const branchesFilters = new AtomFilters({})
export const usersFilters = new AtomFilters({})
export const actionPlansFilters = new AtomFilters({})
export const evidencesFilters = new AtomFilters({})