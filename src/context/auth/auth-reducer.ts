type User = {
  id: string;
  usertype_id: number;
  firstname: string;
  middlename: string | null;
  lastname: string;
  email: string;
  email_verified: Date | null;
  username: string;
  status: string;
} | null;

export interface AuthState {
  user: User;
  isAuthenticated: boolean;
}

export type AuthAction = { type: "LOGIN"; payload: User } | { type: "LOGOUT" };

export const initialAuthState: AuthState = { user: null, isAuthenticated: false };

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        isAuthenticated: false
      };
    default:
      return state;
  }
};
