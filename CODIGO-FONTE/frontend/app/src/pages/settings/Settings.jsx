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

import Loading from '../../components/Loading/Loading'
import api from '../../services/api'

export default class Settings extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activeTab: '1',
      userId: null,
      name: '',
      description: '',
      feedbacks: [],
      achievements: [],
      loading: false
    }

    this.onChange = this.onChange.bind(this)
  }

  componentDidMount() {
    this.setState({ loading: true })
    // faz o get pelo id do user logado
    this.setState({ loading: false })
  }

  setActiveTab(activeTab) {
    this.setState({ activeTab })
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) this.setActiveTab(tab);
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value })

  save = () => {
    // chama o salvar
  }

  render() {
    const { name, description } = this.state

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
                  <NavItem>
                    <NavLink
                      className={classnames({ active: this.state.activeTab === '3' })}
                      onClick={() => { this.toggle('3'); }}>
                      Conquistas
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId="1" className="p-3">
                    <Row>
                      <Col lg="8">
                        <Row>
                          <Col lg="12">
                            <FormGroup>
                              <Label for="name">Nome</Label>
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
                        </Row>
                        <Row>
                          <Col lg="12">
                            <FormGroup>
                              <Label for="description">Descrição</Label>
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
                        <Row>
                          Foto
                        </Row>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                        <Button color="success" onClick={() => this.save()}>Salvar</Button>
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="2" className="p-2">
                    <Row>
                      <Col sm="6">
                        <Card body>
                          <CardTitle>Special Title Treatment</CardTitle>
                          <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                          <Button>Go somewhere</Button>
                        </Card>
                      </Col>
                      <Col sm="6">
                        <Card body>
                          <CardTitle>Special Title Treatment</CardTitle>
                          <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                          <Button>Go somewhere</Button>
                        </Card>
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="3" className="p-2">
                    <Row>
                      <Col sm="6">
                        <Card body>
                          <CardTitle>Special Title Treatment</CardTitle>
                          <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                          <Button>Go somewhere</Button>
                        </Card>
                      </Col>
                      <Col sm="6">
                        <Card body>
                          <CardTitle>Special Title Treatment</CardTitle>
                          <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                          <Button>Go somewhere</Button>
                        </Card>
                      </Col>
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