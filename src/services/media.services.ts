import axios from 'axios';
import appconfig from '../constants/config';
class MediaServices {
  async uploadFiles(files: File[]) {
    const apiUrl = appconfig.DEVELOPMENT_API_URL;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }
    const response = await axios.post(`${apiUrl}/media/upload`, formData);
    if(response.data.status === 'success') {
      return response.data.result;
    }
    throw new Error(response.data.message);
  }
}

export default new MediaServices();
