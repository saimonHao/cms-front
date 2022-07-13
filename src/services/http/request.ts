export const request = async (url, options) => {
    let data: any;
    try {
        const response = await fetch(url, options);
        if (response) {
            data = await response.json();
        }
        return data;
    } catch (error: any) {
        console.log("call fetch error: ", error.message);
        return error;
    }
}
export const post = async (url, params: any, options: any = {}) => {
    let method = "POST";
    let body = JSON.stringify(params);
    let headers = {
        "Content-Type": "application/json",
        // dmp_token: `${token}`,
        // user_id: `${userId}`,
        ...options.headers,
    }
    const res = await request(url, { headers, method, body, ...options });
    return res;
}
export const put = async (url, params: any, options: any = {}) => {
    let method = "PUT";
    let body = JSON.stringify(params);
    let headers = {
        "Content-Type": "application/json",
        // dmp_token: `${token}`,
        // user_id: `${userId}`,
        ...options.headers,
    }
    const res = await request(url, { headers, method, body, ...options });
    return res;
}
export const get = async (url, options: any = {}) => {
    console.log("url===",url);
    let method = "GET";
    let headers = {
        "Content-Type": "application/json",
        // dmp_token: `${token}`,
        // user_id: `${userId}`,
        ...options.headers,
    }
    const res = await request(url, { headers, method, ...options });
    return res;
}
export const del = async (url, options: any = {}) => {
    const method = "DELETE";
    const headers = {
    //   dmp_token: `${token}`,
    //   user_id: `${userId}`,
      ...options.headers,
    };
    const res = await request(url, { method, ...options, headers });
    return res;
  };