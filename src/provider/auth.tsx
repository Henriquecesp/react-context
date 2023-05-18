import { createContext, useCallback, useEffect, useReducer } from "react";

type User = {
  id: string;
  name: string;
  email: string;
};

interface State {
  user: User | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
}

enum ActionType {
  INITIALIZE = "INITIALIZE",
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
}

type InitializeAction = {
  type: ActionType.INITIALIZE;
  payload: {
    user: User;
    isAuthenticated: boolean;
  };
};

type LoginAction = {
  type: ActionType.LOGIN;
  payload: {
    user: User;
  };
};

type LogoutAction = {
  type: ActionType.LOGOUT;
};

type Action = InitializeAction | LoginAction | LogoutAction;

type Handler = (state: State, action: any) => State;

const initialState: State = {
  user: null,
  isAuthenticated: false,
  isInitialized: false,
};

const handlers: Record<ActionType, Handler> = {
  INITIALIZE: (state, action: InitializeAction) => {
    const { user, isAuthenticated } = action.payload;

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },

  LOGIN: (state, action: LoginAction) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },

  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
};

const reducer = (state: State, action: Action): State =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

interface AuthContextType extends State {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  ...initialState,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(() => {
    dispatch({
      type: ActionType.INITIALIZE,
      payload: {
        isAuthenticated: true,
        user: {
          id: "1",
          name: "John Doe",
          email: "teste@example.com",
        },
      },
    });
  }, [dispatch]);

  const login = useCallback(
    async (email: string, name: string) => {
      dispatch({
        type: ActionType.LOGIN,
        payload: {
          user: {
            id: "1",
            name,
            email,
          },
        },
      });
    },
    [dispatch]
  );

  const logout = useCallback(async () => {
    dispatch({
      type: ActionType.LOGOUT,
    });
  }, [dispatch]);

  useEffect(() => {
    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
