import { Post } from "./axios";
import { LoginParams } from "./interface/auth";

const api = {
  login: "/logins" // 解析權杖
};

// 登入
export const Login = (params: LoginParams) => Post(api.login, params);
