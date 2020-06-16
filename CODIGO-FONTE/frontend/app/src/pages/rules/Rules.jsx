import React from 'react'

import {
  Button,
  Card,
  Table,
  Container,
  Row,
  Col
} from 'reactstrap'

import GlobalNavbar from '../../components/Navbars/GlobalNavbar'
import SimpleFooter from '../../components/Footers/SimpleFooter'

export default class Rules extends React.Component {
  render() {
    return (
      <>
        <GlobalNavbar />
        <main ref="main">
          <section className="section section-shaped section-lg">
            <div className="shape shape-style-1 bg-gradient-default">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
          </section>

          <Container className="pt-lg-3 mt--7 mb-5">
            <Col lg={12}>
              <Card className="shadow border-0 p-3">
                <Row className="m-0">
                  <h2>Regras</h2>
                </Row>
                <Row className="m-0">
                  Como as coisas no iSujou funcionam?
                  </Row>
                <hr />
                <Row className="m-0">
                  <h4>Sobre anúncios, por parte do <b>proprietário</b></h4>
                  <Table bordered>
                    <thead>
                      <tr>
                        <th>
                          Ao cadastrar um anúncio
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          A conta do proprietário deve ter sido verificada.
                          </td>
                      </tr>
                      <tr>
                        <td>
                          O imóvel deve ter sido cadastrado e verificado.
                        </td>
                      </tr>
                      <tr>
                        <td>
                          É necessário informar quais atividades devem ser feitas (arrumar a cama, lavar a louça, varrer o chão etc.)
                          </td>
                      </tr>
                      <tr>
                        <td>
                          A data útil do anúncio é definida pelo proprietário. Esta data serve para as políticas de cancelamento. Ou seja, até que data é possível realizar um cancelamento sem receber multa. Mínimo de três dias.
                          </td>
                      </tr>
                      <tr>
                        <td>
                          Uma faixa de preço (mínimo e máximo) está disponível como sugestão ao que o proprietário pode receber de propostas, é opcional.
                          </td>
                      </tr>
                    </tbody>
                  </Table>
                  <Table bordered>
                    <thead>
                      <tr>
                        <th>
                          Ao recusar uma proposta
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          O anúncio é cancelado, ficando disponível apenas para o proprietário. Ao empregado, é mostrado como inativo.
                        </td>
                      </tr>
                      <tr>
                        <td>
                          Uma multa é acumulada na conta do proprietário por realizar o cancelamento, caso este tenha sido realizado dentro da data útil à data agendada.
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                  <Table bordered>
                    <thead>
                      <tr>
                        <th>
                          Ao aceitar uma proposta
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          Um contrato é gerado, especificando:
                        <ul className="pl-3">
                            <li>Quem é o contratante.</li>
                            <li>Quem é o contratado.</li>
                            <li>Data ou período do contrato.</li>
                            <li>Valor acordado por ambas as partes.</li>
                          </ul>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          Ambas as partes devem concordar para que o contrato seja validado.
                        </td>
                      </tr>
                      <tr>
                        <td>
                          O anúncio é marcado como privado, ou seja, apenas os integrantes (proprietário e empregado doméstico) podem visualizá-lo.
                        </td>
                      </tr>
                      <tr>
                        <td>
                          O anúncio não fica mais disponível.
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Row>
                <hr />
                <Row className="m-0">
                  <h4>Sobre anúncios, por parte do <b>empregado doméstico</b></h4>
                </Row>
                <Row className="m-0">
                  <Table bordered>
                    <thead>
                      <tr>
                        <th>
                          Ao fazer uma proposta (se candidatar a um anúncio)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          O empregado deve ter sido verificado.
                        </td>
                      </tr>
                      <tr>
                        <td>
                          O valor informado pelo empregado para realizar a limpeza deve estar dentro do que foi estipulado pelo proprietário, quando este tiver o informado.
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                  <Table bordered>
                    <thead>
                      <tr>
                        <th>
                          Ao cancelar uma proposta
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          O anúncio volta a ficar disponível, caso esteja dentro do tempo útil do anúncio.
                        </td>
                      </tr>
                      <tr>
                        <td>
                          Uma multa é acumulada na conta do empregado por realizar o cancelamento, caso este tenha sido realizado dentro da data útil à data agendada.
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Row>
                <Row className="m-0">
                  <Button color="default" href="/adverts">Anúncios</Button>
                  <Button color="default" href="/">Início</Button>
                </Row>
              </Card>
            </Col>
          </Container>
        </main>
        <SimpleFooter />
      </>)
  }
}