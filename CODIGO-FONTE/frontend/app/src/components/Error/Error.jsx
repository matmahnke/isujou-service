import React from 'react';

import { Button, Row } from 'reactstrap'

import './Error.css'

const Error = (props) => {
  const realizarLogout = () => { localStorage.removeItem('Authorization'); }
  const montarMensagemErro = (error) => {
    let msg = 'Aconteceu um problema.'

    var data = error?.response?.data

    if (data) {
      if (typeof data === 'string')
        msg = data
      else
        console.log(data)
    }

    return msg
  }

  const { error } = props

  return (
    <>
      <div className="centered-block" hidden={error === null}>
        <div>
          <Row className="no-flex">
            <span className="circle rounded-circle">
              <h1 className="text-dar-red">{error?.response?.status ?? "(T_T)"}</h1>
            </span>
          </Row>
          <Row className="no-flex my-5">
            <h3 className="text-dar-red">{montarMensagemErro(error)}</h3>
          </Row>
          <Row className="no-flex">
            <Button color="light" type="button" href="/">
              Início
          </Button>
            <Button color="danger" type="button" onClick={realizarLogout} href="/login" hidden={error?.response?.status !== 401}>
              Realizar login
          </Button>
          </Row>
        </div>
      </div>
    </>
  )
}

export default Error;