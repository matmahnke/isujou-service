import React from 'react';

import { Button } from "reactstrap";

import './InternalError.css';

const InternalError = () => 
  <>
    <div className="centralizado">
      <h2 className="shrug">（πーπ）</h2>
      <span className="rounded-circle img-center"/>
      <h1 className="color-red">500</h1>
      <br/>
      <br/>
      <h3>Aconteceu um problema.</h3>
      <br/>
      <Button color="default" type="button" href="/">
        Início
      </Button>
    </div>
  </>

export default InternalError;