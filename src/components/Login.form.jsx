import React from 'react';
import axiosInstance from '../interceptors/axiosConfig';
import { Alert } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import FText from '../widgets/FText'

class LoginForm extends React.Component {


  loginSubmit = (event) => {
    event.preventDefault();
    axiosInstance.post('/login', this.state.item)
      .then((response) => {
        const { token } = response.data;
        //console.log(response);
        if (response.status == 200) {
          if (token === undefined) {
            const { errors } = response.data;
            this.setState({
              resquest: errors
            })

          } else {
            localStorage.setItem('token', token); // Store token in localStorage
            window.location.href = '/inicio'; // Redirect to home page
          }

        }

      })
      .catch((error) => {
        //console.log(error);
        if (error.response.status == 422) {
          this.setState({
            alert: error.response.data.message,
            show: true,
          });
          console.log(error.response.data.message);
        }

      });

  }

  constructor(props) {

    super(props);
    this.state = {
      item: {
        email: '',
        password: '',
      },
      show: false,
      resquest: [],
      alert: ''

    };

  }

  changed = (e) => {
    const target = e.target;
    const name = target.name;

    this.setState({
      item: {
        ...this.state.item,
        [name]: target.value
      }
    });

  };
  handleClose = () => {
    this.setState({
      show: false,
    });

  };
  render() {
    const { item, show, alert, resquest } = this.state;
    return (
      <>
        <Modal show={show} onHide={this.handleClose} animation={false}>
          <Alert className="p-2 m-0" variant="danger" onClose={this.handleClose} dismissible>
            <Alert.Heading >¡Tienes un error!</Alert.Heading>
            <p>
              {alert}
            </p>
          </Alert>
        </Modal>
        <div className="Auth-form-container">
          <form className="Auth-form" onSubmit={this.loginSubmit}>
            <div className="Auth-form-content">

              <h3 className="Auth-form-title">Administracion de equipos</h3>
              <FText
                type="email"
                label="Usuario"
                name="email"
                class="form-control mt-1"
                value={item.email}
                onChange={this.changed}
                placeholder="Introduzca su Email"
                error_length={resquest.length}
                error_value={resquest?.email}
              />
              <FText
                type="password"
                label="Contraseña"
                name="password"
                class="form-control mt-1"
                value={item.password}
                onChange={this.changed}
                placeholder="Introduzca su contraseña"
                error_length={resquest.length}
                error_value={resquest?.password}
              />
              
              <div className="d-grid gap-2 mt-3">
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </>
    );
  }

}
export default LoginForm;