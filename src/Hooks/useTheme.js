import { useContext } from "react";
import { Appcontext } from "../Context/AppContextProvider";

const useTheme = () => {
  const { theme } = useContext(Appcontext);

  const getThemeClass = (type) => {
    const themeObject = {
      bg: theme === "dark" ? "bg-zinc-800" : "bg-zinc-300",
      text: theme === "dark" ? "text-zinc-300" : "text-zinc-800",
      searchBg: theme === "dark" ? "bg-zinc-300" : "bg-zinc-800",
      searchText: theme === "dark" ? "text-zinc-800" : "text-zinc-300",
      productCardBg: theme === "dark" ? "bg-zinc-600" : "bg-zinc-500",
      productCardText: theme === "dark" ? "text-zinc-300" : "text-zinc-800",
    };
    return themeObject[type] || "";
  };

  return { theme, getThemeClass };
};

export default useTheme;
