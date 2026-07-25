import { api } from "./client";

export interface RegisterRequest {
  full_name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

export interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  is_active: boolean;
}

export interface UpdateProfileRequest {
  full_name?: string;
  email?: string;
  password?: string;
}

export const AuthAPI = {
  register(data: RegisterRequest) {
    return api.post("/auth/register", data);
  },

  login(data: LoginRequest) {
    return api.post<LoginResponse>("/auth/login", data);
  },

  me() {
    return api.get<UserProfile>("/auth/me");
  },

  updateProfile(data: UpdateProfileRequest) {
    return api.put<UserProfile>("/auth/me", data);
  },

  deleteProfile() {
    return api.delete("/auth/me");
  },
};
