import {useQuery} from "@tanstack/react-query";
import {GenericHookProps} from "@/types/interfaces";
import {fetchCommercialDistributor} from "@/lib/utils";
import {keepPreviousData} from "@tanstack/query-core";

const useCommercialDistributor = <T,>({
   id,
   queryName,
   enable=false,
   filters={},
}:GenericHookProps<T>) => {
    return useQuery({
        queryKey:[queryName, filters, id],
        enabled: enable,
        queryFn: async () => await fetchCommercialDistributor.get({filters}),
        placeholderData: keepPreviousData,
    })
}

export default useCommercialDistributor;