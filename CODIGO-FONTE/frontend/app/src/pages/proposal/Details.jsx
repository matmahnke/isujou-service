import React from 'react'

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  InputGroup,
  Container,
  Row,
  Col,
  Label,
  Input
} from 'reactstrap'

import GlobalNavbar from '../../components/Navbars/GlobalNavbar'
import SimpleFooter from '../../components/Footers/SimpleFooter'
import Error from '../../components/Error/Error'
import Loading from '../../components/Loading/Loading'
import api from '../../services/api'
import Resources from '../../store/Resources'

import CurrencyInput from '../../components/Inputs/CurrencyInput'

export default class Details extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      proposalId: 0,
      value: null,
      state: 0,
      city: '',
      neighborhood: '',
      street: '',
      number: '',
      cep: '',
      complement: '',
      loading: false,
      error: null
    }

    this.onChange = this.onChange.bind(this)
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value })

  componentDidMount() {
    document.documentElement.scrollTop = 0
    document.scrollingElement.scrollTop = 0
    if (this.props.match.params?.id) {
      let id = this.props.match.params.id;
      this.setState({ loading: true })
      api.get('/proposal/' + id)
        .then(resp => {
          const { data } = resp;
          if (data) {
            var model = {
              proposalId: id,
              value: data.value,
              state: data.property.state,
              city: data.property.city,
              neighborhood: data.property.neighborhood,
              street: data.property.street,
              number: data.property.number,
              cep: data.property.cep,
              complement: data.property.complement,
              isMine: data.isMine,
              canRefuse: data.canRefuse,
              canApprove: data.canApprove,
              canSuspend: data.canSuspend,
              canStart: data.canStart,
              canComplete: data.canComplete,
              canWriteFeedBack: data.canWriteFeedBack,
              feedbackProfileId: data.feedbackProfileId
            }

            this.setState(model)
          }
        })
        .catch((error) => {
          this.setState({ error })
        })
        .finally(() => {
          this.setState({ loading: false })
        })
    }
  }

  approve = id => this.changeStatus('approve', id)
  refuse = id => this.changeStatus('refuse', id)
  suspend = id => this.changeStatus('suspend', id)
  start = id => this.changeStatus('start', id)
  concluir = id => this.changeStatus('complete', id)

  changeStatus(status, id) {
    this.setState({ loading: true })
    api.post('/proposal/' + status + '/' + id)
      .catch((error) => {
        this.setState({ error })
      })
      .finally(() => {
        this.setState({ loading: false })
        window.location.href= "/proposals/mine"
      })
  }

  render() {
    const { proposalId: id, value, state, city, neighborhood, street, number, cep, complement, isMine, canRefuse, canApprove, canSuspend, canStart, canComplete, canWriteFeedBack, feedbackProfileId } = this.state

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
              <Card className="shadow border-0">
                <CardHeader>
                  <h2>Detalhes da proposta</h2>
                </CardHeader>
                <CardBody>
                  <Col lg={12} className="mb-4">
                    <Row>
                      <Button size="sm" color="success" title="Aprovar" hidden={!isMine || !canApprove} onClick={() => this.approve(id)}>Aprovar <i className="fa fa-thumbs-up"></i></Button>
                      <Button size="sm" color="danger" title="Recusar" hidden={!isMine || !canRefuse} onClick={() => this.refuse(id)}>Recusar <i className="fa fa-thumbs-down"></i></Button>
                      <Button size="sm"  color="warning" title="Iniciar" hidden={!isMine || !canStart} onClick={() => this.start(id)}>Iniciar <i className="fa fa-play"></i></Button>
                      <Button size="sm" color="default" title="Concluir" hidden={!isMine || !canComplete} onClick={() => this.concluir(id)}>Concluir <i className="fa fa-check"></i></Button>
                      <Button size="sm" color="info" title="Avaliar" hidden={!canWriteFeedBack} href={"/feedback/" + id + "/" + feedbackProfileId}>Avaliar <i className="fa fa-pencil"></i></Button>
                    </Row>
                  </Col>
                  <Col lg={12}>
                    <Row>
                      O valor desta proposta é de R$<b>{value}</b>.
                    </Row>
                  </Col>
                  <hr />
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
                                id="propertyState"
                                name="state"
                                disabled
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
                                disabled
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
                                disabled
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
                                disabled
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
                                disabled
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
                                disabled
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
                                disabled
                                onChange={this.onChange}
                                value={complement}
                              />
                            </InputGroup>
                          </FormGroup>
                        </Col>
                      </Row>
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