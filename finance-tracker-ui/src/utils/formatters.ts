export function formatAuditorAmount(value: number): string {
    return new Intl.NumberFormat("en-AU", {
        style: "currency",
        currency: "AUD",
    }).format(value);
}

export function formatAuditorAmountWithSigns(value: number): string {
    return new Intl.NumberFormat("en-AU", {
        style: "currency",
        currency: "AUD",
        signDisplay: "always",
    }).format(value);
}

export function formatTransactionDate(value: string): string {
    return new Date(value).toLocaleDateString("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    });
}
