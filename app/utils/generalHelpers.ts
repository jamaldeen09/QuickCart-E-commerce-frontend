export const formatDate = (dateInput: Date | string | number): string => {
    const date = new Date(dateInput);

    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "long" }); // "July"
    const year = date.getFullYear();

    // get ordinal suffix for the day
    const getOrdinal = (n: number) => {
        const s = ["th", "st", "nd", "rd"];
        const v = n % 100;
        return s[(v - 20) % 10] || s[v] || s[0];
    };

    return `${day}${getOrdinal(day)} ${month} ${year}`;
}

