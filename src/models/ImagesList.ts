import ImageAE from "./ImageAE";

export default class ImagesList {
    images:Array<ImageAE>;
    pageCount:number;
    
    constructor(){
        this.images = new Array<ImageAE>();
        this.pageCount = 0;
    }
}