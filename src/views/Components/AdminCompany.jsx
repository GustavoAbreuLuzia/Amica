import React from "react";

// Api
import api from "../../Utils/api";

//Components
import MaterialTable from "material-table";

class AdminCompany extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listCompany: []
          };
    }
    async componentDidMount(){
        const companies = await api.get('/Company', {
          params: {
            quantity: 100
          }
        });
  
        this.setState({listCompany: companies.data});
    }
    render() {
        return (
            <MaterialTable
                style={{ padding: "10px 30px", width: "100%" }}
                title="Empresas Parceiras"
                columns={[
                    { title: 'Nome', field: 'name' },
                    { title: 'Descrição', field: 'description' }
                ]}
                data={this.state.listCompany}        
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

export default AdminCompany;