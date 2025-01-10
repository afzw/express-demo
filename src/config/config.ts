import path from "path"

type Config = {
    port: number
    logDir: string
    publicDir: string
    uploadDir: string
    scriptDir: string
}

const config: Config = {
    port: 0,
    logDir: '',
    publicDir: '',
    uploadDir: '',
    scriptDir: ''
}

export { config, Config }