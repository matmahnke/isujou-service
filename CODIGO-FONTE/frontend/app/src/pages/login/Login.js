import React from 'react'

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";

import { useToasts } from 'react-toast-notifications'
import SimpleFooter from '../../components/Footers/SimpleFooter';
import api from '../../services/api';

const Login = (props) => {
  const { addToast } = useToasts()

  const handleSubmit = values => {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    api.post('auth', {
      username: email,
      password: password
    })
      .then(resp => {
        const { data } = resp;

        if (data) {
          localStorage.setItem('Authorization', data.accessToken)
          addToast('Login realizado com sucesso.', {
            appearance: 'success',
            autoDismiss: true,
          })

          window.location.href = props?.history?.location?.state?.from?.pathname ?? '/';;
        }
      })
      .catch((ex) => {
        addToast(ex.response?.data.message ?? 'Não foi possível detectar o erro, entre em contato com o suporte.', {
          appearance: 'error',
          autoDismiss: true,
        })
      })

    values.preventDefault();
  }

  return (
    <>
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

        <Container className="pt-lg-2">
          <Row className="mb-5 justify-content-center">
            <a href="/">
              <img
                alt="..."
                className="img-fluid"
                src={require("../../assets/img/brand/logo-2-branco.png")}
                style={{ width: "170px" }}
              />
            </a>
            <h2 className="text-white mt-2 ml-3">Login</h2>
          </Row>
          <Row className="justify-content-center">
            <Col lg="5">
              <Card className="bg-secondary shadow border-0">
                <CardHeader className="bg-white pb-5" hidden={true}>
                  <div className="text-muted text-center mb-3">
                    <small>Logue com</small>
                  </div>
                  <div className="btn-wrapper text-center">
                    <Button
                      className="btn-neutral btn-icon ml-1"
                      color="default"
                      onClick={e => alert('Ainda não :(')}
                    >
                      <span className="btn-inner--icon mr-1">
                        <img
                          alt="..."
                          src={require("../../assets/img/svg/google.svg")}
                        />
                      </span>
                      <span className="btn-inner--text">Google</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardBody className="px-lg-5 py-lg-5">
                  <div className="text-center text-muted mb-4">
                    <small>Logue com suas credenciais</small>
                  </div>
                  <Form role="form" onSubmit={e => handleSubmit(e)}
                  >
                    <FormGroup className="mb-3">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-email-83" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="E-mail"
                          type="email"
                          id="email"
                          required />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-lock-circle-open" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Senha"
                          type="password"
                          autoComplete="off"
                          id="password"
                          required
                        />
                      </InputGroup>
                    </FormGroup>
                    <div className="custom-control custom-control-alternative custom-checkbox" hidden>
                      <input
                        className="custom-control-input"
                        id=" customCheckLogin"
                        type="checkbox"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor=" customCheckLogin"
                      >
                        <span>Remember me</span>
                      </label>
                    </div>
                    <div className="text-center">
                      <Button
                        className="my-4"
                        color="primary"
                        type="submit"
                      >
                        Entrar
                      </Button>
                    </div>
                  </Form>

                </CardBody>
              </Card>
              <Row className="mt-3">
                <Col xs="6">
                  <a
                    className="text-light"
                    href="/recover"
                  >
                    <small>Esqueceu sua senha?</small>
                  </a>
                </Col>
                <Col className="text-right" xs="6">
                  <a
                    className="text-light"
                    href="/register"
                  >
                    <small>Criar uma nova conta</small>
                  </a>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
      <SimpleFooter />
    </>
  )
};

export default Login;