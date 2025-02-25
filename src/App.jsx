import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Navbar, Nav } from 'react-bootstrap' 
import Welcome from './Welcome/Welcome.jsx'
import Login from './Login/Login.jsx'
import Balance from './Balance/Balance.jsx'
import Movements from './Movements/Movements.jsx'  
import Summary from './Summary/Summary.jsx'
import accounts from './Accounts/Accounts.jsx'


function App() {

  const [account, setAccount] = useState(null)

  const handleLogin = (user, pin) => {
    const currentAccount = accounts.find(acc => acc.username === user && acc.pin === Number(pin)

    )
   if (currentAccount) setAccount(currentAccount)
    console.log("current account", currentAccount), console.log("user", user), console.log("pin", pin)
  }

  return (
    <>
    <Container>
      <Navbar bg='Light' expand="lg" className='flex flex-row justify-content-between'>
      <Welcome account={account} />
      <img src="logo.png" alt="Logo" className="logo" />
     <Login onLogin={handleLogin} />
     </Navbar>
     </Container>
    
{account && (
  <Container>
      {/* <!-- BALANCE --> */}
      <Balance movements={account.movements}/>

      {/* <!-- MOVEMENTS --> */}
      <Movements movements={account.movements} />

      {/* <!-- SUMMARY --> */}
      <Summary movements={account.movements} />

      {/* <!-- OPERATION: TRANSFERS --> */}
      <div className="operation operation--transfer">
        <h2>Transfer money</h2>
        <form className="form form--transfer">
          <input type="text" className="form__input form__input--to" />
          <input type="number" className="form__input form__input--amount" />
          <button className="form__btn form__btn--transfer">&rarr;</button>
          <label className="form__label">Transfer to</label>
          <label className="form__label">Amount</label>
        </form>
      </div>

      {/* <!-- OPERATION: LOAN --> */}
      <div className="operation operation--loan">
        <h2>Request loan</h2>
        <form className="form form--loan">
          <input type="number" className="form__input form__input--loan-amount" />
          <button className="form__btn form__btn--loan">&rarr;</button>
          <label className="form__label form__label--loan">Amount</label>
        </form>
      </div>

      {/* <!-- OPERATION: CLOSE --> */}
      <div className="operation operation--close">
        <h2>Close account</h2>
        <form className="form form--close">
          <input type="text" className="form__input form__input--user" />
          <input
            type="password"
            maxlength="6"
            className="form__input form__input--pin"
          />
          <button className="form__btn form__btn--close">&rarr;</button>
          <label className="form__label">Confirm user</label>
          <label className="form__label">Confirm PIN</label>
        </form>
      </div>

      {/* <!-- LOGOUT TIMER --> */}
      <p className="logout-timer">
        You will be logged out in <span className="timer">05:00</span>
      </p>
    </Container>
)
}

    
    </>
  )
}

export default App
