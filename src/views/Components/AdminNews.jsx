import React from "react";

// Api
import api from "../../Utils/api";

// Icons
import CloseIcon from '@material-ui/icons/Close';

//Components
import MaterialTable from "material-table";
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

class AdminNews extends React.Component {
    constructor(props) {
        super(props);
        this.handleCloseNewsMessageSuccess = this.handleCloseNewsMessageSuccess.bind(this);  
        this.handleCloseNewsMessageFailure = this.handleCloseNewsMessageFailure.bind(this);  
        this.state = {
            listNews: [],
            showNewsSuccess: false,
            showNewsFailure: false,
            windowSize: props.windowSize
          };
    }
    async componentDidMount(){
        const news = await api.get('/api/News', {
          params: {
            quantity: 100
          }
        })
        .then((reponse) => {
            reponse.data.forEach(item => {
                item.descriptionMobile = item.description.trim().substr(0, 150) + "...";
            });
      
            this.setState({listNews: reponse.data});
        });
    }
    createNews() {
        this.props.changeCurrentPage("NewsDetail");
    }
    async deleteNews(id) {
        const _this = this;
        const news = await api.put(`/api/News/${id}`, { status: false })
        .then(() => {
            const listNewsUpdated = _this.state.listNews.filter((news) => {
                return news._id !== id;
            });
            
            listNewsUpdated.forEach(news => {
                news.descriptionMobile = news.description.trim().substr(0, 150) + "...";
            });

            this.setState({listNews: listNewsUpdated})
            _this.setState({showNewsSuccess: true});
        })
        .catch(() => {
            _this.setState({showNewsFailure: true});
        })
    }
    handleCloseNewsMessageSuccess(){
        if(this.state.showNewsSuccess){
            this.setState({showNewsSuccess: false});
        }
    }
    handleCloseNewsMessageFailure(){
        if(this.state.showNewsFailure){
            this.setState({showNewsFailure: false});
        }
    }
    render() {
        return (
            <div style={{width: "100%"}}>
                <MaterialTable
                    style={this.state.windowSize >= 780 ? { padding: "10px 30px", width: "100%" } : { width: "100%" }}
                    title="Notícias"
                    columns={[
                        { title: 'Título', field: 'title' },
                        { title: 'Descrição', field: this.state.windowSize >= 780 ? 'description' : 'descriptionMobile' }
                    ]}
                    data={this.state.listNews}        
                    actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Editar',
                        onClick: (event, rowData) => this.props.changeCurrentPage("NewsDetail", rowData)
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Deletar',
                        onClick: (event, rowData) => this.deleteNews(rowData._id)
                    },
                    {
                        icon: 'add',
                        tooltip: 'Criar Notícia',
                        isFreeAction: true,
                        onClick: (event) => this.createNews()
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
                    open={this.state.showNewsSuccess}
                    autoHideDuration={6000}
                    onClose={this.handleCloseNewsMessageSuccess}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">Notícia deletada com sucesso!</span>}
                    action={[
                        <IconButton
                        key="close"
                        aria-label="close"
                        color="inherit"
                        onClick={this.handleCloseNewsMessageSuccess}
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
                    open={this.state.showNewsFailure}
                    autoHideDuration={6000}
                    onClose={this.handleCloseNewsMessageFailure}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">Houve um erro ao deletar a notícia, tente novamente mais tarde.</span>}
                    action={[
                        <IconButton
                        key="close"
                        aria-label="close"
                        color="inherit"
                        onClick={this.handleCloseNewsMessageFailure}
                        >
                        <CloseIcon />
                        </IconButton>,
                    ]}
                />
            </div>
        )
    }
}

export default AdminNews;