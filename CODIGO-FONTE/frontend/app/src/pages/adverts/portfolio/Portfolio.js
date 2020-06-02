import React from 'react'

import GlobalNavbar from '../../../components/Navbars/GlobalNavbar.js'
import SimpleFooter from '../../../components/Footers/SimpleFooter.js'
import api from '../../../services/api'
import Resources from '../../../store/Resources.js'
import Loading from '../../../components/Loading/Loading.js'

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
      adverts: [],
      loading: false
    }
  }

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;

    this.listarAnuncios()
  }

  listarAnuncios() {
    let adverts = [];

    this.setState({ loading: true })
    api.get('/advert')
      .then(resp => {
        const { data } = resp;
        if (data) {
          for (var i = 0; i < data.length; i++) {
            const current = data[i]
            adverts.push({ id: current.id, title: current.property.title, date: new Date(current.date), location: current.property.city + ', ' + Resources.GetBrazilianStates()[current.property.state - 1].description, photoUrl: '' })
          }
        }
      })
      .catch((ex) => {
        this.setState({ loading: false })
      })
      .finally(() => {
        this.setState({ adverts, loading: false })
      })
  }

  formatarData(date) {
    const dataNormal = date.toISOString();

    return dataNormal.substring(8, 10) + '/' + dataNormal.substring(5, 6) + '/' + dataNormal.substring(0, 4)
  }

  render() {
    return (
      <>
      <Loading hidden={!this.state.loading}/>
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
                <Row hidden>
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
                            {this.formatarData(advert.date)}, em {advert.location}
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