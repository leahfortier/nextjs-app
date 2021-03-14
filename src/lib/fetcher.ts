export async function fetchUrl(url: string) {
    let response = await fetch(url);
    let json = await response.json();

    if (!response.ok) {
        throw Error(json.message);
    } else if (!json || json.length == 0) {
        return null;
    } else {
        return json;
    }
}
