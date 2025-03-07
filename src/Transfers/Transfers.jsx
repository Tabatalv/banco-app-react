import "../App.css";
import { useRef } from "react";
import moment from "moment";

//le pasamos nuestra cuenta actual, nuestros movimientos, todas las cuentas, y el setAccount que se utiliza para establecer la cuenta que ha iniciado sesion
function Transfers({ currentAccount, movements, accounts, setAccount }) {
  //utilizamos useRef para obtener los valores de los inputs

  const transferRef = useRef();
  const amountRef = useRef();

  //creamos la funcion para hacer el push de la cantidad a los movimientos de la cuenta que indiquemos y la cantidad, con el formato tipo objeto que necesitamos
  const addMovement = (account, amount) => {
    const newMovement = {
      date: moment().format("DD/MM/YYYY"), // Fecha de hoy
      value: amount, // Cantidad pasada como parámetro
    };

    account.movements.push(newMovement);
  };

  //defjnimos funcion que se ejecutara cuando se haga click a la flecha para hacer la transferencia

  const transfer = function (e) {
    e.preventDefault();

    // obtenemos la cuenta a la que hacemos la transferencia y la cantidad a transferir con useRef()

    const transferTo = transferRef.current.value;
    const amount = Number(amountRef.current.value);

    //luego verificamos si existe la cuenta, y si existe la guardamos en acc
    const acc = accounts.find((acc) => acc.username === transferTo);

    //si la cuenta existe, obtenemos nuestro balance, que seria un reduce que nos entrega el total de los movimientos

    if (acc) {
      const originBalance = movements.reduce(
        (total, movement) => total + movement.value,
        0
      );

      //si el balance sea mayor o igual a la cantidad a ingresar y si la cantidad ingresada es mayor a 0, se hace la transferencia, por lo que llamamos a la funcion addMovement
      //para hacer el push de la cantidad a los movimientos a acc y un push de la cantidad pero negativa a nuestros movimientos
      //y volvemos a establecer mediante el setAccount nuestra cuenta como la que ha iniciado sesion para que pueda actualizar nuestro balance

      if (originBalance >= amount && amount > 0) {
        addMovement(currentAccount, -amount);
        addMovement(acc, amount);
        setAccount(currentAccount);
        console.log("Acc",acc.movements, "currentAcc",currentAccount.movements);
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
