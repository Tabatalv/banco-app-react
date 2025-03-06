import './Summary.css'


//obtenemos los movimientos de nuestra cuenta
function Summary({movements, setSort, sortDireccion, setSortDireccion}){
 
//obtenmos los movimientos positivos y con un reduce lo sumamos para obtener el total de los ingresos
  const sumIn = movements.filter(movement => movement.value > 0).reduce((total, movement) => total + movement.value, 0)
  const totalIn = `${sumIn.toFixed(2)}€`

  // obtenmos los movimientos negativos y con un reduce lo sumamos para obtener el total de los egresos
  const sumOut = movements.filter(movement => movement.value < 0).reduce((total, movement) => total + movement.value, 0)
  const totalOut = `${sumOut.toFixed(2)}€`

  //obtenemos el total de los movimientos positivos y lo multiplicamos por el 0.5 para obtener el interes
  const interest = sumIn * 0.5+"€"

  function handleSort(e){
    e.preventDefault()
    setSort(true)
    setSortDireccion(sortDireccion === "asc" ? "desc": "asc")
    console.log("sorted")

  }
    return (
        <div className="summary">
        <p className="summary__label">In</p>
        <p className="summary__value summary__value--in">{totalIn}€</p>
        <p className="summary__label">Out</p>
        <p className="summary__value summary__value--out">{totalOut}€</p>
        <p className="summary__label">Interest</p>
        <p className="summary__value summary__value--interest">{interest}</p>
        <button className="btn--sort" onClick={handleSort}>SORT</button>
      </div>
    )
}

export default Summary