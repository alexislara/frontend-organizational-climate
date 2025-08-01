"use client"
import {NextPage} from "next";
import useBranch from "@/hooks/use-branch";
import {BranchListResponseSchema} from "@/types/schema";
import BranchIndex from "@/components/layouts/branch-index";
import {useState} from "react";
import {branchDataTableAtom, gte_page_count} from "@/lib/utils";
import {useAtom} from "jotai";

const Page:NextPage = () => {
    const [search, setSearch] = useState("")
    const [pagination, setPagination] = useAtom(branchDataTableAtom.pagination)

    const {isError, isLoading, data} = useBranch({
        queryName:"branch-list",
        enable: true,
        filters:{
            search
        }
    })

    if (isLoading) return <>Loading...</>
    if (isError) return <>Error</>

    const parse_data = BranchListResponseSchema.safeParse(data)

    if (!parse_data.success) return <>Error data parse</>

    const page_count = gte_page_count(parse_data.data.count)

    return (
        <BranchIndex
            data={parse_data.data.results ?? []}
            search={search}
            setSearch={setSearch}
            pageCount={page_count}
            pagination={pagination}
            setPagination={setPagination}
        />
    )
}

export default Page;