import React, { useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import accounts from '../Accounts/Accounts';

//Nos traemos la funcion de handleLogin, para poder abrir la cuenta, por lo que obtenemos los datos de el username y pin mediante el useRef

function Login({ onLogin }) {
  const userRef = useRef();
  const pinRef = useRef();

  //Definimos la funcion para que se ejecute cuando le demos click, evitamos que se envíe el formulario y obtenemos los valores del user y pin y se lo pasamos al OnLogin
  const handleLogin = (e) => {
    e.preventDefault();
    const user = userRef.current.value;
    const pin = pinRef.current.value;
    onLogin(user, pin);
    
  };
  return (
    <Form className="d-flex align-items-center gap-2" onSubmit={handleLogin}>
      <Form.Group>
        <Form.Control
          type="text"
          size="sm"
          className="rounded-pill"
          placeholder="user"
          ref={userRef}
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="password"
          size="sm"
          className="rounded-pill"
          placeholder="PIN"
          maxLength="4"
          ref={pinRef}
        />
      </Form.Group>
      <Button
        variant="outline-secondary"
        type="submit"
        className="rounded-circle"
        size="sm"
      >
        →
      </Button>
    </Form>
  );
}
export default Login;