export default class ImageAE {
    id?:string;
    cropped_picture?:string;
    author?:string;
    camera?:string;
    tags?:string;
    full_picture?:string;

    constructor(obj?:ImageAE){
        if(obj) Object.assign(this, obj);
    }
}