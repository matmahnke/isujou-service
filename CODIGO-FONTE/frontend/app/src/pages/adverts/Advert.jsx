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
import ItemList from '../../components/ItemList/ItemList'
import ErrorAlert from '../../components/Alerts/ErrorAlert'
import Loading from '../../components/Loading/Loading'
import Error from '../../components/Error/Error'
import api from '../../services/api'

export default class Advert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      validationErrors: [],
      propertyId: 0,
      dayMonth: '',
      hour: '',
      active: true,
      properties: [],
      predefinedItems: [],
      loading: false,
      error: null
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
      document.getElementById('advertActive').setAttribute("disabled", true)
    } else if (this.props.match.params?.id) {
      this.trazerDados(this.props.match.params.id)
    }

    this.setState({ loading: true })
    api.get('/property')
      .then(resp => {
        const { data } = resp

        if (data)
          this.setState({ properties: this.listarImoveis(data) })
      })
      .catch((ex) => {
        let error = { showLogin: true, status: null }
        
        if (ex.response)
          error.status = ex.response.status

        this.setState({ error })
      })
      .finally(() => {
        this.setState({ loading: false })
      })
  }

  listarImoveis(data) {
    var imoveis = [{ id: -1, description: "Nenhum" }]

    for (var i = 0; i < data.length; i++)
      imoveis.push({ id: data[i].id, description: data[i].title })

    return imoveis
  }

  trazerDados(id) {
    if (isNaN(id))
      this.setState({ validationErrors: ["O parametro informado não foi encontrado (" + id + ")"], mostrarForm: false })
    else {
      this.setState({ loading: true })
      api.get('/advert/' + id)
        .then(resp => {
          const { data } = resp;
          if (data) {
            var model = {
              propertyId: data.propertyId,
              predefinedItems: data.items?.length > 0 ? data.items.map(item => item.description) : [],
              dayMonth: data.dateForComponent,
              hour: data.hourForComponent,
              active: data.active
            }

            this.setState(model)
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

  isCreating = () => this.props.type === 'new'

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

  save() {
    const { propertyId, dayMonth, hour, active } = this.state

    var model = {
      propertyId,
      dayMonth,
      hour,
      date: dayMonth + " " + hour,
      active,
      items: this.obterItens()
    }

    var method = null;

    if (!this.validarAnuncio(model))
      return

    this.setState({ loading: true })
    if (this.isCreating())
      method = api.post('/advert', model)
    else
      method = api.put('/advert', model)

    method.then(() => {
      window.location.href = '/adverts/mine';
    })
      .catch((ex) => {
        this.setState({ validationErrors: [ex.response?.data.message ?? 'Não foi possível detectar o erro, entre em contato com o suporte.'] })
      })
      .finally(() => {
        this.setState({ loading: false })
      })

  }

  obterItens() {
    var items = [];

    let list = document.querySelector('#itemList').children;

    for (var i = 0; i < list.length; i++)
      items.push({ value: list[i].getAttribute("data-value") })

    return items;
  }

  validarAnuncio(advert) {
    var items = [];

    if (!advert.propertyId || advert.propertyId < 0)
      items.push('É necessário selecionar um imóvel.')

    if (!advert.dayMonth)
      items.push('O dia informado é inválido.')

    if (!advert.hour)
      items.push('A hora informada é inválida.')

    if (advert.items.length < 1)
      items.push('É necessário informar pelo menos uma atividade a ser feita.')
    else if (advert.items.length > 5)
      items.push('Não é permitido adicionar mais de cinco atividades.')

    if (this.isCreating() && !advert.active)
      items.push('Não é permitido criar um anúncio inativado.')

    this.setState({
      validationErrors: items
    });

    return this.state.validationErrors.length === 0;
  }

  montarListaErros() {
    return (<ul id="validationList" className="pl-3">
      {this.state.validationErrors.map(item => <li color="danger" key={item}>{item}</li>)}
    </ul>)
  }

  render() {
    const { propertyId, dayMonth, hour, active, predefinedItems } = this.state

    return (
      <>
        <Error error={this.state.error} />
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
              <Card className="shadow border-0">
                <CardHeader>
                  <h2>{this.obterTitulo()}</h2>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col md={4}>
                      <FormGroup>
                        <Label for="advertProperty">Imóvel</Label>
                        <InputGroup>
                          <Input
                            type="select"
                            id="advertProperty"
                            name="propertyId"
                            onChange={this.onChange}
                            value={propertyId}
                          >
                            {this.state.properties.map(property => <option key={property.id} value={property.id}>{property.description}</option>)}
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
                            name="dayMonth"
                            onChange={this.onChange}
                            value={dayMonth}
                            required
                          />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                    <Col md={3}>
                      <FormGroup>
                        <Label for="advertTime">Hora</Label>
                        <InputGroup>
                          <Input
                            type="time"
                            id="advertTime"
                            name="hour"
                            onChange={this.onChange}
                            value={hour}
                            required
                          />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                    <Col md={2}>
                      <FormGroup>
                        <Label for="advertActive">Ativo</Label>
                        <div className="custom-control custom-checkbox mt-2 mb-3">
                          <input
                            className="custom-control-input"
                            id="advertActive"
                            name="active"
                            onChange={this.onChange}
                            checked={active}
                            type="checkbox"
                          />
                          <label className="custom-control-label" htmlFor="advertActive">
                            {this.state.active ? 'Sim' : 'Não'}
                          </label>
                        </div>
                      </FormGroup>
                    </Col>
                  </Row>
                  <hr />
                  <h4>Itens</h4>
                  <p>
                    Atividades feitas durante a limpeza. A descrição deve ter no mínimo dois caracteres e não são permitidos valores duplicados.
                  </p>
                  <ItemList items={predefinedItems} minLengthForItems={2} allowDuplicatedItems={false} />
                  <hr />
                  <Col>
                    <Row>
                      <Button color="success" onClick={() => this.save()}>Salvar</Button>
                    </Row>
                  </Col>
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