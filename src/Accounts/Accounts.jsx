import { faker } from '@faker-js/faker';
import moment from 'moment';

const account1 = {
    owner: 'Juan Sánchez',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
  }
  
  const account2 = {
    owner: 'María Portazgo',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
  }
  
  const account3 = {
    owner: 'Estefanía Pueyo',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
  }
  
  const account4 = {
    owner: 'Javier Rodríguez',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
  }



  const account5 = {
    owner: 'Javier Cortez',
    movements: [{date: '01/02/2012', value: 430} ,{date: '01/12/2012', value: 1000},{date: '01/08/2012', value: 700},{date: '17/10/2024', value: 50},{date: '05/12/2012', value: 90} ],
    interestRate: 1,
    pin: 2323,
  }
  
  const accounts = [account1, account2, account3, account4, account5, ...createAccounts(5)]

  //Creamos las cuentas con datos aleatorios mediante la libreria Faker.js
   function createAccount() {

    const randomNumber = Math.floor(Math.random() * 10) + 1;
    const owner = faker.person.fullName()
    const movements = Array.from({ length: randomNumber }, () => Number(faker.number.bigInt({ min: 100, max: 9000 })));
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


//   const generateRandomDates = (numDates) => {
    
  
//     // Generamos un array con fechas aleatorias
//     for (let i = 0; i < numDates; i++) {
//       const randomDate = faker.date.past(1); // Genera una fecha aleatoria en el último año
//       const formattedDate = moment(randomDate).fromNow(); // Formateamos la fecha a "X days ago"
//       accounts.push(formattedDate)
//     }
  
//     return accounts;
//   };
  
//   // Ejemplo de uso
// generateRandomDates(5); // Genera un array con 5 fechas aleatorias
  
 




  export default accounts