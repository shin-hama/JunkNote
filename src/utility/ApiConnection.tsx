import axios, { Method } from 'axios'

import { TOKEN_KEY } from '../constants'

const host = process.env.REACT_APP_API_SERVER_HOST

axios.defaults.baseURL = `//${host}/api`
axios.defaults.timeout = 5000
axios.defaults.withCredentials = true

type ApiPropsType<T, U> = {
  method: Method
  endpoint: string
  query?: Record<string, boolean | string | number>
  data?: URLSearchParams | Record<string, unknown>
  callback?: (arg: T) => U
  errorCallback?: () => void
}

export const ApiProps = <T, U>({
  method,
  endpoint,
  query,
  data,
  callback,
  errorCallback,
}: {
  method: Method
  endpoint: string
  query?: Record<string, boolean | string | number>
  data?: URLSearchParams | Record<string, unknown>
  callback?: (arg: T) => U
  errorCallback?: () => void
}): ApiPropsType<T, U> => ({
  method: method,
  endpoint: endpoint,
  query: query,
  data: data,
  callback: callback,
  errorCallback: errorCallback,
})

export const ConnectApi = async <T, U>(props: ApiPropsType<T, U>) => {
  try {
    const response = await axios({
      method: props.method,
      url: props.endpoint,
      params: props.query,
      data: props.data ?? null,
      headers: getHeaders(),
    })
    return props.callback?.(response.data)
  } catch (error) {
    console.log(error)
    return props.errorCallback?.()
  }
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
