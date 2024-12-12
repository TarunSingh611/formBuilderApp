// mobile/src/services/imagekit.js  
import axios from 'axios';  
import { manipulateAsync } from 'expo-image-manipulator';  

export const uploadImage = async (uri) => {  
  try {  
    // Compress image before upload  
    const manipulatedImage = await manipulateAsync(  
      uri,  
      [{ resize: { width: 1080 } }],  
      { compress: 0.8, format: 'jpeg' }  
    );  

    // Get authentication parameters from backend  
    const { data: authParams } = await axios.get('/api/uploads/auth');  

    // Create form data  
    const formData = new FormData();  
    formData.append('file', {  
      uri: manipulatedImage.uri,  
      type: 'image/jpeg',  
      name: 'image.jpg',  
    });  
    formData.append('publicKey', authParams.publicKey);  
    formData.append('signature', authParams.signature);  
    formData.append('expire', authParams.expire);  
    formData.append('token', authParams.token);  

    const response = await axios.post('/api/uploads', formData, {  
      headers: {  
        'Content-Type': 'multipart/form-data',  
      },  
    });  

    return response.data.url;  
  } catch (error) {  
    console.error('Image upload failed:', error);  
    throw error;  
  }  
};  