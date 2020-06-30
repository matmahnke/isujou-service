import React from 'react'

import {
  Container,
  Row,
  Col
} from 'reactstrap'

class SimpleFooter extends React.Component {
  render() {
    return (
      <>
        <footer className="footer">
          <Container>
            <hr />
            <Row className="align-items-center justify-content-md-between">
              <Col md="12">
                <div className="copyright">
                  © {new Date().getFullYear()}{" "} iSujou
                </div>
              </Col>
            </Row>
          </Container>
        </footer>
      </>
    );
  }
}

export default SimpleFooter;
