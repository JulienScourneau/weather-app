export const displayMonth = (date) => {
    let actualDate = new Date(date);
    return actualDate.getMonth + 1 <= 10
        ? `${actualDate.getDate()}/${actualDate.getMonth() + 1}`
        : `${actualDate.getDate()}/0${actualDate.getMonth() + 1}`;
};