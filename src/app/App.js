import React, {Component} from 'react';

class App extends Component{

    constructor(){
        super();
        this.state = {
            title: '',
            description: '',
            tasks:[],
            _id: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.guardarTask = this.guardarTask.bind(this);
    }

    guardarTask(e){
        if(this.state._id){
            //si tiene un id entonces actualiza la informacion
            fetch(`/api/tasks/${this.state._id}`, {
                method:'PUT',
                body: JSON.stringify(this.state),
                headers: {
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
            })
                .then(res => res.json)
                .then(data => {
                    M.toast({html:'Tarea Actualizada'});
                    this.setState({title:'', description:'', _id:''});
                    this.fetchTasks();
            });
        } else{
            //si no tiene un id entonces crea una nueva tarea con los datos
            fetch('/api/tasks', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                M.toast({html:'Tarea guardada'});
                this.setState({title:'', description:''});
                this.fetchTasks();
            })
            .catch(err => console.console.error(err));
        }
        e.preventDefault();
    }

    componentDidMount(){
        this.fetchTasks();
    }

    fetchTasks(){
        fetch('/api/tasks')
        .then(res => res.json())
        .then(data => {
            this.setState({tasks: data});
        });
    }

    deleteTask(id){

        if(confirm('Esta seguro de querer eliminar esta tarea?')){
            fetch(`/api/tasks/${id}`,{
                method:'DELETE',
                headers: {
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                M.toast({html:'Tarea eliminada'});
                this.fetchTasks();
            });
        }
    }

    editTask(id){
        fetch(`/api/tasks/${id}`)
        .then(res => res.json())
        .then(data =>{
            console.log(data);
            this.setState({
                title: data.title,
                description: data.description,
                _id: data._id
            })
        } );
    }

    handleChange(e){
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });

    }

    render(){
        return(
            <div>
                {/*NAVEGACION*/ }
                <nav className="light-blue darken-4">
                    <div className="container">
                        <a className="brand-logo" href="/">MERN Stack</a>
                    </div>
                </nav>

                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.guardarTask}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="title" onChange={this.handleChange} type="text" placeholder="Titulo de la TAREA" value={this.state.title}></input>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea name="description" onChange={this.handleChange} placeholder="Descripción de la Tarea" className="materialize-textarea" value={this.state.description}></textarea>
                                            </div>
                                        </div>

                                        <button type="submit" className="btn light-blue darken-4">Guardar</button>

                                    </form>
                                </div>
                            </div>
                        </div>

                        <div className="col s7">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Titulo</th>
                                        <th>Descripción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.tasks.map(task =>{
                                        return(
                                            <tr key={task._id}>
                                                <td>{task.title}</td>
                                                <td>{task.description}</td>
                                                <td>
                                                    <button className="btn light-blue darken-4" onClick={()=> this.editTask(task._id)}>
                                                    <i className="material-icons">edit</i>
                                                    </button>

                                                    <button className="btn light-blue darken-4" style={{margin: '4px'}} onClick={()=> this.deleteTask(task._id)}>
                                                    <i className="material-icons">delete</i>
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>



            </div>
        )
    }
}
export default App