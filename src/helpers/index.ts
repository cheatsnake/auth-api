export const addSlots = (size: number) => {
    let str = "";
    for (let i = 1; i <= size; i++) {
        str += `$${i}, `;
    }
    return `(${str.trim().slice(0, -1)})`;
};
