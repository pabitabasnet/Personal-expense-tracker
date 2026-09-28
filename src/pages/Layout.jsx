import { Outlet } from 'react-router-dom'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import { TransactionsProvider } from '../context/TransactionsContext'

const Layout = () => {
  return (
    <TransactionsProvider>

      <Header />
      <Outlet />
      <Footer />

    </TransactionsProvider>
  )
}

export default Layout
