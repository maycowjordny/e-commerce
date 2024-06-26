import { RegisterProductValidationSchema } from '@/components/form-dialog';
import { Product } from '@/interfaces/product';
import axiosInstance from '@/service/config-axios';
import { endpoints } from '@/service/endpoints';
import Cookies from 'js-cookie';

export const token = Cookies.get('Auth');

export const getProducts = async (filter: string): Promise<Product[]> => {
    const response = await axiosInstance.get(endpoints.product.list, {
        params: {
            filter
        }
    });

    return response.data;
};

export const getProductById = async (id: string): Promise<Product> => {
    const response = await axiosInstance.get(endpoints.product.getById(id), {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data;
};

export const createProduct = async (data: RegisterProductValidationSchema): Promise<void> => {
    await axiosInstance.post(endpoints.product.create, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const updateProduct = async (id: string, data: RegisterProductValidationSchema): Promise<void> => {

    await axiosInstance.put(endpoints.product.update(id), {
        name: data.name,
        price: data.price,
        image: data.image.includes("/images/") ? undefined : data.image
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const deleteProduct = async (id: string): Promise<void> => {
    await axiosInstance.delete(endpoints.product.update(id), {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}