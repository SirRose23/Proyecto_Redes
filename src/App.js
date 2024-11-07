import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter } from 'reactstrap';

class App extends React.Component {
  state = {
    data: [],
    modalInsertar: false,
    modalActualizar: false,
    modalMostrarNotas: false,
    form: {
      id: '',
      nombre: '',
      apellido: '',
      carnet: '',
      prograWeb: 0,
      baseDatos: 0,
      arquitectura: 0,
    },
    notasEstudiante: {
      prograWeb: 0,
      baseDatos: 0,
      arquitectura: 0,
    },
  };

  mostrarModalInsertar = () => {
    this.setState({ modalInsertar: true });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  mostrarModalActualizar = (dato) => {
    this.setState({ form: dato, modalActualizar: true });
  };

  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };

  mostrarModalMostrarNotas = (dato) => {
    this.setState({ notasEstudiante: dato, modalMostrarNotas: true });
  };

  cerrarModalMostrarNotas = () => {
    this.setState({ modalMostrarNotas: false });
  };

  insertar = () => {
    const valorNuevo = { ...this.state.form };
    valorNuevo.id = this.state.data.length + 1;
    valorNuevo.promedio = (
      (parseFloat(valorNuevo.prograWeb) +
        parseFloat(valorNuevo.baseDatos) +
        parseFloat(valorNuevo.arquitectura)) /
      3
    ).toFixed(2);

    const lista = this.state.data;
    lista.push(valorNuevo);
    this.setState({ data: lista, modalInsertar: false });
  };

  editar = (dato) => {
    const arreglo = this.state.data.map((registro) => {
      if (registro.id === dato.id) {
        return { ...dato };
      }
      return registro;
    });
    this.setState({ data: arreglo, modalActualizar: false });
  };

  eliminar = (dato) => {
    const opcion = window.confirm(`¿Estás seguro de eliminar el estudiante ${dato.id}?`);
    if (opcion) {
      const lista = this.state.data.filter((registro) => registro.id !== dato.id);
      this.setState({ data: lista });
    }
  };

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {
    return (
      <Container>
        <br />
        <Button color="success" onClick={this.mostrarModalInsertar}>
          Agregar nuevo estudiante
        </Button>
        <br />
        <br />
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Carnet</th>
              <th>Promedio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((estudiante) => (
              <tr key={estudiante.id}>
                <td>{estudiante.id}</td>
                <td>{estudiante.nombre}</td>
                <td>{estudiante.apellido}</td>
                <td>{estudiante.carnet}</td>
                <td>{estudiante.promedio}</td>
                <td>
                  <Button color="primary" onClick={() => this.mostrarModalActualizar(estudiante)}>
                    Editar
                  </Button>{' '}
                  <Button color="danger" onClick={() => this.eliminar(estudiante)}>
                    Eliminar
                  </Button>{' '}
                  <Button color="info" onClick={() => this.mostrarModalMostrarNotas(estudiante)}>
                    (o|o) 
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
            <h3>Insertar Estudiante</h3>
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <label>Nombre:</label>
              <input className="form-control" name="nombre" type="text" onChange={this.handleChange} />
            </FormGroup>
            <FormGroup>
              <label>Apellido:</label>
              <input className="form-control" name="apellido" type="text" onChange={this.handleChange} />
            </FormGroup>
            <FormGroup>
              <label>Carnet:</label>
              <input className="form-control" name="carnet" type="text" onChange={this.handleChange} />
            </FormGroup>
            <FormGroup>
              <label>Nota Progra Web:</label>
              <input className="form-control" name="prograWeb" type="number" onChange={this.handleChange} />
            </FormGroup>
            <FormGroup>
              <label>Nota Base de Datos 2:</label>
              <input className="form-control" name="baseDatos" type="number" onChange={this.handleChange} />
            </FormGroup>
            <FormGroup>
              <label>Nota Arquitectura:</label>
              <input className="form-control" name="arquitectura" type="number" onChange={this.handleChange} />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.insertar}>
              Insertar
            </Button>
            <Button color="danger" onClick={this.cerrarModalInsertar}>
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modalMostrarNotas}>
          <ModalHeader>Notas del Estudiante</ModalHeader>
          <ModalBody>
            <p><strong>Progra Web:</strong> {this.state.notasEstudiante.prograWeb}</p>
            <p><strong>Base de Datos 2:</strong> {this.state.notasEstudiante.baseDatos}</p>
            <p><strong>Arquitectura:</strong> {this.state.notasEstudiante.arquitectura}</p>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.cerrarModalMostrarNotas}>
              Cerrar
            </Button>
          </ModalFooter>
        </Modal>
      </Container>
    );
  }
}

export default App;
