export const parseParams = (params) => {
    console.log(params);
    let tempParams: any = [];
    for (let i in params) {
        if (`${params[i] === ""}` || `${params[i]} === undifined`) {
            continue;
        }
        tempParams.push(`${i}=${params[i]}`);
    }
    tempParams.join('&');
    return tempParams;
}