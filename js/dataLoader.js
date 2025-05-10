export async function loadData() {
    const response = await fetch('../data/sample-signal.json');
    return response.json();
}