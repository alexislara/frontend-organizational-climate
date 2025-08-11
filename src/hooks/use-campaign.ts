import {useQuery} from "@tanstack/react-query";
import {GenericHookProps} from "@/types/interfaces";
import {fetchCampaign} from "@/lib/utils";
import {keepPreviousData} from "@tanstack/query-core";

const useCampaign = <T,>({
    id,
    queryName,
    enable=false,
    filters={},
}:GenericHookProps<T>) => {
    return useQuery({
        queryKey:[queryName, filters, id],
        enabled: enable,
        queryFn: async () => await fetchCampaign.get({filters}),
        placeholderData: keepPreviousData,
    })
}

export default useCampaign;