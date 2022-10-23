import axios from '../../utils/request'

const baseAPI = import.meta.env.VITE_GLOB_BASIC_API

export const test = () => {
  return axios({
    method: 'GET',
    url: `${baseAPI}/test`
  })
}
