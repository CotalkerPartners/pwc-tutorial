import { cotalkerAPI } from './lib/CotalkerAPI'


async function main() {
    const chile = await cotalkerAPI.getProperty('636967d9a3554a0008a414e9') // Pedir un elemento
    console.log(chile)
}

main()