import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './assets/style.css'
import MyRoute from './MyRoute.jsx'

createRoot(document.getElementById('root')).render(
  <>
    <MyRoute />
  </>
)
