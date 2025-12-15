export function dayKey(d: string | Date): string {
  if (d instanceof Date) {
    const YY = d.getUTCFullYear();
    const MM = (d.getUTCMonth() + 1).toString().padStart(2, "0")
    const DD = (d.getUTCDate()).toString().padStart(2, "0")

    return [YY, MM, DD].join("-");
  }
   
  return d.split("T")[0];
}

export function dayKeyEST(iso: string) {
    return new Intl.DateTimeFormat("en-CA", {
        timeZone: "America/New_York",
        year: "numeric", 
        month: "2-digit",
        day: "2-digit",
    }).format(new Date(iso));
}
