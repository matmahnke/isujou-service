import React from "react";

import GlobalNavbar from "../../../components/Navbars/GlobalNavbar.js";
import SimpleFooter from "../../../components/Footers/SimpleFooter.js";

import {
  Button,
  Card,
  CardHeader,
  CardImg,
  CardBody,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroup,
  Container,
  Row,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink
} from "reactstrap";

export default class Portfolio extends React.Component {
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
            <section className="section section-lg section-shaped pb-50">
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
                <Row className="row-grid">
                  <Col>
                    <h2 className="display-3 text-white">
                      Anúncios
                  </h2>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <FormGroup>
                      <InputGroup>
                        <Input placeholder="Filtrar" />
                        <InputGroupAddon addonType="append"><Button color="success">Pesquisar</Button></InputGroupAddon>
                      </InputGroup>
                    </FormGroup>
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

            <section className="section pt-4">
              <Container>
                <Row className="mb-5">
                  <Col>
                    <Button
                      color="primary"
                      href="/advert/new"
                    >
                      Criar um anúncio
                    </Button>
                  </Col>
                </Row>
                <Row className="mb-5">
                  <Col lg="4">
                    <Card className="shadow border-0">
                      <CardImg top src="https://s2.glbimg.com/kmbgBzKPL0URISIQenPiAKo4ORI=/e.glbimg.com/og/ed/f/original/2017/08/23/5c147f01-dff6-4952-98a0-9394c88361c2.jpg" />
                      <CardHeader>Casa no centro</CardHeader>
                      <CardBody>
                        <p>
                          <i className="fa fa-calendar"></i> 01/05/2020
                        </p>
                        <p className="description">
                          Empregados domésticos se cadastram e se disponibilizam a realizar a limpeza de estabelecimentos ou são solicitados por outros usuários.
                        </p>
                        <Button
                          color="primary"
                          href="/advert/view/1"
                        >
                          Detalhes
                        </Button>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg="4">
                    <Card className="shadow border-0">
                      <CardImg top src="https://s2.glbimg.com/kmbgBzKPL0URISIQenPiAKo4ORI=/e.glbimg.com/og/ed/f/original/2017/08/23/5c147f01-dff6-4952-98a0-9394c88361c2.jpg" />
                      <CardHeader>Casa no centro</CardHeader>
                      <CardBody>
                        <p>
                          <i className="fa fa-calendar"></i> 01/05/2020
                        </p>
                        <p className="description">
                          Empregados domésticos se cadastram e se disponibilizam a realizar a limpeza de estabelecimentos ou são solicitados por outros usuários.
                        </p>
                        <Button
                          color="primary"
                          href="/advert/view/1"
                        >
                          Detalhes
                        </Button>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg="4">
                    <Card className="shadow border-0">
                      <CardImg top src="https://s2.glbimg.com/kmbgBzKPL0URISIQenPiAKo4ORI=/e.glbimg.com/og/ed/f/original/2017/08/23/5c147f01-dff6-4952-98a0-9394c88361c2.jpg" />
                      <CardHeader>Casa no centro</CardHeader>
                      <CardBody>
                        <p>
                          <i className="fa fa-calendar"></i> 01/05/2020
                        </p>
                        <p className="description">
                          Empregados domésticos se cadastram e se disponibilizam a realizar a limpeza de estabelecimentos ou são solicitados por outros usuários.
                        </p>
                        <Button
                          color="primary"
                          href="/advert/view/1"
                        >
                          Detalhes
                        </Button>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
                <Row>
                  <Col lg="4">
                    <Card className="shadow border-0">
                      <CardImg top src="https://s2.glbimg.com/kmbgBzKPL0URISIQenPiAKo4ORI=/e.glbimg.com/og/ed/f/original/2017/08/23/5c147f01-dff6-4952-98a0-9394c88361c2.jpg" />
                      <CardHeader>Casa no centro</CardHeader>
                      <CardBody>
                        <p>
                          <i className="fa fa-calendar"></i> 01/05/2020
                        </p>
                        <p className="description">
                          Empregados domésticos se cadastram e se disponibilizam a realizar a limpeza de estabelecimentos ou são solicitados por outros usuários.
                        </p>
                        <Button
                          color="primary"
                          href="/advert/view/1"
                        >
                          Detalhes
                        </Button>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg="4">
                    <Card className="shadow border-0">
                      <CardImg top src="https://s2.glbimg.com/kmbgBzKPL0URISIQenPiAKo4ORI=/e.glbimg.com/og/ed/f/original/2017/08/23/5c147f01-dff6-4952-98a0-9394c88361c2.jpg" />
                      <CardHeader>Casa no centro</CardHeader>
                      <CardBody>
                        <p>
                          <i className="fa fa-calendar"></i> 01/05/2020
                        </p>
                        <p className="description">
                          Empregados domésticos se cadastram e se disponibilizam a realizar a limpeza de estabelecimentos ou são solicitados por outros usuários.
                        </p>
                        <Button
                          color="primary"
                          href="/advert/view/1"
                        >
                          Detalhes
                        </Button>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg="4">
                    <Card className="shadow border-0">
                      <CardImg top src="https://s2.glbimg.com/kmbgBzKPL0URISIQenPiAKo4ORI=/e.glbimg.com/og/ed/f/original/2017/08/23/5c147f01-dff6-4952-98a0-9394c88361c2.jpg" />
                      <CardHeader>Casa no centro</CardHeader>
                      <CardBody>
                        <p>
                          <i className="fa fa-calendar"></i> 01/05/2020
                        </p>
                        <p className="description">
                          Empregados domésticos se cadastram e se disponibilizam a realizar a limpeza de estabelecimentos ou são solicitados por outros usuários.
                        </p>
                        <Button
                          color="primary"
                          href="/advert/view/1"
                        >
                          Detalhes
                        </Button>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Container>
            </section>

            <Container>
              <Pagination className="mb-6 float-right">
                <PaginationItem>
                  <PaginationLink
                    aria-label="Previous"
                    onClick={e => e.preventDefault()}
                    disabled
                  >
                    <i className="fa fa-angle-left" />
                    <span className="sr-only">Previous</span>
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem className="active">
                  <PaginationLink onClick={e => e.preventDefault()}>
                    1
              </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink onClick={e => e.preventDefault()}>
                    2
              </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink onClick={e => e.preventDefault()}>
                    3
              </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    aria-label="Next"
                    onClick={e => e.preventDefault()}
                  >
                    <i className="fa fa-angle-right" />
                    <span className="sr-only">Next</span>
                  </PaginationLink>
                </PaginationItem>
              </Pagination>
            </Container>
          </div>
        </main>
        <SimpleFooter />
      </>
    );
  }
}