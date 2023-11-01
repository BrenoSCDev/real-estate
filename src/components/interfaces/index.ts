import { IParent } from "../../interfaces";


export interface ICustomHiddenProps extends IParent{
    xsUp?: boolean;
    xsDown?: boolean;
    smUp?: boolean;
    smDown?: boolean;
    mdUp?: boolean;
    mdDown?: boolean;
    lgUp?: boolean;
    lgDown?: boolean;
    xlUp?: boolean;
}

export interface INavigationLinks {
    name: string;
    to: string;
}

export interface IPropertyCardProps {
    images: any,
    surname?: string,
    price?: number,
    city?: string,
    address?: string,
    square?: number
    bathroom?: number,
    room?: number
    propertyLink?: string
    isFav?: boolean;
    typeNegotiation: string;
    onFav?: any;
    onDelete?: () => void;
    onUpdate?: () => void;
    onView?: () => void;
}
  
export interface ICarouselProps {
    images: string[] | undefined;
    onClick?: () => void;
    type: "card" | "modal"
  }
  
export interface IModalProps {
  onShow: boolean | undefined;
  onClose: () => void | undefined;
  modalTitle: string;
  success?: boolean;
  info?: boolean;
  onClickButton?:() => void;
}

export interface IPaginationProps {
  totalPages: number;
  handlePageClick: (data: {selected: number}) => void;
}