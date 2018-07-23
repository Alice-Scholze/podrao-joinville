// eslint-disable-next-line
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBqrt990gofaOgxf7V3IJCJDoS96eXMLJI",
    authDomain: "podrao-88da8.firebaseapp.com",
    databaseURL: "https://podrao-88da8.firebaseio.com",
    storageBucket: "podrao-88da8.appspot.com"
  };
  firebase.initializeApp(config);

class UpdateableItem extends Component {
  constructor (props) {
    super(props);
    this.state = {
      name: props.name,
      adress:  props.adress
    };
    this.dbItems = firebase.database().ref().child('items');

    this.itemChange = this.itemChange.bind(this);
    this.handleUpdateItem = this.handleUpdateItem.bind(this);
  }

  itemChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleUpdateItem(e) {
    e.preventDefault();
    if (this.state.name && this.state.name.trim().length !== 0) {
      this.dbItems.child(this.props.dbkey).update(this.state);
    }
  }

  render(){
    return (
      <form onSubmit={ this.handleUpdateItem }>
        <label htmlFor={this.props.dbkey + 'itemname'}>Nome:</label>
        
        <input 
          id={this.props.dbkey + 'itemname'}
          onChange={ this.itemChange } 
          value={ this.state.name } 
          name="name"
        />
        <br/>
        <label htmlFor={this.props.dbkey + 'itemadress'}>Endereço: </label>
      
        <input 
          id={this.props.dbkey + 'itemadress'}        
          onChange={ this.itemChange } 
          value={ this.state.adress } 
          name="adress"
        />
        <button>Save</button>
      </form>
    );
  }
}

class App extends Component {
  constructor () {
    super();
    this.state = {
      items: [],
      newitemname : ''
    };
    this.dbItems = firebase.database().ref().child('items');

    this.onNewItemChange = this.onNewItemChange.bind(this);
    this.handleNewItemSubmit = this.handleNewItemSubmit.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  componentDidMount() {
    this.dbItems.on('value', dataSnapshot => {
      var items = [];

      dataSnapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();
        item['.key'] = childSnapshot.key;
        items.push(item);
      });

      this.setState({
        items: items
      });
    });
  }

  componentWillUnmount() {
    this.dbItems.off();
  }

  handleNewItemSubmit(e) {
    e.preventDefault();
    if (this.state.newitemname && this.state.newitemname.trim().length !== 0) {
      this.dbItems.push({
        name: this.state.newitemname

      });
      this.setState({
        newitemname: ''
      });
    }
  }

  onNewItemChange(e) {
    this.setState({newitemname: e.target.value});

  }

  removeItem(key){
    this.dbItems.child(key).remove();
  }

  render() {
    var _this = this;
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>
            Podrão
          </h2>
        </div>
        <ul>
          {this.state.items.map(function(item) {
            return ( 
              <li key={ item['.key'] }>
                <UpdateableItem dbkey={item['.key']} name={item.name}  adress={item.adress} />
                <a onClick={ _this.removeItem.bind(null, item['.key']) } style={{cursor: 'pointer', color: 'red'}}>Delete</a>
              </li>
            );
          })}
        </ul>
        <form onSubmit={ this.handleNewItemSubmit }>
          <input 
            onChange={ this.onNewItemChange } 
            value={ this.state.newitemname } 
          />     
          <button>Adicionar</button>
        </form>
      </div>
    );
  }
}


export default App;