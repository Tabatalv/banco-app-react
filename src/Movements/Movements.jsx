import moment from "moment";
import "./Movements.css";

//obetenemos los movimientos que los llamaremos como rawMovements, sort para saber si los movimientos estan ordenados y sortDireccion para saber si los movimientos estan ordenados de mayor a menor o viceversa
const Movements = ({
  movements: rawMovements,
  sort,
  setAccount,
  currentAccount,
}) => {
  //funcion para devolver un objeto con los movimientos y agregarle el tipo de movimiento
  const movements = rawMovements.map((movement) => ({
    ...movement,
    type: movement.value < 0 ? "withdrawal" : "deposit",
  }));

//obtenemos los movimientos ordenados de mayor a menor
  const sortedMovements2 = [...movements]
    .map((movement) => ({
      ...movement,
      date : moment(movement.date, "DD/MM/YYYY")
  }))
    .sort((a, b) =>
      sort ? (a.date).diff(b.date) : (b.date).diff(a.date)
    );


  //si sort es true (se ha presionado el boton para ordenar los movimientos) se establece el setAccount con la cuenta actual 
  if (sort) {
    setAccount(currentAccount);
  }
  return (
    //mostramos los movimientos
    <div className="movements">
      {sortedMovements2.map((movement, index) => (
        <div key={index} className="movements__row">
           <div className={`movements__type movements__type--${movement.type}`}>
            {movement.type === "deposit" ? "Deposit" : "Withdrawal"}
          </div>
          <div className="movements__date">{movement.date.fromNow()}</div> 
          <div className="movements__value">{movement.value}</div>
        </div>
      ))}
    </div>
  );
};
export default Movements;
