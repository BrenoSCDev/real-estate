import { IUser } from "../../interfaces";

export interface IAuthContext {
    user: any;
    token: string;
    isAuth: boolean;
    error: string;
    signIn: (username: string, password: string) => void;
    registerUser: (
      email: string, 
      password: string, 
      name: string,
      secondName: string,
      number: string,
      cpf: string,
      date: string
      ) => void;
      registerCorporation: (
        fantasyName: string,
        corporationName: string,
        corporationType: string,
        email: string,
        password: string,
        stateRegistration: string,
        municipalRegistration: string,
        phoneNumber: string,
        cnpj: string,
        cep: string,
        role: string,
        active: boolean
      ) => void;
      signOut: () => void;
  }

  export interface ApiResponse<T = {}> {
    data: T;
    message?: string;
    errors?: Record<string, string>;
  }

  export type ApiError = {
    response?: {
      data: ApiResponse;
    };
    message: string;
  };