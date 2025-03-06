import moment from "moment";
import "./Movements.css";

const Movements = ({ movements: rawMovements, sort, setAccount, currentAccount, sortDireccion }) => {
  const movements = rawMovements.map((movement) => {
    // const randomDays = Math.floor(Math.random() * 10) + 1;
    // const date = moment().subtract(randomDays, "days");
    
    return {
      value: movement.value,
      type: movement < 0 ? "withdrawal" : "deposit",
      date: movement.date,
      // dateFormatted: date.fromNow(),
    }; 
    
  })
  let newMovements = movements

  const sortedMovements = [...movements].sort((a, b) => {
    const dateA = moment(a.date, 'DD/MM/YYYY');
    const dateB = moment(b.date, 'DD/MM/YYYY');

    if(sortDireccion === "asc"){
       return dateA.diff(dateB) // Ordenar de más reciente a más antiguo
    }
    else{
      
      return dateB.diff(dateA);
    }
   
  });
  

  if (sort) {
    setAccount(currentAccount)
    newMovements = sortedMovements
  }
  return (

    
    <div className="movements">
      {newMovements.map((movement, index) => (
        <div key={index} className="movements__row">
          <div className={`movements__type movements__type--${movement.type}`}>
            {movement.type === "deposit" ? "Deposit" : "Withdrawal"}
          </div>
          <div className="movements__date">{movement.date}</div>
          <div className="movements__value">{movement.value}</div>
        </div>
      ))}
    </div>
  );
};
export default Movements;