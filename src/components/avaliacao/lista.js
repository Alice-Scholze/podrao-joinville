import {TextField} from "material-ui";
import React, {Component} from "react";
import {urls} from "../../utils/urlUtils";
import {withRouter} from "react-router-dom";
import SelectEmpresa from "./selectEmpresa";
import {RadioGroup, Radio} from 'react-radio-group';
import {Button, Table, TableBody, TableCell, TableHead, TableRow, Typography} from "material-ui";
import FirebaseService from "../../services/FirebaseService";
import {firebaseDatabase, firebaseAuth} from '../../utils/firebaseUtils'

var teste = null;
class ListaAvaliacao extends Component {
    constructor(props){
        super(props);
        this.state = {
          options: []
        }
      }
    loadAvaliacoes() {
        let query = firebaseDatabase.ref('avaliacoes').limitToLast(100);
        query.on('value', dataSnapshot => {
            let items = [];
            dataSnapshot.forEach(childSnapshot => {
                let item = childSnapshot.val();
                item['key'] = childSnapshot.key;
                items.push({
                    sabor: item.sabor,
                    custo: item.custo,
                    maionese: item.maionese,
                    atendimento: item.ambiente,
                    tempo: item.tempo,
                    ambiente: item.atendimento,
                    observacao: item.observacao,
                    nomeEmpresa: item.nomeEmpresa,
                    keyEmpresa: item.keyEmpresa
                });
            });
            this.setState({options: items});
        });
      }
    
      componentWillMount() {
        this.loadAvaliacoes();
      }

    render = () => {
        return (<React.Fragment>
        <Typography variant="headline" component="h2">Lista dos Podrões </Typography>
        <Table selectable="false">
            <TableHead>
                <TableRow>              
                    <TableCell>Empresa</TableCell>
                    <TableCell>Sabor</TableCell>  
                    <TableCell>Custo</TableCell>  
                    <TableCell>Maionese</TableCell>  
                    <TableCell>Atendimento</TableCell>  
                    <TableCell>Tempo</TableCell>  
                    <TableCell>Ambiente</TableCell>  
                    <TableCell>Observação</TableCell>  
                     
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    this.state.options.map((item, index) =>
                        <TableRow key={index}>                           
                            <TableCell>{item.nomeEmpresa}</TableCell>
                            <TableCell>{item.sabor}</TableCell>
                            <TableCell>{item.custo}</TableCell>
                            <TableCell>{item.maionese}</TableCell>
                            <TableCell>{item.atendimento}</TableCell>
                            <TableCell>{item.tempo}</TableCell>
                            <TableCell>{item.ambiente}</TableCell>
                            <TableCell>{item.observacao}</TableCell>
                        </TableRow>
                    )
                }
            </TableBody>
        </Table>
        </React.Fragment>)
    }
}

export default withRouter(ListaAvaliacao);