import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"


cloudinary.config({
    cloud_name: 'dxlh2omhr', 
        api_key: '619754411115187', 
        api_secret: '7q4N6b7Dtc8Xg90yKbph4D7b81M'// Click 'View API Keys' above to copy your API secret
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

