import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './pages/Layout'
import Homepage from './pages/Homepage'
import Transactions from './pages/Transactions'
import AddTransaction from './pages/AddTransaction'

const MyRoute = () => {
  return (
    <BrowserRouter>

      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path='transactions' element={<Transactions />} />
          <Route path='add' element={<AddTransaction />} />
        </Route>
      </Routes>

    </BrowserRouter>
  )
}

export default MyRoute
