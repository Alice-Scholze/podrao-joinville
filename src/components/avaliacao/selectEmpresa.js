import Select from 'react-select';
import {Button, TextField, Typography} from "material-ui";
import React, {Component} from "react";

import FirebaseService from "../../services/FirebaseService";
import {urls} from "../../utils/urlUtils";
import {withRouter} from "react-router-dom";
import {firebaseDatabase, firebaseAuth} from '../../utils/firebaseUtils'



/*const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
];*/

class Avaliacao extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedOption: null,
      options: []
    }
  }

  loadLeituras() {
    console.log("oi");
    let query = firebaseDatabase.ref('leituras').limitToLast(100);
    query.on('value', dataSnapshot => {
        let items = [];
        dataSnapshot.forEach(childSnapshot => {
            let item = childSnapshot.val();
            item['key'] = childSnapshot.key;
            items.push({
              value: item.key,
              label: item.empresa
            });
        });
        this.setState({options: items});
    });
  }

  componentWillMount() {
    this.loadLeituras();
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
        options={this.state.options}
      />
      
    );
  }
}

export default withRouter(Avaliacao);