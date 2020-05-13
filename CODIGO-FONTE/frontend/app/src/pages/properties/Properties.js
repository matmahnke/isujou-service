import React from "react";

import {
  Button,
  Container,
  Row,
  Table
} from "reactstrap";

import GlobalNavbar from "../../components/Navbars/GlobalNavbar.js";
import SimpleFooter from "../../components/Footers/SimpleFooter.js";
import api from '../../services/api';
import Async from 'react-async';
import { toast } from 'react-toastify';

const getProperties = () =>
  api.get('/property')

export default class Properties extends React.Component {
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
            <Container className="card shadow px-4 pt-3">
              <Row className="pl-2">
                <h2>Imóveis</h2>
              </Row>
              <Row className="pl-2 mt-2">
                <Button color="primary" href="/property/new">Cadastrar</Button>
              </Row>
              <Row className="mt-4">
                <Async promiseFn={getProperties}>
                  {({ data, err, isLoading }) => {
                    if (isLoading) return "Carregando..."
                    if (err) return toast.error(err.message)
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
                              const { active, cep, city, complement, description, id, neighborhood, number, state, street, title } = property
                              return (
                                <tr key={id}>
                                  <td>
                                    <Button color="primary" size="sm" title="Editar"
                                      href={"/property/edit/" + id}
                                    ><i className="fa fa-pencil"></i></Button>
                                    <Button color="danger" size="sm" title="Excluir"><i className="fa fa-minus"></i></Button>
                                  </td>
                                  <td>{title}</td>
                                  <td>{state}</td>
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
