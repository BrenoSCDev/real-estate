export interface IPropertyRow {
    propertyName: string;
    propertyAddress: string;
    images: string[]
    onDelete: any;
    onUpdate: () => void;
}