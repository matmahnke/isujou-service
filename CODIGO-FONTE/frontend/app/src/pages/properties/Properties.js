import React from "react";

import {
  Button,
  Container,
  Row,
  Table
} from "reactstrap";

import GlobalNavbar from "../../components/Navbars/GlobalNavbar.js";
import SimpleFooter from "../../components/Footers/SimpleFooter.js";

export default class Properties extends React.Component {
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
                <h2>Imóveis</h2>
              </Row>
              <Row className="pl-2 mt-2">
                <Button color="primary" href="/property/new">Cadastrar</Button>
              </Row>
              <Row className="mt-4">
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Ações</th>
                      <th>Título</th>
                      <th>Estado</th>
                      <th>Cidade</th>
                      <th>Bairro</th>
                      <th>Ativo</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <Button color="primary" size="sm" title="Editar" href="/property/edit/1"><i className="fa fa-pencil"></i></Button>
                        <Button color="danger" size="sm" title="Excluir"><i className="fa fa-minus"></i></Button>
                      </td>
                      <td>Casa na praia</td>
                      <td>Santa Catarina</td>
                      <td>Itajaí</td>
                      <td>Meia Praia</td>
                      <td>
                        <div className="custom-control custom-checkbox">
                          <input
                            className="custom-control-input"
                            checked
                            disabled
                            type="checkbox"
                          />
                          <label className="custom-control-label" htmlFor="customCheck2" />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Button color="primary" size="sm" title="Editar" href="/property/edit/1"><i className="fa fa-pencil"></i></Button>
                        <Button color="danger" size="sm" title="Excluir"><i className="fa fa-minus"></i></Button>
                      </td>
                      <td>Apartamento</td>
                      <td>Santa Catarina</td>
                      <td>Blumenau</td>
                      <td>Victor Konder</td>
                      <td>
                        <div className="custom-control custom-checkbox">
                          <input
                            className="custom-control-input"
                            checked
                            disabled
                            type="checkbox"
                          />
                          <label className="custom-control-label" htmlFor="customCheck2" />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Button color="primary" size="sm" title="Editar" href="/property/edit/1"><i className="fa fa-pencil"></i></Button>
                        <Button color="danger" size="sm" title="Excluir"><i className="fa fa-minus"></i></Button>
                      </td>
                      <td>Chacrá</td>
                      <td>Santa Catarina</td>
                      <td>Blumenau</td>
                      <td>Vila Itoupava</td>
                      <td>
                        <div className="custom-control custom-checkbox">
                          <input
                            className="custom-control-input"
                            checked
                            disabled
                            type="checkbox"
                          />
                          <label className="custom-control-label" htmlFor="customCheck2" />
                        </div>
                      </td>
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