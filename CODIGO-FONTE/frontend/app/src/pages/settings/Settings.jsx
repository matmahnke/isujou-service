import React, { Component } from 'react'

import {
  Button,
  Card,
  Container,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  InputGroup,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  CardTitle,
  CardText
} from 'reactstrap'

import classnames from 'classnames'

import GlobalNavbar from '../../components/Navbars/GlobalNavbar'
import SimpleFooter from '../../components/Footers/SimpleFooter'
import Error from '../../components/Error/Error'
import Loading from '../../components/Loading/Loading'
import api from '../../services/api'
import Resources from '../../store/Resources'

export default class Settings extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activeTab: '1',
      userId: null,
      name: '',
      lastName: '',
      description: '',
      birthDate: '',
      cpf: '',
      gender: 3,
      feedbacks: [],
      achievements: [],
      photo: null,
      loading: false,
      error: null
    }

    this.onChange = this.onChange.bind(this)
  }

  componentDidMount() {
    this.setState({ loading: true })
    let id = localStorage.getItem('currentUserId');

    api.get('/profile/' + id)
      .then(resp => {
        const { data } = resp;

        var model = {
          userId: id,
          name: data.name,
          lastName: data.lastName,
          description: data.description ?? '',
          birthDate: data.birthDate.substring(0, 10),
          cpf: data.cpf,
          gender: data.gender,
          feedBacks: data.feedBacks,
          achievements: data.achievements
        }

        this.setState(model)
      })
      .catch((error) => {
        this.setState({ error })
      })
      .finally(() => {
        this.setState({ loading: false })
      })
  }

  setActiveTab(activeTab) {
    this.setState({ activeTab })
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) this.setActiveTab(tab);
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value })

  save = () => {
    console.log(this.state)
  }

  readFile() {
    if (this.files && this.files[0]) {

      var FR = new FileReader();

      FR.addEventListener("load", function (e) {
        document.getElementById("img").src = e.target.result;
        this.setState({ photo: e.target.result })
      });

      FR.readAsDataURL(this.files[0]);
    }
  }

  render() {
    const { name, lastName, description, birthDate, cpf, gender, photo } = this.state

    return (
      <>
        <Error error={this.state.error} />
        <Loading hidden={!this.state.loading} />
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
                <Nav tabs>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: this.state.activeTab === '1' })}
                      onClick={() => { this.toggle('1'); }}>
                      Meus dados
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: this.state.activeTab === '2' })}
                      onClick={() => { this.toggle('2'); }}>
                      Avaliações
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId="1" className="p-3">
                    <Row>
                      <Col lg="8">
                        <Row>
                          <h5><i className="fa fa-globe text-green" title="Estas informações são públicas!" /> Informações do perfil</h5>
                        </Row>
                        <Row>
                          <Col lg="6">
                            <FormGroup>
                              <Label for="name">Nome <span className="text-danger">*</span></Label>
                              <InputGroup>
                                <Input
                                  type="text"
                                  id="name"
                                  name="name"
                                  onChange={this.onChange}
                                  value={name}
                                  required
                                />
                              </InputGroup>
                            </FormGroup>
                          </Col>
                          <Col lg="6">
                            <FormGroup>
                              <Label for="lastName">Sobrenome <i className="fa fa-info-circle" title="Esta informação não é visível aos demais usuários." /></Label>
                              <InputGroup>
                                <Input
                                  type="text"
                                  id="lastName"
                                  name="lastName"
                                  onChange={this.onChange}
                                  value={lastName}
                                  required
                                />
                              </InputGroup>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg="12">
                            <FormGroup>
                              <Label for="description">Descrição <span className="text-danger">*</span></Label>
                              <InputGroup>
                                <Input
                                  type="textarea"
                                  id="description"
                                  name="description"
                                  onChange={this.onChange}
                                  value={description}
                                  required
                                />
                              </InputGroup>
                            </FormGroup>
                          </Col>
                        </Row>
                      </Col>
                      <Col lg="4">
                        <Row className="justify-content-center">
                          <img
                            id="img"
                            alt="..."
                            width="150px"
                            className="rounded-circle"
                            src={photo?.length > 0 ? photo : require("../../assets/img/icons/no-image.png")}
                          />
                        </Row>
                        <Row className="justify-content-center mt-4">
                          <Input
                            bsSize="sm"
                            id="img"
                            color="secondary"
                            type='file'
                            onChange={this.readFile()} >
                          </Input>
                        </Row>
                      </Col>
                      <Col lg="8">
                        <Row>
                          <h5><i className="fa fa-user" title="Estas informações somente você e os administradores do iSujou possuem acesso." /> Dados pessoais</h5>
                        </Row>
                        <Row>
                          <Col lg="6">
                            <FormGroup>
                              <Label for="cpf">CPF</Label>
                              <InputGroup>
                                <Input
                                  type="text"
                                  id="cpf"
                                  name="cpf"
                                  onChange={this.onChange}
                                  value={cpf}
                                  readOnly
                                />
                              </InputGroup>
                            </FormGroup>
                          </Col>
                          <Col lg="6">
                            <FormGroup>
                              <Label for="birthDate">Data de nascimento</Label>
                              <InputGroup>
                                <Input
                                  type="date"
                                  id="birthDate"
                                  name="birthDate"
                                  onChange={this.onChange}
                                  value={birthDate}
                                  readOnly
                                />
                              </InputGroup>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg="6">
                            <FormGroup>
                              <Label for="gender">Gênero <span className="text-danger">*</span></Label>
                              <InputGroup>
                                <Input
                                  type="select"
                                  id="gender"
                                  name="gender"
                                  onChange={this.onChange}
                                  value={gender}
                                >
                                  {Resources.GetGenders().map(property => <option key={property.id} value={property.id}>{property.description}</option>)}
                                </Input>
                              </InputGroup>
                            </FormGroup>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <Col className="mt-4" lg={12}>
                      <Row>
                        <p><small>Somente os campos habilitados podem ser alterados.</small></p>
                      </Row>
                      <Row>
                        <Button color="success" onClick={() => this.save()}>Salvar</Button>
                      </Row>
                    </Col>
                  </TabPane>
                  <TabPane tabId="2" className="p-2">
                    <Row>
                      {this.state.feedBacks?.map(fb => {
                        return (
                          <Col sm="6 my-3" key={fb.Id}>
                            <Card body>
                              <CardTitle><b>{fb.description}</b></CardTitle>
                              <CardText>{fb.date}</CardText>
                            </Card>
                          </Col>
                        )
                      })}
                    </Row>
                  </TabPane>
                </TabContent>
              </Card>
            </Col>
          </Container>
        </main>
        <SimpleFooter />
      </>
    )
  }
}