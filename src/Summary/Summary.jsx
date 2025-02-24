import './Summary.css'

function Summary(){
  const totalDeposits = 5000
  const totalWithdrawals = 378

    return (
        <div className="summary">
        <p className="summary__label">In</p>
        <p className="summary__value summary__value--in">{totalDeposits}€</p>
        <p className="summary__label">Out</p>
        <p className="summary__value summary__value--out">{totalWithdrawals}€</p>
        <p className="summary__label">Interest</p>
        <p className="summary__value summary__value--interest">0000€</p>
        <button className="btn--sort">&downarrow; SORT</button>
      </div>
    )
}

export default Summary