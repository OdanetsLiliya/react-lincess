import axios from 'axios'

const apiClient = (token: string) => {
    const instance = axios.create()
    instance.interceptors.request.use(async (request) => {
        if (token && request.headers) {
            request.headers.common?.set('Authorization', `Bearer ${token}`)
        }
        return request
    })

    instance.interceptors.response.use(
        (response) => {
            console.log(response)
            return response
        },
        (error) => {
            console.log(`error`, error)
        }
    )

    return instance
}

export default apiClient;