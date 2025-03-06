import { useEffect, useState } from "react";
import "./Movements.css";
import moment from "moment";

const Movements = ({ movements: rawMovements, sort, setAccount, currentAccount}) => { //definimos movements como rawMovements
  const [movements, setMovements] = useState([]);
  
  

    //cada vez que detecte un cambio en rawMovements, se ejecutara la funcio firstMovements, que almacenara los datos de los movimientos en un array de objetos
   
      // generamos fechas aleatorias mediante la libreria moment.js, primero definimos un numero random entre 1 y 10 y luego restamos ese numero a la fecha actual
    
      //alamacenamos los datos de los movimientos en un array de objetos, creamos un nuevo dato, dateFormatted, con el date.fromNow() 
      // para poder mostrar la fecha formateada y ordenar los movimientos en funcion de la fecha
  
      const firstMovements = rawMovements.map(movement => {
      const randomDays = Math.floor(Math.random() * 10) + 1
      const date = moment().subtract(randomDays, 'days').fromNow();
      
      const dateFormatted = moment().subtract(randomDays, "days");
    
      return {
        value: movement,
        type: movement < 0 ? 'withdrawal' : 'deposit',
        date: date,
        dateFormatted: dateFormatted.fromNow(),
      }
        
      })
    setMovements(firstMovements);
    }

  
  //ordenamos los movimientos en funcion de la fecha
  const sortedMovements = [...movements].sort((a,b) => b.date - a.date)

  

  if(sort) setAccount(currentAccount)
  
 

return (
  <div className="movements">

    {sort ? (
      sortedMovements.map((movement, index) => (
        <div key={index} className="movements__row">
          <div className={`movements__type movements__type--${movement.type}`}>
            {movement.type === "deposit" ? "Deposit" : "Withdrawal"}
          </div>
          <div className="movements__date">{movement.dateFormatted}</div>
          <div className="movements__value">{movement.value}</div>
        </div>
      ))
    ) : (
  
      movements.map((movement, index) => (
        <div key={index} className="movements__row">
          <div className={`movements__type movements__type--${movement.type}`}>
            {movement.type === "deposit" ? "Deposit" : "Withdrawal"}
          </div>
          <div className="movements__date">{movement.date}</div>
          <div className="movements__value">{movement.value}</div>
        </div>
      ))
    )}
  </div>
);
}

export default Movements;
