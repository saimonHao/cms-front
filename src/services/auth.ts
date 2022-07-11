import { APIS } from "../env/api-list";
import { post } from "./http/request";

export const login = async (email, password) => await post(APIS.login, { email, password });