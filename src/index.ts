import { cotalkerAPI } from './lib/CotalkerAPI'


async function main() {
    const g = await cotalkerAPI.getPropertyByCode('guyana')
    await cotalkerAPI.patchProperty(g._id, {
       isActive: false
    })
}

main()