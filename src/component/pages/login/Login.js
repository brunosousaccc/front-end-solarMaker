import React, { useState } from "react";
import { Form, Row, Col, Container, Card } from "react-bootstrap";
import PropTypes from "prop-types";
import auth from "../../../service/authenticateUser"
import "./login.css";

async function loginUser(username, password) {
  return await auth.authenticateUser(username, password);
}

function Footer() {
  return (
    <Row className="footer_login row justify-content-between">
      <Col></Col>
      <Col>
        Copyright 2022 © - SolarMaker
      </Col>
      <Col>
        Política de Privacidade
      </Col>
    </Row>
  );
}

function ContainerForm(props) {
  return (
      <Container className="style_container_form">
        <Card className="style-card-logo">
          <Card.Img variant="top" className="style_logo" src={process.env.PUBLIC_URL + "/brand.png"} />
        </Card>
        <Card.Body>
          <div>
              <form onSubmit={props.handleSubmit} className="form_style">
                <div className="m-2 mb-3 d-flex justify-content-center title_input">
                  <h1>Bem Vindo</h1>
                </div>
                <div className="m-2">
                  <Form.Control
                    className="box_form"
                    type="text"
                    placeholder={"Login"}
                    value={props.username}
                    onChange={(e) => props.setUserName(e.target.value)}
                  />
                </div>
                <div className="m-2">
                  <Form.Control
                    className="box_form"
                    type="password"
                    placeholder={"Senha"}
                    value={props.password}
                    onChange={(e) => props.setPassword(e.target.value)}
                  />
                </div>
                {props.invalid ? (
                  <li className="invalid_message">Usuário ou Senha inválidos</li>
                ) : null}
                <div className="d-flex justify-content-center mt-4">
                  <input type="submit" value={"Entrar"} className="input_form" />
                </div>
              </form>
          </div>
        </Card.Body>
      </Container>
  );
}

function Login({ setToken }) {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [invalid, setInvalid] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await loginUser(username, password);
      setToken(token);
      document.location.reload(true)
    } catch (err) {
      setUserName("");
      setPassword("");
      setInvalid(true);
      console.log("Could not handle login", err);
    }
  };

  return (
    <div id="login_root">
      <ContainerForm
        handleSubmit={handleSubmit}
        username={username}
        password={password}
        invalid={invalid}
        setUserName={setUserName}
        setPassword={setPassword}
      />
      <Footer />
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Login;
