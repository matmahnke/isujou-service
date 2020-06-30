import React from 'react'
import { Alert } from 'reactstrap'

export default class ErrorAlert extends React.Component {
    render() {
        return (
            <Alert color="danger" isOpen={this.props.isOpen} toggle={this.props.toggle}>
                <h5 className="text-white"><i className="fa fa-exclamation-triangle"/> {this.props.title ?? 'Foram encontrados os seguintes problemas'}</h5>
                {this.props.message}
            </Alert  >
        )
    }
}