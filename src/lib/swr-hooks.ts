import useSWR from "swr";

const fetcher = async (url: string) => {
    const response = await fetch(url);
    return response.json();
};

export function useEntries() {
    const { data, error } = useSWR(`/api/get-entries`, fetcher);

    return {
        entries: data,
        isLoading: !error && !data,
        isError: error,
    };
}

export function useEntry(id: string) {
    return useSWR(`/api/get-entry?id=${id}`, fetcher);
}
