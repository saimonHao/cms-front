import { APIS } from "env/api-list";
import { parseParams } from "utils/parseParams";
import { del, get, post, put } from "./http/request";

export const fetchRoleData = async (params) => await get(APIS.fetchRoleData(parseParams(params)));
export const createRole = async (params) => await post(APIS.createRole, params);
export const updateRole = async (params) => await put(APIS.updateRole, params);
export const delRole = async (delId) => await del(APIS.delRole(delId));