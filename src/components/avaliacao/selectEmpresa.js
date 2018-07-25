import Select from 'react-select';
import {Button, TextField, Typography} from "material-ui";
import React, {Component} from "react";
import FirebaseService from "../../services/FirebaseService";
import {urls} from "../../utils/urlUtils";
import {withRouter} from "react-router-dom";
import { firebaseAuth } from "../../utils/firebaseUtils";

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
];

class Avaliacao extends Component {
  state = {
    selectedOption: null,
  }

  componentDidMount() {
    
    var teste = FirebaseService.getDataList('leituras', (dataReceived) => this.setState({data: dataReceived}))
    console.log("Teste:   ");
    console.log(teste);
}

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  }
  render() {
    const { selectedOption } = this.state;

    return (
      <Select
        value={selectedOption}
        onChange={this.handleChange}
        options={options}
      />
    );
  }
}

export default withRouter(Avaliacao);