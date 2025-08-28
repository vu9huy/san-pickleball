import { QueryClient } from "@tanstack/react-query";

export const queryConfig = {
    queries: {
        // throwOnError: true,
        refetchOnWindowFocus: false,
        retry: false,
        staleTime: Infinity
    }
};

export const queryClient = new QueryClient({
    defaultOptions: queryConfig
});

