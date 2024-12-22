import axios from '@/lib/axios';

export const fetcher = <T>(url: string) => {
  return axios.get<T>(url).then(res => res.data);
};
