import { StaticImageData } from "next/image";

export interface Product {
    id: number;
    imageUrl: StaticImageData;
    name: string;
    price: number;
};