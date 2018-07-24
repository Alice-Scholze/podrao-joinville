import React from 'react';
import {Button, Table, TableBody, TableCell, TableHead, TableRow, Typography} from "material-ui";
import FirebaseService from "../../services/FirebaseService";
import {Link} from "react-router-dom";
import {privateUrls} from "../../utils/urlUtils";

export const DataTable = ({data}) => {

    const remove = (id) => {
        FirebaseService.remove(id, 'leituras');
    };

    return <React.Fragment>
        <Typography variant="headline" component="h2">Lista dos Podrões </Typography>
        <Table selectable="false">
            <TableHead>
                <TableRow>              
                    <TableCell>Nome</TableCell>
                    <TableCell>Endereço</TableCell>  
                     
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    data.map((item, index) =>
                        <TableRow key={index}>                           
                            <TableCell>{item.empresa}</TableCell>
                            <TableCell>{item.endereco}</TableCell>   
                            <TableCell>
                                <Button onClick={() => remove(item.key)}>
                                    Remover
                                </Button>

                                <Button component={props => <Link to={privateUrls.edit.pathWithouParam + item.key} {...props}/>}>
                                    Editar
                                </Button>

                            </TableCell>
                        </TableRow>
                    )
                }
            </TableBody>
        </Table>
    </React.Fragment>
};