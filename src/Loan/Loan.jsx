import "../App.css"
import {useRef } from "react";

//obtenemos los movimientos de nuestra cuenta
function Loan({movements}){
  //establecemos el useRef para poder obtener el valor del input y establecemos el limite a 200 ya que no puede ser superior al 200% del balance de la cuenta
  const amountRef = useRef()
  const limit = 200


  //definimos funcion para que se ejecute cuando le demos click a la flecha, primero obtenemos el valor del input y lo pasamos a Number para poder realizar operaciones aritmeticas
  //luego mediante un reduce de nuestros movimientos obtenemos el balance total y lo multiplicamos por el (200/100) para saber cuanto es el limite de credito que se puede solicitar
  //y mientras la cantidad ingresada sea mayor a 0 y menor o igual al limite de credito, se hace el push de la cantidad a los movimientos
  const loan = function(e){
    e.preventDefault()
    const amountLoan = Number(amountRef.current.value)
    const originBalance = movements.reduce((total, movement) => total + movement, 0)
    const limitLoan = (limit/100) * originBalance
    if(amountLoan > 0 && amountLoan <= limitLoan  ){
      movements.push(amountLoan)
      console.log(movements)
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