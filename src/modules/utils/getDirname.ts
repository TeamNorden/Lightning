import { URL } from 'url'

const getDirname = async (url: string | URL) => {
    const { dirname } = (await import('path')).default
    const { fileURLToPath } = (await import('url')).default

    const __dirname = dirname(fileURLToPath(url))

    return __dirname
}

export default getDirname
