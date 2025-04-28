import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
// Import Bootstrap Icons
import 'bootstrap-icons/font/bootstrap-icons.css'

// Import Leaflet CSS
import 'leaflet/dist/leaflet.css'

const app = createApp(App)

app.use(router)
app.mount('#app') 