import React from "react";

import GlobalNavbar from "../../components/Navbars/GlobalNavbar.js";
import SimpleFooter from "../../components/Footers/SimpleFooter.js";

import {
  Button,
  Card,
  CardBody,
  CardImg,
  Container,
  Row,
  Col
} from "reactstrap";

class Home extends React.Component {
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }
  render() {
    return (
      <>
        <GlobalNavbar />
        <main ref="main">
          <div className="position-relative">
            <section className="section section-lg section-shaped pb-250">
              <div className="shape shape-style-1 bg-gradient-default">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <br />
              <Container>
                <Row className="row-grid justify-content-center">
                  <Col className="text-center" lg="8">
                    <h2 className="display-3 text-white">
                      Precisando de uma limpeza?
                      <span className="text-success">
                        Nós temos a solução!
                      </span>
                    </h2>
                    <p className="lead text-white">
                      O iSujou é um portal que realiza o encontro entre profissionais autônomos de limpeza e proprietários de imóveis. Ajudamos faxineiras e faxineiros a encontrar clientes e pessoas que precisam daquela ajudinha e limpar.
                    </p>
                    <div className="btn-wrapper">
                      <Button
                        className="mb-3 mb-sm-0"
                        color="primary"
                        href="/adverts"
                      >
                        Conferir anúncios
                      </Button>
                      <br/>
                    </div>
                  </Col>
                </Row>
              </Container>

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

            <section className="section section-lg pt-lg-0 mt--200">
              <Container>
                <Row className="justify-content-center">
                  <Col lg="12">
                    <Row className="row-grid">
                      <Col lg="4">
                        <Card className="shadow border-0">
                          <CardBody className="py-5">
                            <center>
                              <div className="icon icon-shape icon-shape-success rounded-circle mb-4">
                                <i className="fa fa-user-o" />
                              </div>
                              <h6 className="text-success text-uppercase">
                                Foco no funcionário
                              </h6>
                              <p className="description mt-3">
                                Empregados domésticos se cadastram e se disponibilizam a realizar a limpeza de estabelecimentos ou são solicitados por outros usuários.
                              </p>
                            </center>
                          </CardBody>
                        </Card>
                      </Col>
                      <Col lg="4">
                        <Card className="shadow border-0">
                          <CardBody className="py-5">
                            <center>
                              <div className="icon icon-shape icon-shape-success rounded-circle mb-4">
                                <i className="fa fa-id-card-o" />
                              </div>
                              <h6 className="text-success text-uppercase">
                                Perfil de carreira
                              </h6>
                              <p className="description mt-3">
                                Mostra os dados, conquistas e pontuação dos empregados domésticos, baseado em um sistema de pontuação que avalia confiança e qualidade do serviço.
                              </p>
                            </center>
                          </CardBody>
                        </Card>
                      </Col>
                      <Col lg="4">
                        <Card className="shadow border-0">
                          <CardBody className="py-5">
                            <center>
                              <div className="icon icon-shape icon-shape-success rounded-circle mb-4">
                                <i className="ni ni-pin-3" />
                              </div>
                              <h6 className="text-success text-uppercase">
                                Localidade
                              </h6>
                              <p className="description mt-3">
                                Os estabelecimentos são selecionados pelo que o usuário deseja, facilitando o encontro e locomoção, além de ajudar a economizar em transporte.
                              </p>
                            </center>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Container>
            </section>

            <section className="section">
              <Container>
                <Row className="row-grid align-items-center">
                  <Col md="6">
                    <Card className="bg-default shadow border-0">
                      <CardImg
                        alt="..."
                        src={require("../../assets/img/casa.jpg")}
                        top
                      />
                      <blockquote className="card-blockquote">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="svg-bg"
                          preserveAspectRatio="none"
                          viewBox="0 0 583 95"
                        >
                          <polygon
                            className="fill-default"
                            points="0,52 583,95 0,95"
                          />
                          <polygon
                            className="fill-default"
                            opacity=".2"
                            points="0,42 583,95 683,0 0,95"
                          />
                        </svg>
                        <h4 className="display-3 font-weight-bold text-white">
                          Casa no centro
                        </h4>
                        <p className="lead text-italic text-white">
                          Casa com três quartos, dois banheiros e uma área de festa.
                          <ul>
                            <li>Arrumar as camas</li>
                            <li>Varrer o chão</li>
                            <li>Limpar as janelas</li>
                          </ul>
                        </p>
                      </blockquote>
                    </Card>
                  </Col>
                  <Col md="6">
                    <div className="pl-md-5">
                      <div className="icon icon-lg icon-shape icon-shape-success shadow rounded-circle mb-5">
                        <i className="fa fa-question" />
                      </div>
                      <h3>Como funciona?</h3>
                      <p className="lead">
                        O foco é do empregado doméstico.
                      </p>
                      <p>
                        Os proprietários de imóveis cadastram seus estabelecimentos, dando uma breve descrição sobre ele e enviam algumas fotos. Após isso, até cinco objetivos são dados e o prazo para que eles sejam cumpridos.
                      </p>
                      <p>
                        Em seguida, um anúncio é criado mostrando tudo que o proprietário solicita. Desta forma, os empregados domésticos podem se candidatar a limpar o estabelecimento e negociar com o prorpietário preços.
                      </p>
                      <a
                        className="font-weight-bold text-success mt-5"
                        href="/rules"
                      >
                        Entenda mais sobre o processo
                      </a>
                    </div>
                  </Col>
                </Row>
              </Container>
            </section>

            <section className="section section-lg bg-secondary">
              <Container>
                <Row className="justify-content-center text-center mb-lg">
                  <Col lg="8">
                    <h2 className="display-3">Relatos</h2>
                    <p>
                      Alguns comentários sobre quem participou e recomenda!
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col className="mb-5 mb-lg-0" lg="3" md="6">
                    <div className="px-4">
                      <img
                        alt="..."
                        className="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                        src={require("../../assets/img/icons/1.jpg")}
                        style={{ width: "200px" }}
                      />
                      <div className="pt-4 text-center">
                        <h5 className="title">
                          <span className="d-block mb-1">Calvin Harris</span>
                        </h5>
                        <div className="mt-3">
                          <p>"Limpou foi tudo! Precisava urgente de uma limpeza e achei a solução aqui."</p>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col className="mb-5 mb-lg-0" lg="3" md="6">
                    <div className="px-4">
                      <img
                        alt="..."
                        className="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                        src={require("../../assets/img/icons/2.jpg")}
                        style={{ width: "200px" }}
                      />
                      <div className="pt-4 text-center">
                        <h5 className="title">
                          <span className="d-block mb-1">Anitta</span>
                        </h5>
                        <div className="mt-3">
                          <p>"A pessoa que veio conseguiu tirar a mancha do meu tapete, achei demais!"</p>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col className="mb-5 mb-lg-0" lg="3" md="6">
                    <div className="px-4">
                      <img
                        alt="..."
                        className="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                        src={require("../../assets/img/icons/3.jpg")}
                        style={{ width: "200px" }}
                      />
                      <div className="pt-4 text-center">
                        <h5 className="title">
                          <span className="d-block mb-1">Sunmi</span>
                        </h5>
                        <div className="mt-3">
                          <p>"Agendei uma limpeza para o dia após uma festa que dei aqui em casa, ajudou bastante."</p>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col className="mb-5 mb-lg-0" lg="3" md="6">
                    <div className="px-4">
                      <img
                        alt="..."
                        className="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                        src={require("../../assets/img/icons/4.jpg")}
                        style={{ width: "200px" }}
                      />
                      <div className="pt-4 text-center">
                        <h5 className="title">
                          <span className="d-block mb-1">Zendaya</span>
                        </h5>
                        <div className="mt-3">
                          <p>Sensacional, através do site achei uma faxineira para limpart minha casa toda semana por um ótimo preço.</p>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
            </section>
          </div>
        </main>
        <SimpleFooter />
      </>
    );
  }
}

export default Home;
