import { useMutation, useQueries, useQuery } from "@tanstack/react-query";

const useQueryWrapper = (queryKey, queryFn, options) => {
    const result = useQuery({ queryKey: queryKey, queryFn: queryFn, ...options });
    return result;
};

const useQueriesWrapper = (queryKeyName, queryKeyIdList, queryFn, options) => {
    const results = useQueries({
        queries: queryKeyIdList.map(queryKey => {
            return { queryKey: [queryKeyName, queryKey], queryFn: queryFn, options };
        })
    });
    return results;
};

const useMutationWrapper = (mutationFn) => {
    const result = useMutation({ mutationFn: mutationFn });
    return result;
};

export {
    useQueryWrapper,
    useQueriesWrapper,
    useMutationWrapper
};