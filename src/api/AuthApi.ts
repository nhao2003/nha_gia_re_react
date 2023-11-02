import axios from 'axios'

const BASE_URL = 'your_api_url'

export const login = async (username: string, password: string): Promise<any> => {
  const response = await axios.post(`${BASE_URL}/login`, { username, password })
  return response.data
}
