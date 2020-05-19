import React from "react";

import {
  Button,
  Card,
  Container,
  Row,
  Col,
  UncontrolledCarousel
} from "reactstrap";

import GlobalNavbar from "../../../components/Navbars/GlobalNavbar.js";
import SimpleFooter from "../../../components/Footers/SimpleFooter.js";

import './Advert.css';

const items = [
  {
    src: "https://i.pinimg.com/originals/39/ea/2e/39ea2ef9c74c127ffba4bc4ec4f1a9bc.jpg",
    altText: '',
    caption: '',
    header: ''
  },
  {
    src: "https://i.ytimg.com/vi/6qUyyXyYXrM/maxresdefault.jpg",
    altText: '',
    caption: '',
    header: ''
  }
];

class Advert extends React.Component {
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
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
                    <UncontrolledCarousel items={items} />
                  </Row>
                  <Row className="mt-4">
                    <Col md={8}>
                      <Row>
                        <p>
                          <h2>
                            Casa no centro
                          </h2>
                          <p>
                            <i className="fa fa-calendar"></i> 01/05/2020
                          </p>
                      Casa com três quartos, dois banheiros e uma área de festa.
                    </p>
                      </Row>
                      <Row>
                        <p>
                          <h4>Objetivos</h4>
                          <ul>
                            <li>Arrumar as camas</li>
                            <li>Varrer o chão</li>
                            <li>Limpar as janelas</li>
                          </ul>
                        </p>
                      </Row>
                    </Col>
                    <Col md={4} className="border-left">
                      <Row className="justify-content-center">
                        <img
                          alt="..."
                          width="150px"
                          className="rounded-circle"
                          src={require("../../../assets/img/icons/1.jpg")}
                        />
                      </Row>
                      <Row className="justify-content-center mt-2">
                        <h3>
                          Calvin Harris
                        </h3>
                      </Row>
                      <Row className="justify-content-center">
                        <Button
                          color="default"
                          size="sm"
                          href="/profile/1"
                        >
                          Ver perfil
                        </Button>
                      </Row>
                    </Col>
                  </Row>
                  <Row className="justify-content-center">
                    <Button
                      color="default"
                      href="/proposal/new/1"
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
