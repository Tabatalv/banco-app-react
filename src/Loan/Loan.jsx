import "../App.css"
import {useRef } from "react";
import moment from "moment";

//obtenemos los movimientos de nuestra cuenta
function Loan({movements, currentAccount}){
  //establecemos el useRef para poder obtener el valor del input y establecemos el limite a 200 ya que no puede ser superior al 200% del balance de la cuenta
  const amountRef = useRef()
  const limit = 200

  //creamos la funcion para hacer el push de la cantidad a los movimientos de la cuenta que indiquemos y la cantidad, con el formato tipo objeto que necesitamos
   const addMovement = (account, amount) => {
      const newMovement = {
        date: moment().format('DD/MM/YYYY'), // Fecha de hoy
        value: amount, // Cantidad pasada como parámetro
      };
    
      account.movements.push(newMovement);
    };

  //definimos funcion para que se ejecute cuando le demos click a la flecha, primero obtenemos el valor del input y lo pasamos a Number para poder realizar operaciones aritmeticas
  //luego mediante un reduce de nuestros movimientos obtenemos el balance total y lo multiplicamos por el (200/100) para saber cuanto es el limite de credito que se puede solicitar
  //y mientras la cantidad ingresada sea mayor a 0 y menor o igual al limite de credito, llamamos a la funcion addMovement para hacer el push de la cantidad a los movimientos de la cuenta
  const loan = function(e){
    e.preventDefault()
    const amountLoan = Number(amountRef.current.value)
    const originBalance = movements.reduce((total, movement) => total + movement.value, 0)
    const limitLoan = (limit/100) * originBalance
    if(amountLoan > 0 && amountLoan <= limitLoan  ){
      addMovement(currentAccount, amountLoan)
    
    }
    else{
      console.log("No cumple requisitos")
    }

  }


    return(
        <div className="operation operation--loan">
        <h2>Request loan</h2>
        <form className="form form--loan">
          <input type="number" className="form__input form__input--loan-amount" ref={amountRef}/>
          <button className="form__btn form__btn--loan" onClick={loan}>&rarr;</button>
          <label className="form__label form__label--loan">Amount</label>
        </form>
      </div>

    )
}

export default Loan