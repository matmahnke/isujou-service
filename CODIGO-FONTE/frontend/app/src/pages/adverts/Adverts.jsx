import React from "react";

import {
  Button,
  Container,
  Row,
  Table
} from "reactstrap";

import { useToasts } from 'react-toast-notifications'
import GlobalNavbar from '../../components/Navbars/GlobalNavbar'
import SimpleFooter from '../../components/Footers/SimpleFooter'
import api from '../../services/api';
import Utils from '../../store/Utils'
import Async from 'react-async';

export default class Adverts extends React.Component {
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }

  getAdverts = () =>
    api.get('/advert')

  excluir(id) {

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
                              <th>Imóvel</th>
                              <th>Data</th>
                              <th>Ativo</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.data.map((adverd, index) => {
                              const { id, property, date, active } = adverd
                              return (
                                <tr key={id}>
                                  <td>
                                    <Button color="primary" size="sm" title="Editar"
                                      href={"/advert/edit/" + id}
                                    ><i className="fa fa-pencil"></i></Button>
                                    <Button color="danger" size="sm" title="Excluir" onClick={() => this.excluir(id)}><i className="fa fa-minus"></i></Button>
                                  </td>
                                  <td>{property.title}</td>
                                  <td>{Utils.formatarData(new Date(date))}</td>
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