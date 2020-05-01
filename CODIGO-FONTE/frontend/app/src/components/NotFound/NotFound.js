import React from 'react';

import { Button } from "reactstrap";

import './NotFound.css';

const NotFound = () => 
  <>
    <div className="centralizado">
      <h1>404</h1>
      <h3>Ah não! Página não encontrada.</h3>
      <br/>
      <Button color="default" type="button" href="/">
        Início
      </Button>
    </div>
  </>

export default NotFound;