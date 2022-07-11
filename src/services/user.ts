import { APIS } from "env/api-list";
import { get } from '../services/http/request';

export const fetchUserData = async () => await get(APIS.fetchUserData,{});