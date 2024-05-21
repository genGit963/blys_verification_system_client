import { RegisterInterface } from "../model/auth";
import { SERVER } from "./config_api";

export const AUTH_API = {
  register: async (register: RegisterInterface) => {
    return await SERVER.request({
      method: "POST",
      url: "/api/register",
      data: register,
      headers: {
        Accept: "application/json",
      },
    });
  },
  verify_code: async (code: number) => {
    return await SERVER.request({
      method: "POST",
      url: "/api/verify",
      data: { code: code },
      headers: {
        Accept: "application/json",
      },
    });
  },
};
