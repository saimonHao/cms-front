import env from './config';
const concatWithHost = (host: any, action: any) => host.concat(action);

export const APIS = {
    //auth
    login: concatWithHost(env.apiHost, '/cms/api/v1.0/login'),
    //user
    fetchUserData: (params) => concatWithHost(env.apiHost, `/cms/api/v1.0/user/list?${params}`),
    saveUser: concatWithHost(env.apiHost, `/cms/api/v1.0/user/create`),
    delUser: (delId) => concatWithHost(env.apiHost, `/cms/api/v1.0/user/${delId}`),
    updateUser: concatWithHost(env.apiHost, `/cms/api/v1.0/user/update`),
}