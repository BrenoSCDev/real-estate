export interface IParent {
    children: React.ReactNode
}

export interface IUser {
      id?: number;
      name: string;
      password?: string;
      familyName: string;
      cpf: string;
      email: string;
      phoneNumber: string;
      birthdate: string;
      role: string;
      createdAt?: string;
      updatedAt?: string | null;
      verified?: boolean | null;
      active: boolean;
      photos?: IPhoto; 
}

export interface IProperty {
    id?: number;
    priority?: number;
    description: string;
    state: string;
    city: string;
    cep: string;
    street: string;
    neighborhood: string;
    price: number | null;
    propertyType: string;
    houseFloors?: number | null;
    buildingFloor?: number | null;
    squareFeet: number | null;
    typeNegotiation: string;
    room: number | null;
    bathroom: number | null;
    garage: number | null;
    pool: boolean;
    sauna: boolean;
    user?: any;
    corporationId?: number | null;
    createdAt?: string;
    updatedAt?: string | null;
    active?: boolean;
    documentCreateDto?: any;
    photo?: any;
    favorite?: boolean;

}



export interface IPhoto {
    id: number,
    fileName: string,
    documentType: string,
    fileDescription: string | null,
    suffix: string,
    major: boolean,
    fileUrl: string,
    active: boolean,
}

export interface IBGEUFResponse {
    sigla: string;
    nome: string;
}

export interface IBGECITYResponse {
    id: number;
    nome: string;
}

export interface IFilterParams {
    // id: number;
    state: string | undefined;
    city: string | undefined;
    // cep: string;
    // address: string;
    // houseFloors: number;
    // buildingFloor: number;
    // squareFeet: number;
    // room: number;
    // bathroom: number;
    // garage: boolean;
    // pool: boolean;
    // sauna: boolean;
    propertyType?: string | undefined;
    typeNegotiation?: string | undefined;
    // minPrice: number;
    // maxPrice: number;
    // user: string; 
    // corporation: string; 
    // active: boolean;
}
