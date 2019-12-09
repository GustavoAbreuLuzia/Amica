import React from "react";

// Api
import api from "../../Utils/api";

//Components
import MaterialTable from "material-table";

class AdminContacts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listContacts: [],
            windowSize: props.windowSize
          };
    }
    async componentDidMount(){
        const contacts = await api.get('/api/contact', {
          params: {
            quantity: 100
          }
        })
        .then((reponse) => {
            reponse.data.forEach(item => {
                item.messageMobile = item.message.trim().substr(0, 150) + "...";
            });

            this.setState({listContacts: reponse.data});
        });
    }
    render() {
        return (
            <MaterialTable
            style={this.state.windowSize >= 780 ? { padding: "10px 30px", width: "100%" } : { width: "100%" }}
                title="Contatos"
                columns={[
                    { title: 'Nome', field: 'name' },
                    { title: 'Email', field: 'mail' },
                    { title: 'Mensagem', field: this.state.windowSize >= 780 ? 'message' : 'messageMobile' }
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