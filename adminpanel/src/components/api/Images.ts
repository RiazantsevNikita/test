import axios, { AxiosResponse } from 'axios';

interface IConfigAxios {
  headers: {
    "content-type": 'multipart/form-data',
    "Authorization": string
  }
}

export default function<T = any> (file: File): Promise<AxiosResponse<T>> {
  const formData: FormData = new FormData();
  formData.append('image', file);
  const config: IConfigAxios = {
    headers: {
      'content-type': 'multipart/form-data',
      "Authorization": "Bearer " + localStorage.token as string,
    }
  };
  return axios.post(process.env.VUE_APP_BASE_URL+'api/admin/add-image', formData, config);
};
