import { UserTypes } from "src/models/data/dataModels";

interface StateStatus {
  status: 'idle' | 'loading' | 'failed';
}

export interface LoadingState extends StateStatus {
  isLoading: boolean;
}

export interface AuthState extends StateStatus {}

export interface UserState extends StateStatus {
  isLogin: boolean;
  isAdmin: boolean;
  isSuper: boolean;
  userId: string;
  userType: UserTypes;
  name: string;
  email: string;
  lastLoginDateTime: string;
}
