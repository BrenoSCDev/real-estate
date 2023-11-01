import { useState, useEffect } from "react"
import { IParent, IUser } from "../interfaces"
import { AuthContext } from "."
import axiosApi from "../services"

export const AuthProvider: React.FC<IParent> = ({ children }) => {
    const [user, setUser] = useState<any>({})
    const [isAuth, setIsAuth] = useState<boolean>(false)
    const [token, setToken] = useState<string>("");
    const [error, setError] = useState<string>("")

    useEffect(() => {
        const verifyData = async () => {
        const userData = localStorage.getItem("user")
        const tokenData = localStorage.getItem("user_token")
    
        if(userData && tokenData) {
            setIsAuth(true)
            setUser(JSON.parse(userData))
            axiosApi.defaults.headers['Authorization'] = `Bearer ${tokenData}`
        }
    }
        verifyData()
    },[])

    const signIn = async (username: string, password: string) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await axiosApi.post("user/login", { username, password })
                    if (response.status === 200) {
                        const tokenResponse = response.data.idToken
                        const userResponse = response.data.user
                        resolve(response.data)
                        setUser(userResponse)
                        setToken(tokenResponse)
                        setIsAuth(true)
                        localStorage.setItem("user", JSON.stringify(userResponse))
                        localStorage.setItem("user_token", tokenResponse)
                    } else{
                        reject(new Error)
                    }
            }catch (error: any) {
                if (error.response && error.response.status === 401) {
                    setError('Usuário com confirmação pendente.')
                }
                if (error.response && error.response.status === 404) {
                    setError("Ops! Algo deu errado, verifique e tente novamente.")
                }
                if (error.response && error.response.status === 500){
                    setError("Credenciais inválidos, verifique e tente novamente.")
                }
            }})
    }

    const registerUser = async(
        email: string,
        password: string,
        name: string,
        familyName: string,
        phoneNumber: string,
        cpf: string,
        birthdate: string) => {
                const role = 'USER'
                const active = true
                try{
                    setUser({ email, password, name, familyName, phoneNumber, cpf, birthdate, role , active })
                    const response = await axiosApi.post("/user", user)
                    if(response.status === 200){
                        setError('Houve um erro')
                    }
                } catch (error: any) {
                    if (error.response && error.response.status) {
                        const errorResponse = error.response.data
                            errorResponse === "This 'cpf' is already registered!"
                            ? setError("Este CPF já está cadastrado") :
                            errorResponse === "invalid Brazilian individual taxpayer registry number (CPF)"
                            ? setError("CPF inválido")
                            : setError(JSON.stringify(errorResponse))
                    }
                    if (error.response && error.response.status === 404) {
                        setError("Ops! Algo deu errado, verifique e tente novamente.")
                    }
    }}

    const registerCorporation = async(
        fantasyName: string,
        corporationName: string,
        corporationType: string,
        email: string,
        password: string,
        stateRegistration: string,
        municipalRegistration: string,
        phoneNumber: string,
        cnpj: string,
        cep: string) => {
            const role = 'CORPORATION'
            const active = true
            try{
                setUser({ fantasyName, corporationName, role, corporationType, email, phoneNumber, password, cnpj, stateRegistration, municipalRegistration, cep, active })
                await axiosApi.post("/corporation", user)
                console.log(user)
            }catch(e){
                alert(`Error: ${e}`)
                console.error(e)
        }
    }

    const signOut = () => {
        setUser({} as IUser)
        localStorage.removeItem("user")
        localStorage.removeItem("user_token")
    }

    return (
        <AuthContext.Provider value={{ user, error, token, isAuth, signIn, registerUser, registerCorporation, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}
