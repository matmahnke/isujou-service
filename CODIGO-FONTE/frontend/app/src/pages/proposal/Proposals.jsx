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
import Error from '../../components/Error/Error'
import Loading from '../../components/Loading/Loading'

export default class Proposals extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      error: null
    }
  }

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }

  getProposals = () =>
    api.get('/proposal')
      .catch((error) => {
        this.setState({ error })
      })

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
        window.location.reload();
      })
  }

  render() {
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
                              <th>#</th>
                              <th>Imóvel</th>
                              <th>Data</th>
                              <th>Valor</th>
                              <th>Situação</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.data.map((proposal, index) => {
                              const { id, advert, status, value, isMine, canRefuse, canApprove, canSuspend, canStart, canComplete, canWriteFeedBack, feedbackProfileId, canShowDetails } = proposal
                              var proposalStatus = Resources.GetProposalStatus()[status - 1]
                              return (
                                <tr key={id}>
                                  <td>
                                    <Button color="success" size="sm" title="Aprovar" hidden={!isMine || !canApprove} onClick={() => this.approve(id)}><i className="fa fa-thumbs-up"></i></Button>
                                    <Button color="danger" size="sm" title="Recusar" hidden={!isMine || !canRefuse} onClick={() => this.refuse(id)}><i className="fa fa-thumbs-down"></i></Button>
                                    <Button color="danger" size="sm" title="Suspender" hidden={isMine || !canSuspend} onClick={() => this.suspend(id)}><i className="fa fa-ban"></i></Button>
                                    <Button color="warning" size="sm" title="Iniciar" hidden={!isMine || !canStart} onClick={() => this.start(id)}><i className="fa fa-play"></i></Button>
                                    <Button color="default" size="sm" title="Concluir" hidden={!isMine || !canComplete} onClick={() => this.concluir(id)}><i className="fa fa-check"></i></Button>
                                    <Button color="info" size="sm" title="Avaliar" hidden={!canWriteFeedBack} href={"/feedback/" + id + "/" + feedbackProfileId}><i className="fa fa-pencil"></i></Button>
                                    <Button size="sm" title="Detalhes" href={"/proposal/detail/" + id} hidden={!canShowDetails}><i className="fa fa-eye"></i></Button>
                                  </td>
                                  <td>{id}</td>
                                  <td>{advert.title}</td>
                                  <td>{advert.formatedDate}</td>
                                  <td title={value}>R$ --,--</td>
                                  <td>{proposalStatus?.description + (proposalStatus?.subdescription ? ", " + proposalStatus?.subdescription : "")}</td>
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