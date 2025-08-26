"use client"
import {NextPage} from "next";
import FormBranches from "@/components/layouts/forms/branches";
import {BranchType} from "@/types/types";
import useCommercialDistributor from "@/hooks/use-commercial-distributor";
import {CommercialDistributorListResponseSchema} from "@/types/schema";
import {useMemo, useState} from "react";
import {fetchBranch} from "@/lib/utils";

const Page: NextPage = () => {
    const [searchCommercialDistributors, setSearchCommercialDistributors] = useState("")

    const {isError, isLoading, data} = useCommercialDistributor({
        filters:{search: searchCommercialDistributors},
        queryName:"commercial-distributor-list",
        enable:true
    })

    const data_parse = CommercialDistributorListResponseSchema.safeParse(data)

    const combobox_data_memo = useMemo(() => {
        return (data_parse.data?.results ?? []).map(({id, name}) => ({label:name, value:id}))
    }, [data_parse])

    const handleSubmit = async (values: BranchType) => {
        const res = await fetchBranch.post({body:values})
        console.log(res)
    }

    if (isLoading) return <>loading...</>
    if (isError) return <>error</>

    if (data_parse.error) return <>error parse</>

    return (
        <div className={"overflow-y-scroll"}>
            <FormBranches
                handleSubmit={handleSubmit}
                commercial_distributors={combobox_data_memo}
                search_commercial_distributors={searchCommercialDistributors}
                setSearchCommercialDistributors={setSearchCommercialDistributors}
            />
        </div>
    )
}

export default Page;