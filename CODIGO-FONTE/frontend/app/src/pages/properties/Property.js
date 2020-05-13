import React from "react"
import { ToastContainer, toast } from 'react-toastify'

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
} from 'reactstrap'

import GlobalNavbar from "../../components/Navbars/GlobalNavbar.js"
import SimpleFooter from "../../components/Footers/SimpleFooter.js"
import api from '../../services/api'

export default class Property extends React.Component {
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }
  obterTitulo() {
    var nome = this.props.type;

    if (nome === 'new')
      nome = 'Novo imóvel'
    else if (nome === 'edit')
      nome = 'Editar'

    return nome
  }

  handleSubmit(event) {
    var title = document.getElementById('propertyTitle').value;
    var description = document.getElementById('propertyDescription').value;
    var state = document.getElementById('propertyState').value;
    var city = document.getElementById('propertyCity').value;
    var neighborhood = document.getElementById('propertyNeightborhood').value;
    var street = document.getElementById('propertyStreet').value;
    var number = document.getElementById('propertyNumber').value;
    var cep = document.getElementById('propertyCep').value;
    var complement = document.getElementById('propertyComplement').value;
    var active = document.getElementById('propertyActive').value;
    var model = {
      title,
      description,
      state,
      city,
      neighborhood,
      street,
      cep,
      number,
      complement,
      active: active === "on"
    }

    api.post('/property', model)
      .then(() => {
        toast('sucesso')
        window.location.href = '/properties';
      })
      .catch((ex) => {
        toast(ex)
      })

    event.preventDefault();
  }

  render() {
    return (
      <>
        <ToastContainer />
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
                  <Form role="form" onSubmit={e => this.handleSubmit(e)}>
                    <Row>
                      <Col md={12}>
                        <h4>Informações básicas</h4>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={10}>
                        <FormGroup>
                          <Label for="propertyTitle">Título</Label>
                          <InputGroup>
                            <Input
                              type="text"
                              id="propertyTitle"
                              required
                            />
                          </InputGroup>
                        </FormGroup>
                      </Col>
                      <Col md={2}>
                        <Label for="propertyActive">Ativo</Label>
                        <InputGroup>
                          <label className="custom-toggle mt-1">
                            <input type="checkbox" id="propertyActive" defaultChecked />
                            <span className="custom-toggle-slider rounded-circle" />
                          </label>
                        </InputGroup>
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
                                >
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                                  <option value="4">4</option>
                                  <option value="5">5</option>
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
                                />
                              </InputGroup>
                            </FormGroup>
                          </Col>
                        </Row>
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