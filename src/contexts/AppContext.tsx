import { createContext, useContext, useEffect, useState } from "react";
import * as userService from "@/api/user.service";
import { IUserType } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

type AppContextType = {
  isLoggedIn: boolean;
  user: IUserType | null;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<IUserType | null>(null);

  const { data, error } = useQuery({
    queryFn: userService.getCurrentUser,
    queryKey: ["users"],
    refetchIntervalInBackground: true,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    if (data) {
      setUser(data as IUserType);
    }
  }, [data]);

  const { isError: RefreshTokenError } = useQuery({
    queryFn: userService.refreshToken,
    queryKey: ["validate"],
    refetchInterval: 10 * 60 * 1000,
    refetchIntervalInBackground: true,
    enabled: !error,
  });

  const isLoggedIn = !RefreshTokenError;

  return (
    <AppContext.Provider value={{ isLoggedIn, user }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context as AppContextType;
};
