import React from 'react';

import { Button, Row } from 'reactstrap'

import './Error.css';

const Error = (props) => {
  const realizarLogout = () => { localStorage.removeItem('Authorization'); }

  return (<>
    <div className="centered-block" hidden={props.error === null}>
      <div>
        <Row className="no-flex">
          <span className="circle rounded-circle">
            <h1 className="text-dar-red">{props.error?.status ?? "):"}</h1>
          </span>
        </Row>
        <Row className="no-flex my-5">
          <h3 className="text-dar-red">{props.error?.message ?? 'Aconteceu um problema'}</h3>
        </Row>
        <Row className="no-flex">
          <Button color="light" type="button" href="/">
            Início
          </Button>
          <Button color="danger" type="button" onClick={realizarLogout} href="/login" hidden={props.error?.showLogin === false}>
            Realizar login
          </Button>
        </Row>
      </div>
    </div>
  </>)
}

export default Error;