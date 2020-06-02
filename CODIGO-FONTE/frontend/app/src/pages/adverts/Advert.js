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

import GlobalNavbar from '../../components/Navbars/GlobalNavbar.js'
import SimpleFooter from '../../components/Footers/SimpleFooter.js'
import ItemList from '../../components/ItemList/ItemList.js'
import ErrorAlert from '../../components/Alerts/ErrorAlert.js'
import Loading from '../../components/Loading/Loading.js'
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
      loading: false,
      predefinedItems: []
    }

    this.property_onChange = this.property_onChange.bind(this)
    this.active_onChange = this.active_onChange.bind(this)
    this.dayMonth_onChange = this.dayMonth_onChange.bind(this)
    this.hour_onChange = this.hour_onChange.bind(this)
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

  //#region OnChange
  property_onChange(event) {
    this.setState({ propertyId: event.target.value })
  }

  active_onChange(event) {
    this.setState({ active: event.target.checked })
  }

  dayMonth_onChange(event) {
    this.setState({ dayMonth: event.target.value })
  }

  hour_onChange(event) {
    this.setState({ hour: event.target.value })
  }
  //#endregion

  trazerDados(id) {
    if (isNaN(id))
      this.setState({ validationErrors: ["O parametro informado não foi encontrado (" + id + ")"], mostrarForm: false })
    else {
      this.setState({ loading: true })
      api.get('/advert/' + id)
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

  isCreating() {
    return this.props.type === 'new'
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
      items.push({ value: list[i].getAttribute("data-value") } )

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
                            onChange={this.property_onChange}
                            value={this.state.propertyId}
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
                            onChange={this.dayMonth_onChange}
                            value={this.dayMonth}
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
                            onChange={this.hour_onChange}
                            value={this.state.hour}
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
                            onChange={this.active_onChange}
                            checked={this.state.active}
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
                  <ItemList items={this.state.predefinedItems} minLengthForItems={2} allowDuplicatedItems={false} />
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