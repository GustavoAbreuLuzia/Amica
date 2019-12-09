import React from "react";

// Api
import api from "../../Utils/api";

// Icons
import CloseIcon from '@material-ui/icons/Close';

//Components
import MaterialTable from "material-table";
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

class AdminCompany extends React.Component {
    constructor(props) {
        super(props);
        this.handleCloseCompanyMessageSuccess = this.handleCloseCompanyMessageSuccess.bind(this);  
        this.handleCloseCompanyMessageFailure = this.handleCloseCompanyMessageFailure.bind(this);  
        this.state = {
            listCompany: [],
            showCompanySuccess: false,
            showCompanyFailure: false,
            windowSize: props.windowSize
          };
    }
    async componentDidMount(){
        const companies = await api.get('/api/Company', {
          params: {
            quantity: 100
          }
        })
        .then((reponse) => {
            reponse.data.forEach(item => {
                item.descriptionMobile = item.description.trim().substr(0, 150) + "...";
            });
      
            
            this.setState({listCompany: reponse.data});
        });
    }
    createCompany() {
        this.props.changeCurrentPage("CompanyDetail");
    }
    async deleteCompany(id) {
        const _this = this;
        const Company = await api.put(`/api/Company/${id}`, { status: false })
        .then(() => {
            const listCompanyUpdated = _this.state.listCompany.filter((Company) => {
                return Company._id !== id;
            });

            listCompanyUpdated.forEach(news => {
                news.descriptionMobile = news.description.trim().substr(0, 150) + "...";
            });
            
            this.setState({listCompany: listCompanyUpdated})
            _this.setState({showCompanySuccess: true});
        })
        .catch(() => {
            _this.setState({showCompanyFailure: true});
        })
    }
    handleCloseCompanyMessageSuccess(){
        if(this.state.showCompanySuccess){
            this.setState({showCompanySuccess: false});
        }
    }
    handleCloseCompanyMessageFailure(){
        if(this.state.showCompanyFailure){
            this.setState({showCompanyFailure: false});
        }
    }
    render() {
        return (
            <div style={{width: "100%"}}>
                <MaterialTable
                    style={this.state.windowSize >= 780 ? { padding: "10px 30px", width: "100%" } : { width: "100%" }}
                    title="Empresas Parceiras"
                    columns={[
                        { title: 'Nome', field: 'name' },
                        { title: 'Descrição', field: this.state.windowSize >= 780 ? 'description' : 'descriptionMobile' }
                    ]}
                    data={this.state.listCompany}        
                    actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Editar',
                        onClick: (event, rowData) => this.props.changeCurrentPage("CompanyDetail", rowData)
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Deletar',
                        onClick: (event, rowData) => this.deleteCompany(rowData._id)
                    },
                    {
                        icon: 'add',
                        tooltip: 'Criar Parceiro',
                        isFreeAction: true,
                        onClick: (event) => this.createCompany()
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
                    open={this.state.showCompanySuccess}
                    autoHideDuration={6000}
                    onClose={this.handleCloseCompanyMessageSuccess}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">Parceiro deletado com sucesso!</span>}
                    action={[
                        <IconButton
                        key="close"
                        aria-label="close"
                        color="inherit"
                        onClick={this.handleCloseCompanyMessageSuccess}
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
                    open={this.state.showCompanyFailure}
                    autoHideDuration={6000}
                    onClose={this.handleCloseCompanyMessageFailure}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">Houve um erro ao deletar o parceiro, tente novamente mais tarde.</span>}
                    action={[
                        <IconButton
                        key="close"
                        aria-label="close"
                        color="inherit"
                        onClick={this.handleCloseCompanyMessageFailure}
                        >
                        <CloseIcon />
                        </IconButton>,
                    ]}
                />
            </div>
        )
    }
}

export default AdminCompany;