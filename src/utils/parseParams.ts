export const parseParams = (params) => {
    console.log(params);
    const tempParams = [...params];
    console.log(tempParams);
    tempParams.join(`&`);
    return tempParams;
}