import env from './config';
const concatWithHost = (host: any, action: any) => host.concat(action);

export const APIS = {
    //auth
    login: concatWithHost(env.apiHost, '/cms/api/v1.0/login'),
    //user
    // fetchUserData: (params) => concatWithHost(env.apiHost, `/cms/api/v1.0/user/list?${params}`)
    fetchUserData:concatWithHost(env.apiHost, `/cms/api/v1.0/user/list`)
}