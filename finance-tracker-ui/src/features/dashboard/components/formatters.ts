
export function formatMonth(monthYear: string): string {
    const date = new Date(`${monthYear}-01`);

    return date.toLocaleString("en-GB", {
        month: "long"
    });
}