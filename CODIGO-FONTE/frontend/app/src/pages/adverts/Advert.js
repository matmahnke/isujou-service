import React from 'react'

import {
  Alert,
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

export default class Advert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      validationErrors: []
    }
  }

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;

    if (this.isCreating()) {
      var checkBoxActive = document.getElementById('advertActive')
      checkBoxActive.checked = true
      checkBoxActive.setAttribute("disabled", true)
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
    var propertyId = document.getElementById('advertProperty').value;
    var dayMonth = document.getElementById('advertDate').value;
    var hour = document.getElementById('advertTime').value;
    var date = this.obterData(dayMonth, hour);
    var active = document.getElementById('advertActive').checked;
    var items = this.obterItens();

    var model = {
      propertyId,
      dayMonth,
      hour,
      date,
      active,
      items
    }

    if (!this.validarAnuncio(model))
      return

    // chama salvar
  }

  obterItens() {
    var items = [];

    let list = document.querySelector('#itemList').children;

    for (var i = 0; i < list.length; i++) {
      items.push(list[i].getAttribute("data-value"))
    }

    return items;
  }

  obterData(dayMonth, hour) {
    return new Date(dayMonth);
  }

  validarAnuncio(advert) {
    var items = [];

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

    return this.state.validationErrors.length !== 0;
  }

  mostrarErros() {
    return (<Alert color="danger" isOpen={this.state.validationErrors.length !== 0} toggle={() => this.setState({ validationErrors: [] })}>
      <h4 className="text-white">Foram encontrados os seguintes erros:</h4>
      <ul id="validationList" className="pl-3">
        {this.state.validationErrors.map(item =>
          <li color="danger" key={item}>{item}</li>)
        }
      </ul>
    </Alert  >)
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
              {this.mostrarErros()}
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
                    </Col>
                    <Col md={3}>
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
                  <hr />
                  <h4>Itens</h4>
                  <p>
                    Atividades feitas durante a limpeza. A descrição deve ter no mínimo dois caracteres e não são permitidos valores duplicados.
                  </p>
                  <ItemList minLengthForItems={2} allowDuplicatedItems={false} />
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