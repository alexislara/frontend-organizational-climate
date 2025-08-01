import {useQuery} from "@tanstack/react-query";
import {GenericHookProps} from "@/types/interfaces";
import {fetchBranch} from "@/lib/utils";
import {keepPreviousData} from "@tanstack/query-core";

const useBranch = ({
    id,
    queryName,
    enable=false,
    filters={},
}:GenericHookProps) => {
    return useQuery({
        queryKey:[queryName, filters, id],
        enabled: enable,
        queryFn: async () => await fetchBranch.get({filters}),
        placeholderData: keepPreviousData,
    })
}

export default useBranch;