import axios from 'axios';
import appconfig from '../constants/config';
class MediaServices {
  async uploadFiles(files: File[], isAsync: boolean = false): Promise<string[]> {
    const apiUrl = appconfig.DEVELOPMENT_API_URL;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }
    let uploadUrl = `${apiUrl}/media/upload`;
    if (isAsync) {
      uploadUrl += '?async=true';
    }
    const response = await axios.post(uploadUrl, formData);
    if (response.data.status === 'success') {
      return response.data.result;
    }
    throw new Error(response.data.message);
  }
}

export default new MediaServices();
