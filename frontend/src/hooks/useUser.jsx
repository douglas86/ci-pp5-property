import useAppContext from "./useAppContext";
import { useEffect } from "react";

const useUser = () => {
  const { dispatch, isUser } = useAppContext();

  useEffect(() => {}, [dispatch, isUser]);
};

export default useUser;
