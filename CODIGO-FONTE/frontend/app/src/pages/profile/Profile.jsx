import React, { Component } from 'react'

import {
  Card,
  Container,
  Row,
  Col,
  Table
} from 'reactstrap'

import GlobalNavbar from '../../components/Navbars/GlobalNavbar'
import SimpleFooter from '../../components/Footers/SimpleFooter'
import api from '../../services/api'
import Resources from '../../store/Resources'
import Loading from '../../components/Loading/Loading'

import './Profile.css';

export default class Profile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: null,
      name: 'Perfil',
      photoUrl: null,
      amountAdverts: 0,
      amountAssessments: 0,
      description: 'Descição',
      achievements: [],
      loading: false
    }
  }

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;

    this.setState({ loading: true })

    // Faz a requisição
    if (this.props.match.params?.id) {
      const id = this.props.match.params.id;

      api.get('/profile/' + id)
        .then(resp => {
          const { data } = resp;
          var model = {
            id: id,
            name: data.name,
            photoUrl: data.photoUrl,
            amountAdverts: data.amountAdverts,
            amountAssessments: data.amountAssessments,
            achievements: data.achievements,
            description: data.description
          }

          this.setState(model)
        })
        .catch((ex) => {
          console.log(ex)
        })
        .finally(() => {
          this.setState({ loading: false })
        })

      this.setState({ id })
    }
  }

  render() {
    return (
      <>
        <Loading hidden={!this.state.loading} />
        <GlobalNavbar />
        <main className="profile-page" ref="main">
          <section className="section-profile-cover section-shaped my-0">
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
            {/* SVG separator */}
            <div className="separator separator-bottom separator-skew">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="fill-white"
                  points="2560 0 2560 100 0 100"
                />
              </svg>
            </div>
          </section>
          <section className="section">
            <Container>
              <Card className="card-profile shadow mt--400">
                <Col md={12} className="px-4">
                  <Row className="justify-content-center mb-4 profile-image">
                    <img
                      alt="..."
                      className="rounded-circle shadow shadow-lg--hover"
                      src={this.state.photoUrl ?? require("../../assets/img/icons/no-image.png")}
                    />
                  </Row>
                  <Row className="justify-content-center ">
                    <h3>
                      {this.state.name}
                    </h3>
                  </Row>
                  <Row className="justify-content-center mb-3">
                    <div className="card-profile-stats d-flex justify-content-center">
                      <div>
                        <span className="heading">{this.state.amountAdverts}</span>
                        <span className="description">{'Anúncio' + (this.state.amountAdverts !== 1 ? 's' : '')}</span>
                      </div>
                      <div>
                        <span className="heading">{this.state.achievements.length}</span>
                        <span className="description">{'Conquista' + (this.state.achievements.length !== 1 ? 's' : '')}</span>
                      </div>
                      <div>
                        <span className="heading">{this.state.amountAssessments}</span>
                        <span className="description">{'Avaliaç' + (this.state.amountAssessments !== 1 ? 'ões' : 'ão')}</span>
                      </div>
                    </div>
                  </Row>
                  <Row className="mt-5 justify-content-center" hidden={this.state.description?.length === 0}>
                    <Col lg="9" className="border-top py-5 text-center">
                      <p>
                        {this.state.description}
                      </p>
                    </Col>
                  </Row>
                  <Row className="justify-content-center" hidden={this.state.achievements?.length === 0}>
                    <Col lg="9" className="border-top py-5">
                      <h4>
                        Conquistas
                        </h4>
                      <Table responsive borderless striped>
                        <tbody>
                          {this.state.achievements.map(achievement =>
                            <tr>
                              <td>{achievement.description}</td>
                              <td className="text-right">{achievement.points} <i className="fa fa-star text-yellow"></i></td>
                            </tr>)}
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                </Col>
              </Card>
            </Container>
          </section>
        </main>
        <SimpleFooter />
      </>
    );
  }
}