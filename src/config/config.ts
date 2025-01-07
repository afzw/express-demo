import path from "path"

type Config = {
    port: number
    logDir: string
    publicDir: string
    uploadDir: string
}

const config: Config = {
    port: 9000,
    logDir: path.join(__dirname, '../../logs'),
    publicDir: path.join(__dirname, '../..', 'public'),
    uploadDir: path.join(__dirname, '../..', 'uploads'),

}

export { config, Config }