import React from "react";

// Api
import api from "../../Utils/api";

//Components
import MaterialTable from "material-table";

class AdminPartner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listPartner: []
          };
    }
    async componentDidMount(){
        const partner = await api.get('/api/Partner', {
          params: {
            quantity: 100
          }
        });
  
        this.setState({listPartner: partner.data});
    }
    render() {
        return (
            <MaterialTable
                style={{ padding: "10px 30px", width: "100%" }}
                title="Sócios"
                columns={[
                    { title: 'Nome', field: 'name' },
                    { title: 'Cidade', field: 'city' },
                    { title: 'Email', field: 'mail' },
                    { title: 'Telefone', field: 'phone' }
                ]}
                data={this.state.listPartner}        
                actions={[
                {
                    icon: 'edit',
                    tooltip: 'Editar',
                    onClick: (event, rowData) => alert("You saved " + rowData.title)
                }
                ]}
                localization={{
                    header: {
                        actions: "Ações"
                    }
                }}
            />
        )
    }
}

export default AdminPartner;