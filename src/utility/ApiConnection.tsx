import axios, { Method } from 'axios'

import { TOKEN_KEY } from '../constants'

const host = process.env.REACT_APP_API_SERVER_HOST

axios.defaults.baseURL = `//${host}/api`
axios.defaults.timeout = 5000
axios.defaults.withCredentials = true

export const ConnectApi = async (props: ApiProps) => {
  await axios({
    method: props.method,
    url: props.endpoint,
    params: props.query,
    data: props.data ?? null,
    headers: getHeaders(),
  })
    .then((response) => {
      props.callback?.(response.data)
    })
    .catch(() => {
      console.log('fail to communicate with api')
      props.errorCallback?.()
    })
}

const getHeaders = () => {
  const token = window.localStorage.getItem(TOKEN_KEY)
  if (token) {
    return {
      Authorization: `Bearer ${token}`,
    }
  } else {
    return {}
  }
}

export type ApiProps = {
  method: Method
  endpoint: string
  query?: Record<string, boolean | string | number>
  data?: URLSearchParams | Record<string, unknown>
  callback?: CallableFunction
  errorCallback?: CallableFunction
}
