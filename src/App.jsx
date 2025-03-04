import { useState, useEffect } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Navbar, Nav } from 'react-bootstrap' 
import Welcome from './Welcome/Welcome.jsx'
import Login from './Login/Login.jsx'
import Balance from './Balance/Balance.jsx'
import Movements from './Movements/Movements.jsx'  
import Summary from './Summary/Summary.jsx'
import accounts from './Accounts/Accounts.jsx'
import Transfers from './Transfers/Transfers.jsx'
import Loan from './Loan/Loan.jsx'
import Close from './Close/Close.jsx'

function App() {

  const [account, setAccount] = useState(null)

  const handleLogin = (user, pin) => {
    const currentAccount = accounts.find(acc => acc.username === user && acc.pin === Number(pin)

    )
   if (currentAccount) setAccount(currentAccount)
    console.log("current account", currentAccount), console.log("user", user), console.log("pin", pin)
  }

  //TIMER 
  const [time, setTime] = useState(305);
  

  useEffect(() => {
    if (time === 0) {
      setAccount(null)
    
    }

    const timer = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [time]);

  const formatTime = (time) => {
    const min = String(Math.trunc(time / 60)).padStart(2, "0");
    const sec = String(time % 60).padStart(2, "0");
    return `${min}:${sec}`;
  };

  return (
    <>
    <Container>
      <Navbar bg='Light' expand="lg" className='flex flex-row justify-content-between'>
      <Welcome account={account} />
      <img src="logo.png" alt="Logo" className="logo" />
     <Login onLogin={handleLogin}/>
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
      <Transfers currentAccount={account} movements={account.movements} accounts={accounts} setAccount={setAccount} />

      {/* <!-- OPERATION: LOAN --> */}
      <Loan movements={account.movements} />

      {/* <!-- OPERATION: CLOSE --> */}
      <Close accounts={accounts} currentAccount={account} setAccount={setAccount} />

      {/* <!-- LOGOUT TIMER --> */}
      <p className="logout-timer">
        You will be logged out in <span className="timer">{formatTime(time)}</span>
      </p>
    </Container>
)
}


    
    </>
  )
}

export default App
