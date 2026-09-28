import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <>
      <header className='bg-success-subtle px-5'>
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <Link className="navbar-brand fw-bold" to={'/'}>
              💰 Expense Tracker
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarScroll">
              <ul className="navbar-nav m-auto my-2 my-lg-0 navbar-nav-scroll">

                <li className="nav-item">
                  <Link className="nav-link" to={'/'}>Dashboard</Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to={'/transactions'}>Transactions</Link>
                </li>

              </ul>

              <div className="buttons">
                <Link to={'/add'} className='btn btn-dark btn-sm'>+ Add Transaction</Link>
              </div>

            </div>
          </div>
        </nav>
      </header>
    </>
  )
}

export default Header
