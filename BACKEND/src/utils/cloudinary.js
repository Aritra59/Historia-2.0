import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"


cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME, 
        api_key:process.env.CLOUDINARY_API_KEY, 
        api_secret:process.env.CLOUDINARY_API_SECRET// Click 'View API Keys' above to copy your API secret
});


const cloudUploader = async function (filepath) {
    try {
        const uploadResult = await cloudinary.uploader
            .upload(filepath, {
                resource_type: "auto"
            })
console.log("The content is uploaded at"+uploadResult.url)
            
return uploadResult
    } catch (error) {
         fs.unlinkSync(filepath)
        console.log("error occured during file uploading"+error.message)
    }
}


const cloudDataDeleter= async function (path){
    try {
        const dataDeleteStatus  = await cloudinary.uploader.destroy(path)
        // console.log(dataDeleteStatus)
        if(!dataDeleteStatus) throw new Error("deletion failed!")
        return dataDeleteStatus
    } catch (error) {
        console.error(error)
    }
    }

export {cloudUploader,cloudDataDeleter}

