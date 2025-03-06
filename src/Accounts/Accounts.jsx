import { faker } from '@faker-js/faker';
import moment from 'moment';


const generateRandomMovements = (count) => {
    return Array.from({ length: count }, () => {
      const randomDays = Math.floor(Math.random() * 5000) + 1; // Rango de días para fechas aleatorias
      const date = moment().subtract(randomDays, "days").format('DD/MM/YYYY');
      const value = Number(faker.number.bigInt({ min: 100, max: 9000 })) // Valores entre 100 y 9000
      return { date, value };
    });
  };
  

const account1 = {
    owner: 'Juan Sánchez',
    movements: generateRandomMovements(7),
    interestRate: 1.2, // %
    pin: 1111,
  }
  
  const account2 = {
    owner: 'María Portazgo',
    movements: generateRandomMovements(6),
    interestRate: 1.5,
    pin: 2222,
  }
  
  const account3 = {
    owner: 'Estefanía Pueyo',
    movements: generateRandomMovements(9),
    interestRate: 0.7,
    pin: 3333,
  }
  
  const account4 = {
    owner: 'Javier Rodríguez',
    movements: generateRandomMovements(4),
    interestRate: 1,
    pin: 4444,
  }



  const account5 = {
    owner: 'Javier Cortez',
    movements: generateRandomMovements(7),
    interestRate: 1,
    pin: 2323,
  }
  
  const accounts = [account1, account2, account3, account4, account5]

  //Creamos las cuentas con datos aleatorios mediante la libreria Faker.js
   function createAccount() {

    const randomNumber = Math.floor(Math.random() * 10) + 1;
    const owner = faker.person.fullName()
    const movements = generateRandomMovements(randomNumber)
    const interestRate = Number(faker.number.bigInt({min:0, max:2, precision: 0.1}))
    const pin = Number(faker.number.bigInt({ min: 1000, max: 9999 }))
    const dates = Array.from({ length: randomNumber }, () => moment(faker.date.past(1)).fromNow());
    return {owner, movements, interestRate, pin, dates}
  
  }
  
  //Creamos n cuentas según le especifiquemos y las añadimos a nuestro array con las 4 cuentas ya establecidas para poder probar el banco
  function createAccounts(n){
    for (let i = 0; i < n; i++) {
      accounts.push(createAccount())
    }
    return accounts
  }
 
  
  //creamos 5 cuentas o el numero que le indiquemos
  createAccounts(5)

  
  //Creamos usernames para cada cuenta de accounts, que son las iniciales del owner y con las que accederemos en el login
  const createUsernames = function (accounts) {
    accounts.forEach(function (account) {
      account.username = account.owner // Juan Sánchez
        .toLowerCase() // juan sánchez
        .split(' ') // ['juan', 'sánchez']
        .map((name) => name[0]) // ['j', 's']
        .join('') // js (lo contrario que split)
    })
  }
  createUsernames(accounts)

  









  export default accounts