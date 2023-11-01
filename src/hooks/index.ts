import { AuthContext } from "../contexts";
import { useContext } from "react";

export const UseAuth = () => {
    const context = useContext(AuthContext)

    return context
}