import { APIS } from "env/api-list";
import { parseParams } from "utils/parseParams";
import { get } from "./http/request";

export const fetchRoleData = async (params) => await get(APIS.fetchRoleData(parseParams(params)));