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
  Label
} from 'reactstrap'

import GlobalNavbar from '../../components/Navbars/GlobalNavbar.js'
import SimpleFooter from '../../components/Footers/SimpleFooter.js'
import api from '../../services/api'
import Loading from '../../components/Loading/Loading.js'

import CurrencyInput from "../../components/Inputs/CurrencyInput.js"

export default class Proposal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      advertId: 0,
      amount: null,
      loading: false
    }

    this.amount_onChange = this.amount_onChange.bind(this)
  }

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    if (this.props.match.params?.id)
      this.setState({ advertId: this.props.match.params.id })
  }

  amount_onChange(event) {
    this.setState({ amount: event.target.value })
  }

  save() {
    console.log(this.state)
    this.setState({ loading: true })
    api.post('/proposal', { 
      advertId: this.state.advertId,
      value: this.state.amount.toString().replace("R$", "").replace(",", "")
    })
      .then(resp => {
        const { data } = resp;
      })
      .catch((ex) => {
        console.log(ex)
      })
      .finally(() => {
        this.setState({ loading: false })
      })
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
              <Card className="shadow border-0">
                <CardHeader>
                  <h2>Realizar proposta</h2>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="advertProperty">Quanto deseja oferecer?</Label>
                        <InputGroup>
                          <CurrencyInput placeholder="R$0,00" type="text" value={this.state.amount} onChange={this.amount_onChange}/>
                        </InputGroup>
                      </FormGroup>
                    </Col>
                    <Col md={6} className="border-left">
                      <p>
                        Este valor será oferecido ao proprietário para realizar as atividades propostas no anúncio. Ela pode ser aceita, recusada ou negociada caso desejado.
                        </p>
                      <p>
                        Consulte as <a href="/rules">regras</a> para maiores informações.
                        </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12}>
                      <Button color="success" onClick={() => this.save()}>Enviar</Button>
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