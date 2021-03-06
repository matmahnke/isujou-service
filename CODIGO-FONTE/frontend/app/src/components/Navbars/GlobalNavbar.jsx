import React from 'react'
import { Link } from 'react-router-dom'
import Headroom from 'headroom.js'
import { isAuthenticated } from './../../services/auth'

import {
  Button,
  UncontrolledCollapse,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col
} from 'reactstrap'

class GlobalNavbar extends React.Component {
  componentDidMount() {
    let headroom = new Headroom(document.getElementById("navbar-main"));
    // initialise
    headroom.init();
  }
  state = {
    collapseClasses: "",
    collapseOpen: false
  };

  onExiting = () => {
    this.setState({
      collapseClasses: "collapsing-out"
    });
  };

  onExited = () => {
    this.setState({
      collapseClasses: ""
    });
  };

  montarBotaoLoginPerfil() {
    if (!isAuthenticated()) {
      return <Button
        className="btn-neutral"
        color="secondary"
        href="/login"
      >
        <span className="nav-link-inner--text ml-1">
          Login
        </span>
      </Button>
    }
  }

  render() {
    return (
      <>
        <header className="header-global">
          <Navbar
            className="navbar-main navbar-transparent headroom"
            expand="lg"
            id="navbar-main"
          >
            <Container>
              <NavbarBrand className="mr-lg-5" to="/" tag={Link}>
                <img
                  alt="..."
                  src={require("../../assets/img/brand/logo-2-branco.png")}
                />
              </NavbarBrand>
              <button className="navbar-toggler" id="navbar_global">
                <span className="navbar-toggler-icon" />
              </button>
              <UncontrolledCollapse
                toggler="#navbar_global"
                navbar
                className={this.state.collapseClasses}
                onExiting={this.onExiting}
                onExited={this.onExited}
              >
                <div className="navbar-collapse-header">
                  <Row>
                    <Col className="collapse-brand" xs="6">
                      <Link to="/">
                        <img
                          alt="..."
                          src={require("../../assets/img/brand/logo-2-azul.png")}
                        />
                      </Link>
                    </Col>
                    <Col className="collapse-close" xs="6">
                      <button className="navbar-toggler" id="navbar_global">
                        <span />
                        <span />
                      </button>
                    </Col>
                  </Row>
                </div>

                <Nav className="navbar-nav-hover align-items-lg-center" navbar>
                  <NavItem>
                    <NavLink href="/adverts">Anúncios</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/rules">Regras</NavLink>
                  </NavItem>
                  <UncontrolledDropdown nav inNavbar hidden={!isAuthenticated()}>
                    <DropdownToggle nav caret>
                      Minha Conta
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem href={"/profile/" + localStorage.getItem('currentUserId')}>
                        Meu perfil
                      </DropdownItem>
                      <DropdownItem href="/settings">
                        Configuracoes
                      </DropdownItem>
                      <DropdownItem divider />
                      <span className="small text-uppercase pl-3 text-black"><strong>Gerenciar</strong></span>
                      <DropdownItem href="/properties">
                        Imóveis
                      </DropdownItem>
                      <DropdownItem href="/adverts/mine">
                        Anúncios
                      </DropdownItem>
                      <DropdownItem href="/proposals/mine">
                        Propostas
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem href="/logout">
                        Desconectar
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </Nav>
                <Nav className="align-items-lg-center ml-lg-auto">
                  <NavItem className="d-none d-lg-block ml-lg-4">
                    {this.montarBotaoLoginPerfil()}
                  </NavItem>
                </Nav>
              </UncontrolledCollapse>
            </Container>
          </Navbar>
        </header>
      </>
    );
  }
}

export default GlobalNavbar;
