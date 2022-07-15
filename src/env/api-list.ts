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
    //role
    fetchRoleData: (params) => concatWithHost(env.apiHost, `/cms/api/v1.0/role/list?${params}`),
    createRole: concatWithHost(env.apiHost, `/cms/api/v1.0/role/create`),
    updateRole: concatWithHost(env.apiHost, `/cms/api/v1.0/role/update`),
    delRole: (delId) => concatWithHost(env.apiHost, `/cms/api/v1.0/role/${delId}`)
}