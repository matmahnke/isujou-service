import React, { Component, Fragment } from 'react'

import {
  Button,
  FormGroup,
  FormFeedback,
  Input,
  ListGroup,
  ListGroupItem,
  Row,
  Col
} from 'reactstrap'

export default class Advert extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: '',
      items: props.items ?? [],
      erroMesasge: ''
    };

    this.addItem = this.addItem.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  addItem() {
    const { item, items } = this.state;

    if (!this.props.allowDuplicatedItems && items.indexOf(item) !== -1)
      this.setState({ erroMesasge: 'Não são permitidos itens duplicados.' })
    else
      this.setState({
        item: '',
        items: [].concat(items, item)
      });
  }

  handleChange(event) {
    this.setState({ item: event.target.value, erroMesasge: '' });
  }

  removeItem(item) {
    const { items } = this.state;

    const index = items.indexOf(item);
    if (index > -1) {
      items.splice(index, 1);
    }

    this.setState({ items });
  }

  render() {
    return (
      <Fragment>
        <Row>
          <Col md={11}>
            <FormGroup>
              <Input
                type="text"
                id="itemTitle"
                required
                minLength={2}
                placeholder="Nome da atividade"
                onChange={this.handleChange}
                value={this.state.item}
                invalid={this.state.erroMesasge !== ""}
              />
              <FormFeedback hidden={this.state.erroMesasge === ""}>{this.state.erroMesasge}</FormFeedback>
            </FormGroup>
          </Col>
          <Col md={1}>
            <Button onClick={this.addItem} disabled={this.state.item.length < this.props.minLengthForItems || this.state.erroMesasge !== ""} color="primary">
              <i className="fa fa-plus"></i>
            </Button>
          </Col>
        </Row>
        <ListGroup id={this.props.id ?? "itemList"}>
          {this.state.items.map(item =>
            <ListGroupItem key={item} data-value={item}>{item} <button color="danger" className="fa fa-remove btn btn-danger btn-sm float-right" size="sm" onClick={() => this.removeItem(item)} /></ListGroupItem>)
          }
        </ListGroup>
      </Fragment>
    );
  }
}