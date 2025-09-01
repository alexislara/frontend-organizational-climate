"use client"
import {NextPage} from "next";
import BranchIndex from "@/components/layouts/users-index";
import {useState} from "react";
import {useAtom, useAtomValue} from "jotai/index";
import {
    format_paginated,
    gte_page_count,
    userFilters,
    usersDataTableAtom
} from "@/lib/utils";
import useCampaign from "@/hooks/use-campaign";
import {CampaignListResponseSchema} from "@/types/schema";

const Page:NextPage = () => {
    const [search, setSearch] = useState<string>("")

    const [pagination, setPagination] = useAtom(usersDataTableAtom.pagination)
    const filters = useAtomValue(userFilters.filters)

    const {isError, isLoading, data} = useCampaign({
        queryName:"campaign-list",
        enable: true,
        filters:{
            ...filters,
            search,
            page:format_paginated(pagination.pageIndex),
            page_size:String(pagination.pageSize)
        }
    })

    if (isLoading) return <>Loading...</>
    if (isError) return <>Error</>

    const parse_data = CampaignListResponseSchema.safeParse(data)

    if (!parse_data.success) return <>Error data parse</>

    const page_count = gte_page_count(parse_data.data.count, pagination.pageSize)

    return (
        <BranchIndex
            pageCount={page_count}
            data={parse_data.data.results ?? []}
            setPagination={setPagination}
            pagination={pagination}
            search={search}
            setSearch={setSearch}
        />
    )
}

export default Page