import React from "react"

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  InputGroup,
  Container,
  Row,
  Col,
  Label
} from "reactstrap"

import GlobalNavbar from "../../components/Navbars/GlobalNavbar.js"
import SimpleFooter from "../../components/Footers/SimpleFooter.js"

import CurrencyInput from "../../components/Inputs/CurrencyInput.js"

export default class Proposal extends React.Component {
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
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
                  <h2>Realizar proposta</h2>
                </CardHeader>
                <CardBody>
                  <Form role="form">
                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="advertProperty">Quanto deseja oferecer?</Label>
                          <InputGroup>
                            <CurrencyInput placeholder="R$0,00" type="text" />
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
                        <Button color="success">Enviar</Button>
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