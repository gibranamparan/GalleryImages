
import ImageAE from "@/models/ImageAE";
import ImagesList from "@/models/ImagesList";
import { default as axios } from "axios";

export default class ImagesServices {
    public static getImages(page = 0):Promise<ImagesList>{
        return axios.get('/images', {
            params: { page }
        })
        .then(res => {
            if(res.data?.pictures?.length){
                const images = res.data.pictures.map((pic:any) => new ImageAE(pic));
                const result = new ImagesList();
                result.images = images;
                result.pageCount = res.data.pageCount;
                return result;
            }
            return new ImagesList();
        })
        .catch(err => {
            console.error('Error getting images', {err})
            return new ImagesList();
        })
    }

    public static getImageDetails(id:string):Promise<ImageAE>{
        return axios.get(`/images/${id}`)
        .then(res => {
            if(res.data?.id){
                return new ImageAE(res.data);
            }
            return new ImageAE();
        })
        .catch(err => {
            console.error('Error getting details', {err})
            return new ImageAE();
        })
    }
}