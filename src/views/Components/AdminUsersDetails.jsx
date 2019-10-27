import React from "react";

// Api
import api from "../../Utils/api";

//Styles
import classNames from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";
import AdminUsersDetailsStyle from "assets/jss/material-kit-react/views/AdminUsersDetails.jsx";

//Components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import Button from 'components/CustomButtons/Button.jsx';

// Icons
import CloseIcon from '@material-ui/icons/Close';

class AdminUsersDetails extends React.Component {
    constructor(props) {
        super(props);
        this.handleCloseUsersMessageSuccess = this.handleCloseUsersMessageSuccess.bind(this);  
        this.handleCloseUsersMessageFailure = this.handleCloseUsersMessageFailure.bind(this);  
        this.state = {
            id: null,
            name: "",
            user: "",
            password: "",
            nameFilled: true,
            userFilled: true,
            passwordFilled: true,
            showSaveSuccess: false,
            showSaveFailure: false
        };
    }
    componentDidMount(){
        const dataObject = this.props.dataObject;
        
        if(dataObject !== undefined){
            this.setState({
                id: dataObject._id,
                name: dataObject.name, 
                user: dataObject.userLogin
            });
        }
    }
    updateInputState(stateName, newValue){
        this.setState({
            [stateName]: newValue.currentTarget.value
        });
    }
    async saveUser(){
        let fullFilled = true;
        if(this.state.name === ""){
            fullFilled = false;
            this.setState({nameFilled: false});
        }
        else {
            this.setState({nameFilled: true});
        }

        if(this.state.user === ""){
            fullFilled = false;
            this.setState({userFilled: false});
        }
        else {
            this.setState({userFilled: true});
        }

        if(this.state.password === ""){
            fullFilled = false;
            this.setState({passwordFilled: false});
        }
        else {
            this.setState({passwordFilled: true});
        }

        if(fullFilled){
            const _this = this;
            const Users = {
                name: this.state.name,
                userLogin: this.state.user,
                password: this.state.password
            }
            
            if(this.state.id === null){
                // Insert
                const UsersInserted = await api.post('/usersAdmin', Users)                
                .then((item) => {
                    _this.setState({id: item.data._id, showUsersSuccess: true});
                })
                .catch(() => {
                    _this.setState({showUsersSuccess: true});
                })
            }
            else {
                // Update
                Users._id = this.state.id;

                const UsersUpdated = await api.put(`/usersAdmin/${this.state.id}`, Users)                
                .then(() => {
                    _this.setState({showUsersSuccess: true});
                })
                .catch(() => {
                    _this.setState({showUsersSuccess: true});
                })
            }
        }
    }
    handleCloseUsersMessageSuccess(){
      if(this.state.showUsersSuccess){
        this.setState({showUsersSuccess: false});
      }
    }
    handleCloseUsersMessageFailure(){
      if(this.state.showUsersFailure){
        this.setState({showUsersFailure: false});
      }
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.container}>
                <div className={classes.section}>
                    <GridContainer xs={12}>
                        <GridItem xs={12} className={classNames(classes.nameWrning, classes.name)}>
                            <h3>Editar Usuário</h3>
                        </GridItem>
                        <GridItem xs={12}>
                            <CustomInput
                                labelText="Nome"
                                id="name"
                                error={!this.state.nameFilled}
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    onChange: evt => this.updateInputState("name", evt),
                                    maxlength: 100,
                                    value: this.state.name
                                }}
                            />
                        </GridItem>
                        <GridItem xs={6}>
                            <CustomInput
                                labelText="Usuário"
                                id="user"
                                error={!this.state.userFilled}
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    onChange: evt => this.updateInputState("user", evt),
                                    value: this.state.user
                                }}
                            />
                        </GridItem>
                        <GridItem xs={6}>
                            <CustomInput
                                labelText="Password"
                                id="user"
                                error={!this.state.passwordFilled}
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    onChange: evt => this.updateInputState("password", evt),
                                    value: this.state.password,
                                    type: "password"
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} className={classes.contactSendMessage}>
                            <Button className={classes.buttonContactSendMessage} onClick={() => this.saveUser()} type="button" color="primary">Salvar</Button>
                        </GridItem> 
                    </GridContainer>
                </div>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.showUsersSuccess}
                    autoHideDuration={6000}
                    onClose={this.handleCloseUsersMessageSuccess}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">Usuário atualizado com sucesso!</span>}
                    action={[
                        <IconButton
                        key="close"
                        aria-label="close"
                        color="inherit"
                        className={classes.close}
                        onClick={this.handleCloseUsersMessageSuccess}
                        >
                        <CloseIcon />
                        </IconButton>,
                    ]}
                    />
                    <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.showUsersFailure}
                    autoHideDuration={6000}
                    onClose={this.handleCloseUsersMessageFailure}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">Houve um erro ao atualizar o usuário, tente novamente mais tarde.</span>}
                    action={[
                        <IconButton
                        key="close"
                        aria-label="close"
                        color="inherit"
                        className={classes.close}
                        onClick={this.handleCloseUsersMessageFailure}
                        >
                        <CloseIcon />
                        </IconButton>,
                    ]}
                    />
            </div>
        )
    }
}

export default withStyles(AdminUsersDetailsStyle)(AdminUsersDetails);