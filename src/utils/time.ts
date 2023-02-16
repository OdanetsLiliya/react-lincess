export function getTimeCode(time: number) {
    const resultNew = new Date(Math.round(time) * 1000).toISOString().substr(11, 8);
    const min = resultNew.substr(3, 2);
    const sec = resultNew.substr(6, 2);
    const hours = resultNew.substr(0, 2);
    return `${hours !== '00' ? hours + ':' : ''}${min}:${sec}`;
}