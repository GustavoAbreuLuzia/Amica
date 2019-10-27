import React from "react";

// Api
import api from "../../Utils/api";

// Icons
import CloseIcon from '@material-ui/icons/Close';

//Components
import MaterialTable from "material-table";
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

class AdminUsers extends React.Component {
    constructor(props) {
        super(props);
        this.handleCloseUsersMessageSuccess = this.handleCloseUsersMessageSuccess.bind(this);  
        this.handleCloseUsersMessageFailure = this.handleCloseUsersMessageFailure.bind(this);  
        this.state = {
            listUsers: [],
            showUsersSuccess: false,
            showUsersFailure: false
          };
    }
    async componentDidMount(){
        const Users = await api.get('/usersAdmin');
  
        this.setState({listUsers: Users.data});
    }
    createUsers() {
        this.props.changeCurrentPage("UsersDetail");
    }
    async deleteUsers(id) {
        const _this = this;
        const Users = await api.put(`/usersAdmin/${id}`, { status: false })
        .then(() => {
            const listUsersUpdated = _this.state.listUsers.filter((Users) => {
                return Users._id !== id;
            });
            
            this.setState({listUsers: listUsersUpdated})
            _this.setState({showUsersSuccess: true});
        })
        .catch(() => {
            _this.setState({showUsersSuccess: true});
        })
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
        return (
            <div style={{width: "100%"}}>
                <MaterialTable
                    style={{ padding: "10px 30px", width: "100%" }}
                    title="Usuários"
                    columns={[
                        { title: 'Nome', field: 'name' },
                        { title: 'Usuário', field: 'userLogin' }
                    ]}
                    data={this.state.listUsers}        
                    actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Editar',
                        onClick: (event, rowData) => this.props.changeCurrentPage("UsersDetail", rowData)
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Deletar',
                        onClick: (event, rowData) => this.deleteUsers(rowData._id)
                    },
                    {
                        icon: 'add',
                        tooltip: 'Criar Notícia',
                        isFreeAction: true,
                        onClick: (event) => this.createUsers()
                    }
                    ]}
                    localization={{
                        header: {
                            actions: "Ações"
                        }
                    }}                
                />
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
                    message={<span id="message-id">Usuário deletado com sucesso!</span>}
                    action={[
                        <IconButton
                        key="close"
                        aria-label="close"
                        color="inherit"
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
                    message={<span id="message-id">Houve um erro ao deletar o usuário, tente novamente mais tarde.</span>}
                    action={[
                        <IconButton
                        key="close"
                        aria-label="close"
                        color="inherit"
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

export default AdminUsers;