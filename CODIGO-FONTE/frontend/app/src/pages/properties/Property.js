import React from "react"

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
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
import ErrorAlert from '../../components/Alerts/ErrorAlert.js'

const states = [
  { id: 1, description: "Acre" },
  { id: 2, description: "Alagoas" },
  { id: 3, description: "Amapá" },
  { id: 4, description: "Amazonas" },
  { id: 5, description: "Bahia" },
  { id: 6, description: "Ceará" },
  { id: 7, description: "Distrito Federal" },
  { id: 8, description: "Espírito Santo" },
  { id: 9, description: "Goiás" },
  { id: 10, description: "Maranhão" },
  { id: 11, description: "Mato Grosso" },
  { id: 12, description: "Mato Grosso do Sul" },
  { id: 13, description: "Minas Gerais" },
  { id: 14, description: "Pará" },
  { id: 15, description: "Paraíba" },
  { id: 16, description: "Paraná" },
  { id: 17, description: "Pernambuco" },
  { id: 18, description: "Piauí" },
  { id: 19, description: "Rio de Janeiro" },
  { id: 20, description: "Rio Grande do Norte" },
  { id: 21, description: "Rio Grande do Sul" },
  { id: 22, description: "Rondônia" },
  { id: 23, description: "Roraima" },
  { id: 24, description: "Santa Catarina" },
  { id: 25, description: "São Paulo" },
  { id: 26, description: "Sergipe" },
  { id: 27, description: "Tocantins" }
]

export default class Property extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      validationErrors: [],
      title: '',
      active: true,
      description: '',
      state: states[0],
      city: '',
      neighborhood: '',
      street: '',
      number: '',
      cep: '',
      complement: ''
    }

    this.title_onChange = this.title_onChange.bind(this)
    this.active_onChange = this.active_onChange.bind(this)
    this.description_onChange = this.description_onChange.bind(this)
    this.state_onChange = this.state_onChange.bind(this)
    this.city_onChange = this.city_onChange.bind(this)
    this.neighborhood_onChange = this.neighborhood_onChange.bind(this)
    this.street_onChange = this.street_onChange.bind(this)
    this.number_onChange = this.number_onChange.bind(this)
    this.cep_onChange = this.cep_onChange.bind(this)
    this.complement_onChange = this.complement_onChange.bind(this)
  }

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;

    if (this.isCreating()) {
      this.setState({ active: true });
      document.getElementById('propertyActive').setAttribute("disabled", true)
    }
  }

  //#region OnChange
  title_onChange(event) {
    this.setState({ title: event.target.value })
  }

  active_onChange(event) {
    this.setState({ active: event.target.checked })
  }

  description_onChange(event) {
    this.setState({ description: event.target.value })
  }

  state_onChange(event) {
    this.setState({ state: event.target.value })
  }

  city_onChange(event) {
    this.setState({ city: event.target.value })
  }

  neighborhood_onChange(event) {
    this.setState({ neighborhood: event.target.value })
  }

  street_onChange(event) {
    this.setState({ street: event.target.value })
  }

  number_onChange(event) {
    this.setState({ number: event.target.value })
  }

  cep_onChange(event) {
    this.setState({ cep: event.target.value })
  }

  complement_onChange(event) {
    this.setState({ complement: event.target.value })
  }
  //#endregion

  isCreating() {
    return this.props.type === 'new'
  }

  obterTitulo() {
    var nome = this.props.type;

    if (nome === 'new')
      nome = 'Novo imóvel'
    else if (nome === 'edit')
      nome = 'Editar'

    return nome
  }

  save() {
    const { title, active, description, state, city, neighborhood, street, cep, number, complement } = this.state

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
      active
    }

    api.post('/property', model)
      .then(() => {
        window.location.href = '/properties';
      })
      .catch((ex) => {
        this.setState({ validationErrors: [ex.response?.data.message ?? 'Não foi possível detectar o erro, entre em contato com o suporte.'] })
      })
  }

  montarListaErros() {
    return (<ul id="validationList" className="pl-3">
      {this.state.validationErrors.map(item => <li color="danger" key={item}>{item}</li>)}
    </ul>)
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
              <ErrorAlert
                isOpen={this.state.validationErrors.length !== 0}
                toggle={() => this.setState({ validationErrors: [] })}
                message={this.montarListaErros()}
              />
              <Card className="shadow border-0">
                <CardHeader>
                  <h2>{this.obterTitulo()}</h2>
                </CardHeader>
                <CardBody>
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
                            onChange={this.title_onChange}
                            value={this.state.title}
                            required
                          />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                    <Col md={2}>
                      <Label for="propertyActive">Ativo</Label>
                      <div className="custom-control custom-checkbox mt-2 mb-3">
                        <input
                          className="custom-control-input"
                          id="propertyActive"
                          onChange={this.active_onChange}
                          checked={this.state.active}
                          type="checkbox"
                        />
                        <label className="custom-control-label" htmlFor="propertyActive">
                          {this.state.active ? 'Sim' : 'Não'}
                        </label>
                      </div>
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
                            onChange={this.description_onChange}
                            value={this.state.description}
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
                                onChange={this.state_onChange}
                                value={this.state.state}
                              >
                                {states.map(state => <option key={state.id} value={state.id}>{state.description}</option>)}
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
                                onChange={this.city_onChange}
                                value={this.state.city}
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
                                onChange={this.neighborhood_onChange}
                                value={this.state.neighborhood}
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
                                onChange={this.street_onChange}
                                value={this.state.street}
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
                                onChange={this.number_onChange}
                                value={this.state.number}
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
                                onChange={this.cep_onChange}
                                value={this.state.cep}
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
                                onChange={this.complement_onChange}
                                value={this.state.complement}
                              />
                            </InputGroup>
                          </FormGroup>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12}>
                      <Button color="success" onClick={() => this.save()}>Salvar</Button>
                    </Col>
                  </Row>
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