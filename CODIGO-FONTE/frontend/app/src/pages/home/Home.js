import React from "react";

import { Container, Row } from "reactstrap";

import DemoNavbar from "../../components/Navbars/DemoNavbar.js";
import CardsFooter from "../../components/Footers/CardsFooter.js";

class Home extends React.Component {
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }
  render() {
    return (
      <>
        <DemoNavbar />
        <main ref="main">

        </main>
        <CardsFooter />
      </>
    );
  }
}

export default Home;
