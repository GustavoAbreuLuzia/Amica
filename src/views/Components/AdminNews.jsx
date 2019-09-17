import React from "react";

// Api
import api from "../../Utils/api";

//Components
import MaterialTable from "material-table";

class AdminNews extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listNews: []
          };
    }
    async componentDidMount(){
        const news = await api.get('/News', {
          params: {
            quantity: 100
          }
        });
  
        this.setState({listNews: news.data});
    }
    render() {
        return (
            <MaterialTable
                style={{ padding: "10px 30px", width: "100%" }}
                title="Notícias"
                columns={[
                    { title: 'Título', field: 'title' },
                    { title: 'Descrição', field: 'description' }
                ]}
                data={this.state.listNews}        
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

export default AdminNews;