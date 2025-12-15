export function dayKey(d: string | Date): string {
  if (d instanceof Date) {
    const YY = d.getUTCFullYear();
    const MM = (d.getUTCMonth() + 1).toString().padStart(2, "0")
    const DD = (d.getUTCDate()).toString().padStart(2, "0")

    return [YY, MM, DD].join("-");
  }
   
  return d.split("T")[0];
}

export function dayKeyLocal(d: Date | string) : string {

  let date : Date = (d instanceof Date) ? d : new Date(d);

  const YY = date.getFullYear();
  const MM = (date.getMonth() + 1).toString().padStart(2, "0")
  const DD = (date.getDate()).toString().padStart(2, "0")

  return [YY, MM, DD].join("-");
}


export function dayKeyEST(iso: string) {
    return new Intl.DateTimeFormat("en-CA", {
        timeZone: "America/New_York",
        year: "numeric", 
        month: "2-digit",
        day: "2-digit",
    }).format(new Date(iso));
}
