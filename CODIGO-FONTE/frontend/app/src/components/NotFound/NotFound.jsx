import React from 'react'

import { Button } from 'reactstrap'

import './NotFound.css'

const NotFound = () => 
  <>
    <div className="centralizado">
      <h2 className="shrug">¯\_(ツ)_/¯</h2>
      <span className="rounded-circle img-center"/>
      <h1>404</h1>
      <br/>
      <br/>
      <h3>Página não encontrada.</h3>
      <br/>
      <Button color="default" type="button" href="/">
        Início
      </Button>
    </div>
  </>

export default NotFound;