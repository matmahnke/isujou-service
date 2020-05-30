import React from "react";

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
} from "reactstrap";

import GlobalNavbar from "../../../components/Navbars/GlobalNavbar.js";
import SimpleFooter from "../../../components/Footers/SimpleFooter.js";

import './Advert.css';

class Advert extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      title: '',
      date: null,
      description: '',
      objectives: [],
      photos: [],
      ownerId: null,
      ownerName: '',
      ownerPhotoUrl: ''
    }
  }

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;

    if (this.props.match.params?.id) {
      let isValidId = !isNaN(this.props.match.params?.id);

      if (!isValidId) {
        console.log('Mostrar o erro que o id passado é inválido')
      }
      else {
        let registerNotFound = false;

        // faz requisicao, se retornou um objeto de verdade monta o model, senão bota isValidId = false
        var model = {
          id: this.props.match.params.id,
          title: 'Casa no centro',
          date: '01/05/2020',
          description: 'Casa com três quartos, dois banheiros e uma área de festa.',
          objectives: ["Arrumar as camas", "Varrer o chão", "Limpar as janelas"],
          photos: ["https://i.pinimg.com/originals/39/ea/2e/39ea2ef9c74c127ffba4bc4ec4f1a9bc.jpg", "https://i.ytimg.com/vi/6qUyyXyYXrM/maxresdefault.jpg"],
          ownerId: 1,
          ownerName: 'Calvin Harris',
          ownerPhotoUrl: require("../../../assets/img/icons/1.jpg")
        }

        if (registerNotFound) {
          console.log('Mandar pra página de registro não encontrado')
        }
        else
          this.setState(model)
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
                          <Button size="sm" color="default" className="fa fa-calendar mr-2" /> <span>{this.state.date}</span>
                        </Row>
                        <Row>
                          {this.state.description}
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
