import "../App.css";
import { useState, useRef } from "react";
import moment from "moment";
//le pasamos nuestra cuenta actual, nuestros movimientos, todas las cuentas, y el setAccount que se utiliza para establecer la cuenta que ha iniciado sesion
function Transfers({ currentAccount, movements, accounts, setAccount }) {

  //utilizamos useRef para obtener los valores de los inputs

  const transferRef = useRef();
  const amountRef = useRef();

  //defjnimos funcion que se ejecutara cuando se haga click a la flecha, primero obtenemos la cuenta a la que hacemos la transferencia y la cantidad a transferir
  
  //luego verificamos si existe la cuenta, y si existe la guardamos en acc, luego obtenemos nuestro balance, que seria un reduce que nos entrega el total de los movimientos, y mientras
  
  //el balance sea mayor o igual a la cantidad a ingresar y si la cantidad ingresada es mayor a 0, se hace la transferencia,  para realizarla
  
  // hacemos un push de la cantidad a los movimientos a acc y un push de la cantidad pero negativa a nuestros movimientos
  
  //de esa forma se actualizará el balance restandole la cantidad que hemos transferido, finalizando estableciendo la cuenta a la que hemos hecho la transferencia como accTransfer
  
  //y volvemos a establecer mediante el setAccount nuestra cuenta como la que ha iniciado sesion, para que pueda actualizar nuestro balance

  const addMovement = (account, amount) => {
    const newMovement = {
      date: moment().format('DD/MM/YYYY'), // Fecha de hoy
      value: amount, // Cantidad pasada como parámetro
    };
  
    account.movements.push(newMovement);
    console.log(newMovement.date, "date transfer")
  };
  



  const transfer = function (e) {
    e.preventDefault();
    
    const transferTo = transferRef.current.value;
    const amount = Number(amountRef.current.value);

    const acc = accounts.find((acc) => acc.username === transferTo);

    if (acc) {
      
      const originBalance = movements.reduce(
        (total, movement) => total + movement.value,
        0
      );
      
     
      if (originBalance >= amount && amount > 0) {
        acc.movements.push(amount);
        addMovement(currentAccount, -amount)
        addMovement(acc, amount)
        setAccount(currentAccount)
        console.log(acc.movements, currentAccount.movements)
       
      }
    }
    
  };

  return (
    <div className="operation operation--transfer">
      <h2>Transfer money</h2>
      <form className="form form--transfer">
        <input
          type="text"
          className="form__input form__input--to"
          ref={transferRef}
        />
        <input
          type="number"
          className="form__input form__input--amount"
          ref={amountRef}
        />
        <button className="form__btn form__btn--transfer" onClick={transfer}>
          &rarr;
        </button>
        <label className="form__label">Transfer to</label>
        <label className="form__label">Amount</label>
      </form>
    </div>
  );
}
export default Transfers;
