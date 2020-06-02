import React from 'react'

import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Row,
  UncontrolledCarousel
} from 'reactstrap'

import GlobalNavbar from '../../../components/Navbars/GlobalNavbar.js'
import SimpleFooter from '../../../components/Footers/SimpleFooter.js'
import Loading from '../../../components/Loading/Loading.js'
import api from '../../../services/api'
import Utils from '../../../store/Utils.js'
import Resources from '../../../store/Resources.js'

import './Advert.css';

class Advert extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      title: '',
      date: null,
      location: '',
      objectives: [],
      photos: [],
      ownerId: null,
      ownerName: '',
      ownerPhotoUrl: '',
      loading: false
    }
  }

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;

    if (this.props.match.params?.id) {
      const id = this.props.match.params.id
      let isValidId = !isNaN(id);

      if (!isValidId) {
        console.log('Mostrar o erro que o id passado é inválido')
      }
      else {
        this.setState({ loading: true })
        api.get('/advert/' + id)
          .then(resp => {
            const { data } = resp;
            console.log(data)
            if (data) {
              console.log(data)
              var model = {
                id: data.id,
                title: data.property.title,
                date: data.date,
                location: data.property.city + ', ' + Resources.GetBrazilianStates()[data.property.state - 1].description,
                objectives: data.items ?? [],
                photos: [],
                ownerId: data.ownerId,
                ownerName: data.creator?.UserInfo.Name ?? 'Proprietário',
                ownerPhotoUrl: data.creator?.UserInfo ?? require("../../../assets/img/icons/1.jpg")
              }
              this.setState(model)
            }
          })
          .catch((ex) => {
            console.log(ex)
          })
          .finally(() => {
            this.setState({ loading: false })
          })
      }
    }
  }

  montarListaFotos() {
    let fotos = []

    for (var i = 0; i < this.state.photos.length; i++)
      fotos.push({
        src: this.state.photos[i], altText: '',
        caption: '',
        header: ''
      })

    return fotos
  }

  render() {
    return (
      <>
        <Loading hidden={!this.state.loading}/>
        <GlobalNavbar />
        <main ref="main">
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
          </section>

          <section className="section">
            <Container>
              <Card className="card-profile shadow mt--500">
                <div className="px-4 pt-2 pb-4">
                  <Row>
                    <UncontrolledCarousel items={this.montarListaFotos()} />
                  </Row>
                  <CardBody>
                    <Row className="mt-4">
                      <Col md={8}>
                        <Row>
                          <h2>
                            {this.state.title}
                          </h2>
                        </Row>
                        <Row className="my-2">
                          <Button size="sm" color="default" className="fa fa-calendar mr-2 width-30" /> <span className="mt-1">{Utils.formatarData(new Date(this.state.date))}</span>
                        </Row>
                        <Row className="my-2">
                          <Button size="sm" color="default" className="fa fa-map-marker mr-2 width-30" /> <span className="mt-1">{this.state.location}</span>
                        </Row>
                        <hr className="ml--3" />
                        <Row>
                          <h4>Objetivos</h4>
                        </Row>
                        <Row>
                          <Col className="ml--3">
                            <ListGroup>
                              {this.state.objectives.map(obj => <ListGroupItem key={obj}>{obj}</ListGroupItem>)}
                            </ListGroup>
                          </Col>
                        </Row>
                      </Col>
                      <Col md={4} className="border-left-when-big">
                        <Row className="justify-content-center">
                          <img
                            alt="..."
                            width="150px"
                            className="rounded-circle"
                            src={this.state.ownerPhotoUrl}
                          />
                        </Row>
                        <Row className="justify-content-center mt-2">
                          <h3>
                            {this.state.ownerName}
                          </h3>
                        </Row>
                        <Row className="justify-content-center">
                          <Button
                            color="default"
                            size="sm"
                            href={"/profile/" + this.state.ownerId}
                          >
                            Ver perfil
                        </Button>
                        </Row>
                      </Col>
                    </Row>
                  </CardBody>
                  <Row className="justify-content-center">
                    <Button
                      color="default"
                      href={"/proposal/new/" + this.state.id}
                    >
                      Fazer proposta
                    </Button>
                  </Row>
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

export default Advert;
