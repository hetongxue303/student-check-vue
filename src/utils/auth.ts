import { useCookies } from '@vueuse/integrations/useCookies'

const cookies = useCookies()
const Authorization = 'Authorization'

export const getToken = (): string => {
  return cookies.get(Authorization)
}

export const removeToken = () => {
  cookies.remove(Authorization)
}

export const setToken = (token: string) => {
  cookies.set(Authorization, token)
}
