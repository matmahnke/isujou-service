import React from "react";

import {
  Button,
  Container,
  Row,
  Table
} from "reactstrap";

import GlobalNavbar from "../../components/Navbars/GlobalNavbar.js";
import SimpleFooter from "../../components/Footers/SimpleFooter.js";

export default class Proposals extends React.Component {
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
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
              <Row className="pl-2">
                <h2>Minhas propostas</h2>
              </Row>
              <Row className="mt-4">
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Ações</th>
                      <th>Imóvel</th>
                      <th>Data</th>
                      <th>Hora</th>
                      <th>Situação</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <Button color="danger" size="sm" title="Cancelar"><i className="fa fa-ban"></i></Button>
                      </td>
                      <td>Casa no centro</td>
                      <td>05/05/2020</td>
                      <td>12:00</td>
                      <td>Aguardando</td>
                    </tr>
                    <tr>
                      <td>
                        <Button color="danger" size="sm" title="Cancelar"><i className="fa fa-ban"></i></Button>
                      </td>
                      <td>Casa no subúrbio</td>
                      <td>01/05/2020</td>
                      <td>09:00</td>
                      <td>Concluída</td>
                    </tr>
                    <tr>
                      <td>
                        <Button color="danger" size="sm" title="Cancelar" disabled><i className="fa fa-ban"></i></Button>
                      </td>
                      <td>Apartamento</td>
                      <td>05/12/2019</td>
                      <td>12:00</td>
                      <td>Cancelada</td>
                    </tr>
                  </tbody>
                </Table>
              </Row>
            </Container>
          </section>
        </main>
        <SimpleFooter />
      </>
    );
  }
}