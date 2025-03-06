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

  //Estado para almacenar la cuenta

  const [account, setAccount] = useState(null)
  const [sort, setSort] = useState(false)
  const [sortDireccion, setSortDireccion] = useState("desc")

  //Obtenemos los datos del componente Login que nos los ha pasado y si el user y pin ingresados coinciden con los de alguna cuenta de accounts, si existe esa cuenta se guarda en account y se abre la cuenta
  const handleLogin = (user, pin) => {
    const currentAccount = accounts.find(acc => acc.username === user && acc.pin === Number(pin)

    )
   if (currentAccount) setAccount(currentAccount)
    console.log("current account", currentAccount), console.log("user", user), console.log("pin", pin)
  console.log(accounts)
  }

  //TIMER, para cerrar la sesión si el tiempo llega a 0
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

  //Definimos todo en componentes y les pasamos a cada uno los props que necesitemos para que funcione
  return (
    <>
    <Container>
      <Navbar bg='Light' expand="lg" className='flex flex-row justify-content-between'>
      <Welcome account={account} />
      <img src="logo.png" alt="Logo" className="logo" />
     <Login onLogin={handleLogin}/>
     </Navbar>
     </Container>
    
  {/* Si account existe, se abre la cuenta */}
{account && (
  <Container>
      {/* <!-- BALANCE --> */}
      <Balance movements={account.movements}/>

      {/* <!-- MOVEMENTS --> */}
      <Movements movements={account.movements} sort={sort} setAccount={setAccount} currentAccount={account} sortDireccion={sortDireccion}/>

      {/* <!-- SUMMARY --> */}
      <Summary movements={account.movements} setSort={setSort} sortDireccion={sortDireccion} setSortDireccion={setSortDireccion}/>

      {/* <!-- OPERATION: TRANSFERS --> */}
      <Transfers currentAccount={account} movements={account.movements} accounts={accounts} setAccount={setAccount} />

      {/* <!-- OPERATION: LOAN --> */}
      <Loan movements={account.movements} setAccount={setAccount} currentAccount={account} />

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
