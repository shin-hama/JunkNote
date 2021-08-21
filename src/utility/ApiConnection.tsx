import axios from 'axios'

const host = process.env.REACT_APP_API_SERVER_HOST
const baseApiHost = `//${host}/api`

axios.defaults.withCredentials = true

export const GetMethod = async (
  endpoint: string,
  query: string | null,
  callback: CallableFunction
) => {
  const uri = query
    ? `${baseApiHost}/${endpoint}?${query}`
    : `${baseApiHost}/${endpoint}`
  await axios
    .get(uri, Config())
    .then((response) => {
      callback?.(response.data)
    })
    .catch(() => {
      console.log('fail to communicate with api')
    })
}

export const PostMethod = async (
  endpoint: string,
  query: string | null,
  data: unknown,
  callback: CallableFunction
) => {
  const uri = query
    ? `${baseApiHost}/${endpoint}?${query}`
    : `${baseApiHost}/${endpoint}`
  await axios
    .post(uri, data, Config())
    .then((response) => {
      callback?.(response.data)
    })
    .catch(() => {
      console.log('fail to communicate with api')
    })
}

const Config = () => {
  const token = window.localStorage.getItem('myBearerToken')
  if (token) {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  } else {
    return {}
  }
}
