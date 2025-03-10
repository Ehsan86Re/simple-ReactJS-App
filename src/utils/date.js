export const addDatesToList = (list) => {
    let newList = [];
    let dateList = [];
    list.sort((a, b) => a.created_at < b.created_at ? 1 : -1).forEach(element => {
        let date = getDate(element.created_at);
        if (dateList.indexOf(date) == -1) {
            dateList.push(date)
            newList.push({ date: true, value: date, id: date })
        }
        newList.push(element)
    });
    console.log("🚀 ~ addDatesToList ~ newList:", newList, dateList)
    return newList
};

export const getDate = (time) => {
    const date = new Date(time);
    let y = date.getFullYear();
    let m = date.getMonth();
    let d = date.getDate();

    m = m > 9 ? m : '0' + m
    d = d > 9 ? d : '0' + d

    return `${m}/${d}/${y}`
};

export const getTime = (time) => {
    const date = new Date(time);
    let m = date.getMinutes();
    let h = date.getHours();

    m = m > 9 ? m : '0' + m
    h = h > 9 ? h : '0' + h

    return `${h}:${m}`
};