import React from "react";

import {
  Button,
  Container,
  Row,
  Table
} from "reactstrap";

import { useToasts } from 'react-toast-notifications'
import GlobalNavbar from "../../components/Navbars/GlobalNavbar.js";
import SimpleFooter from "../../components/Footers/SimpleFooter.js";
import api from '../../services/api';
import Async from 'react-async';
import Resources from '../../store/Resources.js'

export default class Properties extends React.Component {
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }

  getProperties = () =>
  api.get('/property')

  excluir(id) {
    api.delete('/property/' + id)
      .then(resp => {
        const { data } = resp;
        if (data) {
          console.log('excluído')
        }

        window.location.reload();
      })
      .catch((ex) => {
        console.log(ex.response?.data.message ?? 'Não foi possível detectar o erro, entre em contato com o suporte.')
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
                <h2>Imóveis</h2>
              </Row>
              <Row className="pl-2 mt-2">
                <Button color="primary" href="/property/new">Cadastrar</Button>
              </Row>
              <Row className="mt-4">
                <Async promiseFn={this.getProperties}>
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
                              <th>Título</th>
                              <th>Estado</th>
                              <th>Cidade</th>
                              <th>Bairro</th>
                              <th>Ativo</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.data.map((property, index) => {
                              const { active, city, id, neighborhood, state, title } = property
                              return (
                                <tr key={id}>
                                  <td>
                                    <Button color="primary" size="sm" title="Editar"
                                      href={"/property/edit/" + id}
                                    ><i className="fa fa-pencil"></i></Button>
                                    <Button color="danger" size="sm" title="Excluir" onClick={() => this.excluir(id)}><i className="fa fa-minus"></i></Button>
                                  </td>
                                  <td>{title}</td>
                                  <td>{Resources.GetBrazilianStates()[state - 1].description}</td>
                                  <td>{city}</td>
                                  <td>{neighborhood}</td>
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
