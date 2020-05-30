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
  Col
} from "reactstrap";

export default class Portfolio extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      adverts: []
    }
  }

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;

    this.listarAnuncios()
  }

  listarAnuncios() {
    let adverts = [];

    // vai fazer a requisicao ao invés do for fixo
    for (var i = 1; i <= 5; i++)
      adverts.push({ id: i, title: 'Casa no centro', date: '0' + i + '/05/2020', location: 'Blumenau, SC', photoUrl: 'https://s2.glbimg.com/kmbgBzKPL0URISIQenPiAKo4ORI=/e.glbimg.com/og/ed/f/original/2017/08/23/5c147f01-dff6-4952-98a0-9394c88361c2.jpg' });

    this.setState({ adverts })

    console.log(this.state.adverts)
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
                  {this.state.adverts.map(advert =>
                    <Col lg={4} className="mb-5">
                      <Card className="shadow border-0">
                        <CardImg top src={advert.photoUrl} />
                        <CardHeader>{advert.title}</CardHeader>
                        <CardBody>
                          <p>
                            {advert.date}, em {advert.location}
                          </p>
                          <Button
                            color="primary"
                            href={"/advert/view/" + advert.id}
                          >
                            Detalhes
                          </Button>
                        </CardBody>
                      </Card>
                    </Col>
                  )}
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