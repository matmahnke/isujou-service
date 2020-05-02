import React from "react";
// react plugin used to create datetimepicker
import ReactDatetime from "react-datetime";

// reactstrap components
import {
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
  Row
} from "reactstrap";

class DatePicker extends React.Component {
  state = {};
  render() {
    return (
      <>
        <FormGroup>
          <InputGroup className="input-group-alternative">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className="ni ni-calendar-grid-58" />
              </InputGroupText>
            </InputGroupAddon>
            <ReactDatetime
              inputProps={{
                placeholder: this.props.placeholder,
                id: this.props.id ?? "",
                required: this.props.required
              }}
              timeFormat={false}
            />
          </InputGroup>
        </FormGroup>
      </>
    );
  }
}

export default DatePicker;