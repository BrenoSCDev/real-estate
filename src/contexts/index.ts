import { createContext } from "react"
import { IAuthContext } from "./interfaces"

export const AuthContext = createContext<IAuthContext>({} as IAuthContext)

export const PropertyContext = createContext({})