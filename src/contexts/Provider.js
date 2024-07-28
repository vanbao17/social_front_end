import { useState } from "react";
import { Context } from "./Context";

function Provider({ children }) {
  const [state, setState] = useState(false);
  return (
    <Context.Provider value={(state, setState)}>{children}</Context.Provider>
  );
}
export default Provider;
