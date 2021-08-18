import axios from 'axios'

const host = process.env.REACT_APP_API_SERVER_HOST
const baseApiHost = `//${host}/api`

export const GetMethod = async (
  endpoint: string,
  query: string | null,
  callback: CallableFunction
) => {
  const uri = query
    ? `${baseApiHost}/${endpoint}?${query}`
    : `${baseApiHost}/${endpoint}`
  axios
    .get(uri)
    .then((response) => {
      callback?.(response.data)
    })
    .catch(() => {
      console.log('fail to communicate with api')
    })
}
