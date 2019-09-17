import React from "react";

// Api
import api from "../../Utils/api";

//Components
import MaterialTable from "material-table";

class AdminAdopt extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listAdopt: []
          };
    }
    async componentDidMount(){
        const adopt = await api.get('/Adopt', {
          params: {
            quantity: 100
          }
        });
  
        this.setState({listAdopt: adopt.data});
    }
    render() {
        return (
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

export default AdminAdopt;