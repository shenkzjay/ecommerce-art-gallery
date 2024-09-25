import { createContext, useState } from "react";
import { SetStateAction } from "react";

interface AuthProviderType {
  children: React.ReactNode;
}

interface userDataType {
  fullname: string;
  email: string;
  cartItems: {
    productId: string;
    quantity: number;
  };
  savedItems: {
    productId: string;
  };
}

interface AuthContextType {
  auth: string | null;
  setAuth: React.Dispatch<SetStateAction<string | null>>;
  setUserData: React.Dispatch<SetStateAction<userDataType | null>>;
  userData: userDataType | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: AuthProviderType) => {
  const [auth, setAuth] = useState<string | null>(null);
  const [userData, setUserData] = useState<userDataType | null>(null);

  console.log({ auth });

  return (
    <AuthContext.Provider value={{ auth, setAuth, userData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
