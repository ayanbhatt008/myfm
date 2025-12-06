export default function formatNames(names: string[], limit: number = 3) : string {
    if (names.length == 1)
        return names[0]
    if (names.length == 2)
        return `${names[0]} & ${names[1]}`

    const visible_shallow : string[] = names.slice(0, limit);
    const visible = [...visible_shallow];

     if (names.length > limit) {
         visible.push(`${names.length - limit} more`)
     }



     const last = visible.pop();

     return `${visible.join(", ")} & ${last}`



}



