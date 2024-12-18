import { SystemSettingsData, UserTypes } from "src/models/data/dataModels";

interface StateStatus {
  status: 'idle' | 'loading' | 'failed';
}

export interface LoadingState extends StateStatus {
  isLoading: boolean;
}

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

export interface AuthState extends UserState {}

export interface SystemState extends SystemSettingsData, StateStatus {

}
