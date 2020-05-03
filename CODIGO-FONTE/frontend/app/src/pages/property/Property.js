import React from "react";

import {
  Button,
  Card,
  Container,
  Row,
  Col,
  Table
} from "reactstrap";

import GlobalNavbar from "../../components/Navbars/GlobalNavbar.js";
import SimpleFooter from "../../components/Footers/SimpleFooter.js";

class Property extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      habilitarCampos: false
    }
  }
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }
  obterTitulo() {
    var nome = this.props.type;

    if (nome == 'new') {
      nome = 'Novo imóvel'
      this.state.habilitarCampos = true
    }
    else if (nome == 'edit') {
      nome = 'Editar'
      this.state.habilitarCampos = true
    } else if (nome == 'view') {
      nome = 'Imóvel'
      this.state.habilitarCampos = false
    }

    return nome
  }
  render() {
    return (
      <>
        <GlobalNavbar />
        <main ref="main">
          <section className="section-minimum section-shaped my-0">
            {/* Circles background */}
            <div className="shape shape-style-1 bg-gradient-default">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
          </section>
          <section className="section">
            <Container className="card shadow px-4 pt-3">
              <h2>{this.obterTitulo()}</h2>
            </Container>
          </section>
        </main>
        <SimpleFooter />
      </>
    );
  }
}

export default Property;
