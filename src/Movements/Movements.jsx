import { useEffect, useState } from "react";
import "./Movements.css";
import moment from "moment";

const Movements = ({ movements: rawMovements }) => {
  const [movements, setMovements] = useState([]);
  
  useEffect(() => {
    
    const firstMovements = rawMovements.map((movement) => {
      const randomDays = Math.floor(Math.random() * 10) + 1;
      const date = moment().subtract(randomDays, "days")

      return {
        value: movement,
        type: movement < 0 ? "withdrawal" : "deposit",
        date: date,
        dateFormatted: date.fromNow(),
        
      };
    });
    setMovements(firstMovements);
  }, [rawMovements]);

  const sortedMovements = movements.sort((a,b) => b.date - a.date)
  

  return (
    <div className="movements">
      {sortedMovements.map((movement, index) => (
        <div key={index} className="movements__row">
          <div className={`movements__type movements__type--${movement.type}`}>
            {movement.type === "deposit" ? "Deposit" : "Withdrawal"}
          </div>
          <div className="movements__date">{movement.dateFormatted}</div>
          <div className="movements__value">{movement.value}</div>
        </div>
      ))}
    </div>
  );
};

export default Movements;
