import useSWR from "swr";

async function fetcher(url: string) {
    const res = await window.fetch(url);
    return await res.json();
}

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
