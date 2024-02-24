import { v2 as cloudinary } from 'cloudinary';

          
cloudinary.config({ 
  cloud_name: 'dgnvq8qje', 
  api_key: '343424864916482', 
  api_secret: 'ZkewBLumS6n2AxhUhl0a6vlX4pA' 
});

 export const upload = async(file)=>{
    const result = await cloudinary.uploader.upload(file.tempFilePath);
    return result;
}
export const deleteImage = async (data) => {
  const result = await cloudinary.uploader.destroy(data);
  return result;
}
