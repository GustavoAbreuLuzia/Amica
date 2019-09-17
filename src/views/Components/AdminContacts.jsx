import React from "react";

// Api
import api from "../../Utils/api";

//Components
import MaterialTable from "material-table";

class AdminContacts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listContacts: []
          };
    }
    async componentDidMount(){
        const news = await api.get('/contact', {
          params: {
            quantity: 100
          }
        });
  
        this.setState({listContacts: news.data});
    }
    render() {
        return (
            <MaterialTable
                style={{ padding: "10px 30px", width: "100%" }}
                title="Contatos"
                columns={[
                    { title: 'Nome', field: 'name' },
                    { title: 'Email', field: 'mail' },
                    { title: 'Mensagem', field: 'message' }
                ]}
                data={this.state.listContacts}   
                localization={{
                    header: {
                        actions: "Ações"
                    }
                }}
            />
        )
    }
}

export default AdminContacts;