import {Button, TextField, Typography} from "material-ui";
import React, {Component} from "react";
import FirebaseService from "../../services/FirebaseService";
import {urls} from "../../utils/urlUtils";
import {withRouter} from "react-router-dom";
import { firebaseAuth } from "../../utils/firebaseUtils";
import ImageUploader from 'react-firebase-image-uploader';
import firebase from 'firebase';
 
class Add extends Component {
    
    state = {id: null, 
    empresa: '', 
    endereco: '', 
    avatar: '',
    isUploading: false,
    progress: 0,
    avatarURL: ''};    

    componentWillMount = () => {
        const {id} = this.props.match.params;
        if (!(id === undefined || !id)) {
            this.setState({id});
            FirebaseService.getUniqueDataBy('leituras', id, (data) => this.setState({...data}, () => console.log(this.state)));
        }
    };

    submit = (event) => {
        event.preventDefault();
        const {empresa} = this.state;
        const {endereco} = this.state;
        const {avatarURL} = this.state;   

        let objToSubmit = {
            empresa,
            endereco,  
            avatarURL     
        };

        if (this.props.match.params.id === undefined) {
            FirebaseService.pushData('leituras', objToSubmit);
        } else {
            FirebaseService.updateData(this.props.match.params.id, 'leituras', objToSubmit)
        }
        this.props.history.push(urls.data.path);
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };
    
    handleUploadStart = () => this.setState({isUploading: true, progress: 0})
    handleProgress = (progress) => this.setState({progress});
    handleUploadError = (error) => {
        this.setState({isUploading: false});
        console.error(error);
    }
    handleUploadSuccess = filename => {
        this.setState({ avatar: filename, progress: 100, isUploading: false });
        firebase
          .storage()
          .ref("images")
          .child(filename)
          .getDownloadURL()
          .then(url => this.setState({ avatarURL: url }));
      };


    render = () => {
        return (<React.Fragment>

            <Typography variant="headline" component="h2"></Typography>
            <form onSubmit={this.submit}>
                <TextField className="input-field"
                           type="text"
                           value={this.state.empresa}
                           label="Empresa"
                           required
                           onChange={this.handleChange('empresa')}/>

                <TextField className="input-field"
                           type="text"
                           label="Endereço"
                           value={this.state.endereco}
                           required
                           onChange={this.handleChange('endereco')}/>     

                            <label>Avatar:</label>
                    {this.state.isUploading &&
                        <p>Progress: {this.state.progress}</p>
                    }
                    {this.state.avatarURL &&
                        <img src={this.state.avatarURL} />
                    }
                    <ImageUploader
                        name="avatar"
                        storageRef={firebase.storage().ref('images')}
                        onUploadStart={this.handleUploadStart}
                        onUploadError={this.handleUploadError}
                        onUploadSuccess={this.handleUploadSuccess}
                        onProgress={this.handleProgress}
                    />           

                <Button type="submit"
                        style={{marginTop: '20px', display: 'inline-block'}}>
                    Adicionar
                </Button>
            </form>
        </React.Fragment>)
    }
}

export default withRouter(Add);