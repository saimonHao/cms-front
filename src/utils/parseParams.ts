export const parseParams = (params) => {
    let tempParams: any = [];
    for (let i in params) {
        if (`${params[i]}` === "" || `${params[i]}` === 'undefined') {
            continue;
        }
        tempParams.push(`${i}=${params[i]}`);
    }
    tempParams = tempParams.join('&');
    return tempParams;
}