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

import GlobalNavbar from '../../../components/Navbars/GlobalNavbar'
import SimpleFooter from '../../../components/Footers/SimpleFooter'
import Loading from '../../../components/Loading/Loading'
import api from '../../../services/api'
import Error from '../../../components/Error/Error'
import Resources from '../../../store/Resources'

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
      loading: false,
      error: null
    }
  }

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;

    if (this.props.match.params?.id) {
      const id = this.props.match.params.id
      let isValidId = !isNaN(id);

      if (!isValidId) {
        this.setState({ error: { response: { data: "Registro não encontrado.", status: 404 } } })
      }
      else {
        this.setState({ loading: true })
        api.get('/advert/' + id)
          .then(resp => {
            const { data } = resp;
            if (data) {
              var model = {
                id: data.id,
                title: data.title,
                date: data.formatedDate,
                location: data.city + ', ' + Resources.GetBrazilianStates()[data.state - 1].description,
                objectives: data.items?.length > 0 ? data.items.map(item => item.description) : [],
                photos: [],
                ownerId: data.ownerId,
                ownerName: data.ownerName,
                ownerPhotoUrl: data.ownerPhotoUrl?.length > 0 ? data.ownerPhotoUrl : require("../../../assets/img/icons/no-image.png")
              }
              this.setState(model)
            }
          })
          .catch((error) => {
            this.setState({ error })
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
        <Error error={this.state.error} />
        <Loading hidden={!this.state.loading} />
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
                          <Button size="sm" color="default" className="fa fa-calendar mr-2 width-30" /> <span className="mt-1">{this.state.date}</span>
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
                      hidden={this.state.ownerId === Number(localStorage.getItem('currentUserId'))}
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
