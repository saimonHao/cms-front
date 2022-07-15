const stringInArray: any = (AArray, SString) => {
    if (AArray instanceof Array && AArray.length > 0) {
        for (let i = 0; i <= AArray.length; i++) {
            if (AArray[i] === SString) {
                return i;
            }
        }
    } else {
        if (AArray === SString) {
            return true;
        }
    }
    return false;
};

export default stringInArray;
