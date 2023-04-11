import axios from 'axios'
import Qs from 'qs'

axios.interceptors.request.use(axiosConfig => {
    // axiosConfig.headers['X-Token'] = '60b14d9a-a626-492b-acbc-4ffca8e19a31'
    axiosConfig.headers['Access-Control-Allow-Origin'] = '*'
    return axiosConfig
})

export const $get = (path: string, params = {}, headers = {}) => {
    const url = path
    return axios({ url, params, method: 'get', headers })
}

export const $post = (path: string, data = {}, headers = {}) => {
    data = Qs.stringify(data)
    const url = path
    return axios({ url, data, method: 'post', headers })
}
