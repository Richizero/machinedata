import { defineConfig } from 'vite'
import { loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd())

    const processEnvValues = {
        'process.env': Object.entries(env).reduce(
            (prev, [key, val]) => {
                return {
                    ...prev,
                    [key]: val,
                }
            },
            {},
        )
    }
    console.log(processEnvValues)

    return {
        server: {
            host: true
        },
        define: processEnvValues
    }
})