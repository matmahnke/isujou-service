import React from 'react'

import {
  Button,
  Container,
  Col,
  Row,
  InputGroup,
  Input,
  Card,
  CardHeader,
  CardBody
} from 'reactstrap'

import GlobalNavbar from '../../components/Navbars/GlobalNavbar'
import SimpleFooter from '../../components/Footers/SimpleFooter'
import Achievements from '../../store/Achievements'
import Loading from '../../components/Loading/Loading'
import Error from '../../components/Error/Error'
import api from '../../services/api'
import $ from 'jquery'

import './FeedBack.css'

export default class FeedBack extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      userId: null,
      userName: '',
      description: '',
      achievement: null,
      loading: false,
      error: null
    }

    this.onChange = this.onChange.bind(this)
  }

  componentDidMount() {
    if (this.props.match.params?.id) {
      const id = this.props.match.params.id;

      api.get('/profile/' + id)
        .then(resp => {
          const { data } = resp;

          this.setState({ userName: data.name })
        })
        .catch((error) => {
          this.setState({ error })
        })
        .finally(() => {
          this.setState({ loading: false })
        })

      this.setState({ id })
    }
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value })

  setAchievement(id) {
    var achievement = this.state.achievement;

    if (achievement)
      $('li[data-id="' + achievement + '"]').removeClass('selected')

    if (achievement !== id) {
      $('li[data-id="' + id + '"]').addClass('selected')
      this.setState({ achievement: id })
    }
    else
      this.setState({ achievement: null })
  }

  enviar() {
    console.log(this.state)
  }

  render() {
    const { description } = this.state

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

          <section className="section mt--3">
            <Container>
              <Card className="shadow border-0">
                <CardHeader>
                  <h2>O que você achou de {this.state.userName}?</h2>
                </CardHeader>
                <CardBody>
                  <Col>
                    <Row>
                      <h5>O que tem a dizer sobre sua experiência? <span className="text-danger">*</span></h5>
                    </Row>
                    <Row>
                      <InputGroup>
                        <Input
                          type="textarea"
                          id="description"
                          name="description"
                          onChange={this.onChange}
                          value={description}
                          placeholder="Digite algo..."
                          required
                        />
                      </InputGroup>
                    </Row>
                    <br />
                    <Row>
                      <h5>Gostaria de recomendar algum dos itens abaixo?</h5>
                    </Row>
                    <Row>
                      Basta clicar no ícone!
                    </Row>
                    <Row>
                      <ul className="feedbackAchievements">
                        {Achievements.GetAll().map(achievement => <li className={"achievement rounded-circle"} key={achievement.id} data-id={achievement.id} onClick={() => this.setAchievement(achievement.id)}><img title={achievement.description} alt={achievement.description} src={achievement.icon} /></li>)}
                      </ul>
                    </Row>
                    <Row hidden={!this.state.achievement}>
                      {"Você irá recomendá-lo com '" + Achievements.GetAll()[this.state.achievement - 1]?.description + "'"}
                    </Row>
                  </Col>
                  <hr />
                  <Col>
                    <Row>
                      <Button color="success" onClick={() => this.enviar()}>Enviar</Button>
                    </Row>
                  </Col>
                </CardBody>
              </Card>
            </Container>
          </section>
        </main>
        <SimpleFooter />
      </>
    )
  }
}