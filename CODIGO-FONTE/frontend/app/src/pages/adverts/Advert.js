import React from "react";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroup,
  Container,
  Row,
  Col,
  Label
} from "reactstrap";

import GlobalNavbar from "../../components/Navbars/GlobalNavbar.js";
import SimpleFooter from "../../components/Footers/SimpleFooter.js";

export default class Advert extends React.Component {
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }
  obterTitulo() {
    var nome = this.props.type ?? "Anúncio";

    if (nome === 'new')
      nome = 'Novo anúncio'
    else if (nome === 'edit')
      nome = 'Editar'
    else if (nome === 'view')
      nome = 'Anúncio'

    return nome
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
            <Container>
              <Card className="shadow border-0">
                <CardHeader>
                  <h2>{this.obterTitulo()}</h2>
                </CardHeader>
                <CardBody>
                  <Form role="form">
                    <Row>
                      <Col md={4}>
                        <FormGroup>
                          <Label for="advertProperty">Imóvel</Label>
                          <InputGroup>
                            <Input
                              type="select"
                              id="advertProperty"
                            >
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                            </Input>
                          </InputGroup>
                        </FormGroup>
                      </Col>
                      <Col md={3}>
                        <FormGroup>
                          <Label for="advertDate">Dia</Label>
                          <InputGroup>
                            <Input
                              type="date"
                              id="advertDate"
                              required
                            />
                          </InputGroup>
                        </FormGroup>
                      </Col><Col md={3}>
                        <FormGroup>
                          <Label for="advertTime">Hora</Label>
                          <InputGroup>
                            <Input
                              type="time"
                              id="advertTime"
                              required
                            />
                          </InputGroup>
                        </FormGroup>
                      </Col>
                      <Col md={2}>
                        <FormGroup>
                          <Label for="advertActive">Ativo</Label>
                          <InputGroup>
                            <label className="custom-toggle mt-1">
                              <input type="checkbox" id="advertActive" />
                              <span className="custom-toggle-slider rounded-circle" />
                            </label>
                          </InputGroup>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                        <Button color="success">Salvar</Button>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Container>
          </section>
        </main>
        <SimpleFooter />
      </>
    );
  }
}