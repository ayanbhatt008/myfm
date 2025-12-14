export function dayKey(iso: string): string {
  return iso.split("T")[0];
}

export function dayKeyEST(iso: string) {
    return new Intl.DateTimeFormat("en-CA", {
        timeZone: "America/New_York",
        year: "numeric", 
        month: "2-digit",
        day: "2-digit",
    }).format(new Date(iso));
}
