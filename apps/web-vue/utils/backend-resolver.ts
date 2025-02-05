import axios from "axios"
const runtime = useRuntimeConfig()

const backend = axios.create({
    baseURL: runtime.public.apiUrl || 'https://api.gradex.lyra-research.site/',
    timeout: 5000,
    validateStatus(status) {
        return status < 500;
    },
})

export async function resolveUser(token: string) {
    const { data, status, statusText } = await backend.get('credentials/user', {
        headers: {
            Authorization: `Bearer ${token}`
        },
    }).catch((e) => {
        throw new Error(e)
    });

    if (status >= 400) {
        throw new Error(`Error ${status}: ${data.message}`, { cause: statusText })
    }
    return data;
}

export default backend;