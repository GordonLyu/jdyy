// store/index.ts

import { createPinia } from 'pinia'

const pinia = createPinia()
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'


pinia.use(piniaPluginPersistedstate)



export default pinia