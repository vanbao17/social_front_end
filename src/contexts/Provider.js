import { useEffect, useState } from "react";
import { Context } from "./Context";

function Provider({ children }) {
  const [menufix, setmenufix] = useState(false);
  useEffect(() => {
    const fixedmenu = () => {
      if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 50
      ) {
        setmenufix(true);
      } else {
        setmenufix(false);
      }
    };
    window.addEventListener("scroll", fixedmenu);
    return () => {
      window.removeEventListener("scroll", fixedmenu);
    };
  });
  return (
    <Context.Provider value={{ menufix, setmenufix }}>
      {children}
    </Context.Provider>
  );
}
export default Provider;
