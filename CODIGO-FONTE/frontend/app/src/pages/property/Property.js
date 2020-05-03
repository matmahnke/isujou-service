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

class Property extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      habilitarCampos: false
    }
  }
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }
  obterTitulo() {
    var nome = this.props.type;

    if (nome == 'new') {
      nome = 'Novo imóvel'
      this.state.habilitarCampos = true
    }
    else if (nome == 'edit') {
      nome = 'Editar'
      this.state.habilitarCampos = true
    } else if (nome == 'view') {
      nome = 'Imóvel'
      this.state.habilitarCampos = false
    }

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
                      <Col md={12}>
                        <h4>Informações básicas</h4>
                        <FormGroup>
                          <Label for="propertyTitle">Título</Label>
                          <InputGroup>
                            <Input
                              type="text"
                              id="propertyTitle"
                              required
                              disabled={!this.state.habilitarCampos}
                            />
                          </InputGroup>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                        <FormGroup>
                          <Label for="propertyDescription">Descrição</Label>
                          <InputGroup>
                            <Input
                              type="textarea"
                              rows="3"
                              id="propertyDescription"
                              required
                              disabled={!this.state.habilitarCampos}
                            />
                          </InputGroup>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                        <h4>Endereço</h4>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                        <Row>
                          <Col md={4}>
                            <FormGroup>
                              <Label for="propertyState">Estado</Label>
                              <InputGroup>
                                <Input
                                  type="select"
                                  name="select"
                                  id="propertyState"
                                  disabled={!this.state.habilitarCampos}
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
                          <Col md={4}>
                            <FormGroup>
                              <Label for="propertyCity">Cidade</Label>
                              <InputGroup>
                                <Input
                                  type="text"
                                  id="propertyCity"
                                  required
                                  disabled={!this.state.habilitarCampos}
                                />
                              </InputGroup>
                            </FormGroup>
                          </Col>
                          <Col md={4}>
                            <FormGroup>
                              <Label for="propertyNeightborhood">Bairro</Label>
                              <InputGroup>
                                <Input
                                  type="text"
                                  id="propertyNeightborhood"
                                  required
                                  disabled={!this.state.habilitarCampos}
                                />
                              </InputGroup>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={8}>
                            <FormGroup>
                              <Label for="propertyStreet">Rua</Label>
                              <InputGroup>
                                <Input
                                  type="text"
                                  id="propertyStreet"
                                  required
                                  disabled={!this.state.habilitarCampos}
                                />
                              </InputGroup>
                            </FormGroup>
                          </Col>
                          <Col md={2}>
                            <FormGroup>
                              <Label for="propertyNumber">Número</Label>
                              <InputGroup>
                                <Input
                                  type="number"
                                  id="propertyNumber"
                                  required
                                  disabled={!this.state.habilitarCampos}
                                />
                              </InputGroup>
                            </FormGroup>
                          </Col>
                          <Col md={2}>
                            <FormGroup>
                              <Label for="propertyCep">CEP</Label>
                              <InputGroup>
                                <Input
                                  type="text"
                                  id="propertyCep"
                                  required
                                  disabled={!this.state.habilitarCampos}
                                />
                              </InputGroup>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={12}>
                            <FormGroup>
                              <Label for="propertyComplement">Complemento</Label>
                              <InputGroup>
                                <Input
                                  type="textarea"
                                  rows="3"
                                  id="propertyComplement"
                                  disabled={!this.state.habilitarCampos}
                                />
                              </InputGroup>
                            </FormGroup>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    { this.state.habilitarCampos && 
                      <Row>
                        <Col md={12}>
                          <Button color="success">Salvar</Button>
                        </Col>
                      </Row>
                    }
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

export default Property;
