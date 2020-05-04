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

export default class Profile extends React.Component {
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }
  render() {
    return (
      <>
        <GlobalNavbar />
        <main className="profile-page" ref="main">
          <section className="section-profile-cover section-shaped my-0">
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
            {/* SVG separator */}
            <div className="separator separator-bottom separator-skew">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="fill-white"
                  points="2560 0 2560 100 0 100"
                />
              </svg>
            </div>
          </section>
          <section className="section">
            <Container>
              <Card className="card-profile shadow mt--400">
                <div className="px-4">
                  <Row className="justify-content-center">
                    <Col className="order-lg-2" lg="3">
                      <div className="card-profile-image">
                        <img
                          alt="..."
                          className="rounded-circle"
                          src={require("../../assets/img/icons/1.jpg")}
                        />
                      </div>
                    </Col>
                    <Col
                      className="order-lg-3 text-lg-right align-self-lg-center"
                      lg="4"
                    >
                      <div className="card-profile-actions py-4 mt-lg-0">
                        <Button
                          className="float-right"
                          color="default"
                          onClick={e => e.preventDefault()}
                          size="sm"
                        >
                          Mensagem
                        </Button>
                      </div>
                    </Col>
                    <Col className="order-lg-1" lg="4">
                      <div className="card-profile-stats d-flex justify-content-center">
                        <div>
                          <span className="heading">22</span>
                          <span className="description">Anúncios</span>
                        </div>
                        <div>
                          <span className="heading">10</span>
                          <span className="description">Conquistas</span>
                        </div>
                        <div>
                          <span className="heading">89</span>
                          <span className="description">Avaliações</span>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <div className="text-center mt-5">
                    <h3>
                      Calvin Harris
                    </h3>
                    <div className="h6 font-weight-300">
                      <i className="ni location_pin mr-2" />
                      Faxineiro na região de São Paulo (SP)
                    </div>
                  </div>
                  <div className="mt-5 py-5 border-top text-center">
                    <Row className="justify-content-center text-left">
                      <Col lg="9">
                        <p>
                          Trabalho na área há 15 anos, já fui funcionário de empresas de limpeza e atualmente sigo limpando casas de forma autonoma.
                          Gosto bastante de música, futebol e cerveja.
                        </p>
                      </Col>
                    </Row>
                  </div>
                  <div className="py-5 border-top text-center">
                    <Row className="justify-content-center text-left">
                      <Col lg="9">
                        <h4>
                          Conquistas
                        </h4>
                        <Table responsive>
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Table heading</th>
                              <th>Table heading</th>
                              <th>Table heading</th>
                              <th>Table heading</th>
                              <th>Table heading</th>
                              <th>Table heading</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1</td>
                              <td>Table cell</td>
                              <td>Table cell</td>
                              <td>Table cell</td>
                              <td>Table cell</td>
                              <td>Table cell</td>
                              <td>Table cell</td>
                            </tr>
                            <tr>
                              <td>2</td>
                              <td>Table cell</td>
                              <td>Table cell</td>
                              <td>Table cell</td>
                              <td>Table cell</td>
                              <td>Table cell</td>
                              <td>Table cell</td>
                            </tr>
                            <tr>
                              <td>3</td>
                              <td>Table cell</td>
                              <td>Table cell</td>
                              <td>Table cell</td>
                              <td>Table cell</td>
                              <td>Table cell</td>
                              <td>Table cell</td>
                            </tr>
                          </tbody>
                        </Table>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Card>
            </Container>
          </section>
        </main>
        <SimpleFooter />
      </>
    );
  }
}