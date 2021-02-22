export async function fetchUrl(url: string) {
    let res = await fetch(url);
    let json = await res.json();

    if (!res.ok) {
        throw Error(json.message);
    } else if (!json || json.length == 0) {
        return null;
    } else {
        return json;
    }
}
