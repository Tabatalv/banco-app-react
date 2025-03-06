import { faker } from '@faker-js/faker';

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
  
  const accounts = [account1, account2, account3, account4]
   function createAccount() {

    const randomNumber = Math.floor(Math.random() * 10) + 1;
    const owner = faker.person.fullName()
    const movements = Array.from({ length: randomNumber }, () => Number(faker.number.bigInt({ min: 100, max: 9000 })));
    const interestRate = Number(faker.number.bigInt({min:0, max:2, precision: 0.1}))
    const pin = Number(faker.number.bigInt({ min: 1000, max: 9999 }))
    return {owner, movements, interestRate, pin}
  
  }
  
  
  function createAccounts(n){
    for (let i = 0; i < n; i++) {
      accounts.push(createAccount())
    }
    return accounts
  }
  
  //añado las cuentas creadas con faker dev a accounts
  createAccounts(5)

  
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


  //FAKER DEV
 




  export default accounts