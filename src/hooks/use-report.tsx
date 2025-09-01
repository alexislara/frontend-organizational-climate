import {useQuery} from "@tanstack/react-query";
import {GenericHookProps} from "@/types/interfaces";
import {fetchReport} from "@/lib/utils";
import {keepPreviousData} from "@tanstack/query-core";

const useReport = <T,>({
    id,
    queryName,
    enable=false,
    filters={},
}:GenericHookProps<T>) => {
    return useQuery({
        queryKey:[queryName, filters, id],
        enabled: enable,
        queryFn: async () => await fetchReport.get({filters}),
        placeholderData: keepPreviousData,
    })
}

export default useReport;
