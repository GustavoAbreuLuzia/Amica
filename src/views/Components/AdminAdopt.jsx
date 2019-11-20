import React from "react";

// Api
import api from "../../Utils/api";

// Icons
import CloseIcon from '@material-ui/icons/Close';

//Components
import MaterialTable from "material-table";
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

class AdminAdopt extends React.Component {
    constructor(props) {
        super(props);
        this.handleCloseAdoptMessageSuccess = this.handleCloseAdoptMessageSuccess.bind(this);  
        this.handleCloseAdoptMessageFailure = this.handleCloseAdoptMessageFailure.bind(this);  
        this.state = {
            listAdopt: [],
            showAdoptSuccess: false,
            showAdoptFailure: false
          };
    }
    async componentDidMount(){
        const adopt = await api.get('/api/Adopt', {
          params: {
            quantity: 100
          }
        });
  
        this.setState({listAdopt: adopt.data});
    }
    createAdopt() {
        this.props.changeCurrentPage("AdoptDetail");
    }
    async deleteAdopt(id) {
        const _this = this;
        const adopt = await api.put(`/api/Adopt/${id}`, { status: false })
        .then(() => {
            const listAdoptUpdated = _this.state.listAdopt.filter((adopt) => {
                return adopt._id !== id;
            });
            
            this.setState({listAdopt: listAdoptUpdated})
            _this.setState({showAdoptSuccess: true});
        })
        .catch(() => {
            _this.setState({showAdoptSuccess: true});
        })
    }
    handleCloseAdoptMessageSuccess(){
        if(this.state.showAdoptSuccess){
            this.setState({showAdoptSuccess: false});
        }
    }
    handleCloseAdoptMessageFailure(){
        if(this.state.showAdoptFailure){
            this.setState({showAdoptFailure: false});
        }
    }
    render() {
        return (
            <div style={{width: "100%"}}>
                <MaterialTable
                    style={{ padding: "10px 30px", width: "100%" }}
                    title="Adotar"
                    columns={[
                        { title: 'Nome', field: 'name' },
                        { title: 'Descrição', field: 'description' }
                    ]}
                    data={this.state.listAdopt}        
                    actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Editar',
                        onClick: (event, rowData) => this.props.changeCurrentPage("AdoptDetail", rowData)
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Deletar',
                        onClick: (event, rowData) => this.deleteAdopt(rowData._id)
                    },
                    {
                        icon: 'add',
                        tooltip: 'Criar Adoção',
                        isFreeAction: true,
                        onClick: (event) => this.createAdopt()
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
                    open={this.state.showAdoptSuccess}
                    autoHideDuration={6000}
                    onClose={this.handleCloseAdoptMessageSuccess}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">Adoção deletada com sucesso!</span>}
                    action={[
                        <IconButton
                        key="close"
                        aria-label="close"
                        color="inherit"
                        onClick={this.handleCloseAdoptMessageSuccess}
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
                    open={this.state.showAdoptFailure}
                    autoHideDuration={6000}
                    onClose={this.handleCloseAdoptMessageFailure}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">Houve um erro ao deletar a adoção, tente novamente mais tarde.</span>}
                    action={[
                        <IconButton
                        key="close"
                        aria-label="close"
                        color="inherit"
                        onClick={this.handleCloseAdoptMessageFailure}
                        >
                        <CloseIcon />
                        </IconButton>,
                    ]}
                />
            </div>
        )
    }
}

export default AdminAdopt;