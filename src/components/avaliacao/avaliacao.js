import {Button, TextField, Typography} from "material-ui";
import React, {Component} from "react";
import FirebaseService from "../../services/FirebaseService";
import {urls} from "../../utils/urlUtils";
import {withRouter} from "react-router-dom";
import { firebaseAuth } from "../../utils/firebaseUtils";
import SelectEmpresa from "./selectEmpresa";
import {RadioGroup, Radio} from 'react-radio-group';

var teste = null;
class Avaliacao extends Component {

    state = {id: null, sabor: '', custo: '', maionese: '',
            atendimento: '', tempo: '', ambiente: '', observacao: '', nomeEmpresa: '', keyEmpresa: ''};

    componentWillMount = () => {
        const {id} = this.props.match.params;

        if (!(id === undefined || !id)) {
            this.setState({id});
            FirebaseService.getUniqueDataBy('avaliacoes', id, (data) => this.setState({...data}, () => console.log(this.state)));
        }

    };

    submit = (event) => {
        event.preventDefault();
        let empresa = SelectEmpresa.OptionSelected();
        var {sabor} = this.state;
        var {custo} = this.state;      
        var {maionese} = this.state;      
        var {atendimento} = this.state;      
        var {tempo} = this.state;      
        var {ambiente} = this.state;      
        const {observacao} = this.state; 
        var nomeEmpresa = empresa.label;
        var keyEmpresa = empresa.value;
        


        let objToSubmit = {
            sabor,
            custo, 
            maionese,
            atendimento,
            tempo,
            ambiente,
            observacao,
            nomeEmpresa,
            keyEmpresa    
        };
        FirebaseService.pushData('avaliacoes', objToSubmit);
        this.props.history.push(urls.home.path);
    };

    handleChange = name => event => {
        if(name == 'observacao'){
            this.setState({
                [name]: event.target.value
            });
        }else{
            this.setState({
                [name]: event
            });
        }
    };
    render = () => {
        return (<React.Fragment>
            
            <Typography variant="headline" component="h2">Avaliar Empresa</Typography>
            <SelectEmpresa/>
            <br/>
            <form onSubmit={this.submit}>
                <label>Sabor</label>
                <RadioGroup name="sabor" sabor={this.state.sabor} onChange={this.handleChange('sabor')}>
                <Radio value="1" />1
                <Radio value="2" />2
                <Radio value="3" />3
                <Radio value="4" />4
                <Radio value="5" />5
                </RadioGroup>

                <label>Custo</label>
                <RadioGroup name="custo" custo={this.state.custo} onChange={this.handleChange('custo')}>
                <Radio value="1" />1
                <Radio value="2" />2
                <Radio value="3" />3
                <Radio value="4" />4
                <Radio value="5" />5
                </RadioGroup>

                <label>Maiones</label>
                <RadioGroup name="maionese" maionese={this.state.maionese} onChange={this.handleChange('maionese')}>
                <Radio value="1" />1
                <Radio value="2" />2
                <Radio value="3" />3
                <Radio value="4" />4
                <Radio value="5" />5
                </RadioGroup>          

                <label>Atendimento</label>
                <RadioGroup name="atendimento" atendimento={this.state.atendimento} onChange={this.handleChange('atendimento')}>
                <Radio value="1" />1
                <Radio value="2" />2
                <Radio value="3" />3
                <Radio value="4" />4
                <Radio value="5" />5
                </RadioGroup>

                <label>Tempo</label>
                <RadioGroup name="tempo" tempo={this.state.tempo} onChange={this.handleChange('tempo')}>
                <Radio value="1" />1
                <Radio value="2" />2
                <Radio value="3" />3
                <Radio value="4" />4
                <Radio value="5" />5
                </RadioGroup>       

                <label>Ambiente</label>
                <RadioGroup name="ambiente" ambiente={this.state.ambiente} onChange={this.handleChange('ambiente')}>
                <Radio value="1" />1
                <Radio value="2" />2
                <Radio value="3" />3
                <Radio value="4" />4
                <Radio value="5" />5
                </RadioGroup>

                <TextField className="input-field"
                           type="text"
                           label="Observação"
                           value={this.state.observacao}
                           
                           onChange={this.handleChange('observacao')}/>
                <Button type="submit"
                        style={{marginTop: '20px', display: 'inline-block'}}>
                    Adicionar
                </Button>
            </form>
        </React.Fragment>)
    }
}

export default withRouter(Avaliacao);