import React from 'react'

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

import GlobalNavbar from '../../components/Navbars/GlobalNavbar'
import SimpleFooter from '../../components/Footers/SimpleFooter'
import Loading from '../../components/Loading/Loading'
import api from '../../services/api'
import Resources from '../../store/Resources'
import ErrorAlert from '../../components/Alerts/ErrorAlert'

export default class Property extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      validationErrors: [],
      title: '',
      active: true,
      description: '',
      state: 0,
      city: '',
      neighborhood: '',
      street: '',
      number: '',
      cep: '',
      complement: '',
      mostrarForm: true,
      loading: false
    }

    this.onChange = this.onChange.bind(this)
  }
  
  onChange = e => {
    let value = e.target.type === 'checkbox' ? e.target.checked : e.target.value

    this.setState({ [e.target.name]: value })
  }

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;

    if (this.isCreating()) {
      this.setState({ active: true });
      document.getElementById('propertyActive').setAttribute("disabled", true)
    } else if (this.props.match.params?.id) {
      this.trazerDados(this.props.match.params.id)
    }
  }

  isCreating = () => this.props.type === 'new'

  trazerDados(id) {
    if (isNaN(id))
      this.setState({ validationErrors: ["O parametro informado não foi encontrado (" + id + ")"], mostrarForm: false })
    else {
      this.setState({ loading: true })
      api.get('/property/' + id)
        .then(resp => {
          const { data } = resp;
          if (data) {
            this.setState(data)
          }
        })
        .catch((ex) => {
          this.setState({ validationErrors: [ex.response?.data.message ?? 'Não foi possível detectar o erro, entre em contato com o suporte.'], mostrarForm: false })
        })
        .finally(() => {
          this.setState({ loading: false })
        })
    }
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
    const { id, title, active, description, state, city, neighborhood, street, cep, number, complement } = this.state

    var model = {
      id,
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

    var method = null;

    this.setState({ loading: true })
    if (this.isCreating())
      method = api.post('/property', model)
    else
      method = api.put('/property', model)

    method.then(() => {
      window.location.href = '/properties';
    })
      .catch((ex) => {
        this.setState({ validationErrors: [ex.response?.data.message ?? 'Não foi possível detectar o erro, entre em contato com o suporte.'] })
      })
      .finally(() => {
        this.setState({ loading: false })
      })
  }

  montarListaErros() {
    return (<ul id="validationList" className="pl-3">
      {this.state.validationErrors.map(item => <li color="danger" key={item}>{item}</li>)}
    </ul>)
  }

  render() {
    const { title, active, description, state, city, neighborhood, street, number, cep, complement } = this.state

    return (
      <>
        <Loading hidden={!this.state.loading} />
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
              <Card className="shadow border-0" hidden={!this.state.mostrarForm}>
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
                            name="title"
                            onChange={this.onChange}
                            value={title}
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
                          name="active"
                          onChange={this.onChange}
                          checked={active}
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
                            name="description"
                            onChange={this.onChange}
                            value={description}
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
                                name="state"
                                onChange={this.onChange}
                                value={state}
                              >
                                {Resources.GetBrazilianStates().map(state => <option key={state.id} value={state.id}>{state.description}</option>)}
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
                                name="city"
                                onChange={this.onChange}
                                value={city}
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
                                name="neighborhood"
                                onChange={this.onChange}
                                value={neighborhood}
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
                                name="street"
                                onChange={this.onChange}
                                value={street}
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
                                name="number"
                                onChange={this.onChange}
                                value={number}
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
                                name="cep"
                                onChange={this.onChange}
                                value={cep}
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
                                name="complement"
                                onChange={this.onChange}
                                value={complement}
                              />
                            </InputGroup>
                          </FormGroup>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <hr />
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