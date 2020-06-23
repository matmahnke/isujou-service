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
import Utils from '../../store/Utils'
import Async from 'react-async'

export default class Adverts extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false
    }
  }

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }

  getAdverts = () =>
    api.get('/advert/authenticated')

  inativar(id) {
    this.setState({ loading: true })
    api.post('/advert/suspend/' + id)
      .then(resp => {
        console.log('Sucesso')
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
                <h2>Anúncios</h2>
              </Row>
              <Row className="pl-2 mt-2">
                <Button color="primary" href="/advert/new">Cadastrar</Button>
              </Row>
              <Row className="mt-4">
                <Async promiseFn={this.getAdverts}>
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
                              <th>Ativo</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.data.map((adverd, index) => {
                              const { id, title, formatedDate, hourForComponent, active } = adverd
                              console.log(data)
                              return (
                                <tr key={id}>
                                  <td>
                                    <Button color="primary" size="sm" title="Editar" href={"/advert/edit/" + id} disabled={!active}><i className="fa fa-pencil"></i></Button>
                                    <Button color="danger" size="sm" title="Inativar" onClick={() => this.inativar(id)} hidden={!active}><i className="fa fa-times"></i></Button>
                                  </td>
                                  <td>{id}</td>
                                  <td>{title}</td>
                                  <td>{formatedDate} {hourForComponent}</td>
                                  <td>
                                    <div className="custom-control custom-checkbox">
                                      <input
                                        className="custom-control-input"
                                        checked={active}
                                        disabled
                                        type="checkbox"
                                      />
                                      <label className="custom-control-label" htmlFor="customCheck2" />
                                    </div>
                                  </td>
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