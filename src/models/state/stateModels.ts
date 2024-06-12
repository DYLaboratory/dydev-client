interface StateStatus {
  status: 'idle' | 'loading' | 'failed';
}

export interface AuthState extends StateStatus {}

export interface UserState extends StateStatus {
  isLogin: boolean;
  userId: string;
  name: string;
  email: string;
  lastLoginDateTime: string;
}
