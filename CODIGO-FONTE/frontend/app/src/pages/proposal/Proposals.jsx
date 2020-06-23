import React from 'react'

import {
  Button,
  Container,
  Row,
  Table
} from 'reactstrap'

import { useToasts } from 'react-toast-notifications'
import GlobalNavbar from '../../components/Navbars/GlobalNavbar'
import SimpleFooter from '../../components/Footers/SimpleFooter'
import api from '../../services/api'
import Async from 'react-async'
import Resources from '../../store/Resources'
import Utils from '../../store/Utils'

export default class Proposals extends React.Component {
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }

  getProposals = () =>
    api.get('/proposal')

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
            <Container className="card shadow px-4 pt-3">
              <Row className="pl-2">
                <h2>Minhas propostas</h2>
              </Row>
              <Row className="mt-4">
                <Async promiseFn={this.getProposals}>
                  {({ data, err, isLoading }) => {
                    if (isLoading) return "Carregando..."
                    if (err) return useToasts().addToast(err.message ?? 'Não foi possível detectar o erro, entre em contato com o suporte.', {
                      appearance: 'error',
                      autoDismiss: true,
                    })
                    if (data)
                      return (
                        <Table responsive>
                          <thead>
                            <tr>
                              <th>Ações</th>
                              <th>Imóvel</th>
                              <th>Data</th>
                              <th>Situação</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.data.map((proposal, index) => {
                              const { id, advert, status, isMine, canRefuse, canApprove, canSuspend } = proposal
                              return (
                                <tr key={id}>
                                  <td>
                                    <Button color="success" size="sm" title="Aprovar" hidden={isMine} disabled={canApprove}><i className="fa fa-check"></i></Button>
                                    <Button color="danger" size="sm" title="Recusar" hidden={isMine} disabled={canRefuse}><i className="fa fa-times"></i></Button>
                                    <Button color="danger" size="sm" title="Suspender" hidden={!isMine} disabled={canSuspend}><i className="fa fa-ban"></i></Button>
                                  </td>
                                  <td>{advert.title}</td>
                                  <td>{advert.date}</td>
                                  <td>{Resources.GetProposalStatus()[status - 1]?.description}</td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </Table>
                      )
                  }}
                </Async>
              </Row>
            </Container>
          </section>
        </main>
        <SimpleFooter />
      </>
    );
  }
}