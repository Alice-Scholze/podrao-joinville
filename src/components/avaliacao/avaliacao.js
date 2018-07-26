import {Button, TextField, Typography} from "material-ui";
import React, {Component} from "react";
import FirebaseService from "../../services/FirebaseService";
import {urls} from "../../utils/urlUtils";
import {withRouter} from "react-router-dom";
import { firebaseAuth } from "../../utils/firebaseUtils";
import SelectEmpresa from "./selectEmpresa"


class Avaliacao extends Component {

    state = {id: null, sabor: '', custo: '', maionese: '',
            atedimento: '', tempo: '', ambiente: '', observacao: '', empresa: ''};

    componentWillMount = () => {
        const {id} = this.props.match.params;

        if (!(id === undefined || !id)) {
            this.setState({id});
            FirebaseService.getUniqueDataBy('avaliacoes', id, (data) => this.setState({...data}, () => console.log(this.state)));
        }

    };

    submit = (event) => {
        event.preventDefault();

        const {sabor} = this.state;
        const {custo} = this.state;      
        const {maionese} = this.state;      
        const {atedimento} = this.state;      
        const {tempo} = this.state;      
        const {ambiente} = this.state;      
        const {observacao} = this.state; 
        


        let objToSubmit = {
            sabor,
            custo, 
            maionese,
            atedimento,
            tempo,
            ambiente,
            observacao    
        };
        FirebaseService.pushData('avaliacoes', objToSubmit);

    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render = () => {
        return (<React.Fragment>

            <Typography variant="headline" component="h2">Avaliar Empresa</Typography>
            <SelectEmpresa/>
            <form onSubmit={this.submit}>
                <TextField className="input-field"
                           type="text"
                           value={this.state.sabor}
                           label="Sabor"
                           required
                           onChange={this.handleChange('sabor')}/>

                <TextField className="input-field"
                           type="text"
                           label="Custo"
                           value={this.state.custo}
                           required
                           onChange={this.handleChange('custo')}/>                

                <TextField className="input-field"
                           type="text"
                           label="Maionese"
                           value={this.state.maionese}
                           required
                           onChange={this.handleChange('maionese')}/>

                <TextField className="input-field"
                           type="text"
                           label="Atendimento"
                           value={this.state.atendimento}
                           required
                           onChange={this.handleChange('atendimento')}/>
                
                <TextField className="input-field"
                           type="text"
                           label="Tempo"
                           value={this.state.tempo}
                           required
                           onChange={this.handleChange('tempo')}/>

                <TextField className="input-field"
                           type="text"
                           label="Ambiente"
                           value={this.state.ambiente}
                           required
                           onChange={this.handleChange('ambiente')}/>

                <TextField className="input-field"
                           type="text"
                           label="Observação"
                           value={this.state.observacao}
                           required
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