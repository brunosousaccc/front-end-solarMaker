import React, { useState, useEffect } from "react";
import { useStateIfMounted } from "use-state-if-mounted";
import { Navbar, Row, Col, Form, Button, Container } from "react-bootstrap"
import BottomHeader from "../../layout/BottomHeader";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TableCustom from "../../table/TableCustom";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from 'react-toastify';
import "./users.css"

function handleColumnUserList() {
    const columns = [
      {
        name: "Nome",
        selector: (row) => row.username,
      },
      {
        name: "Email",
        selector: (row) => row.email,
      },
      {
        name: "Especialidade",
        selector: (row) => row.is_superuser ? "Administrador" : "Vendedor",
      },
      {
        name: "Ações",
        elector: (row) => row.actions,
        cell: (row) => (
          <div className="d-flex actionsIcons">
            <Link
              className="editIcon"
              to="/FormUser/edit"
              state={{ id: row.id }}
            >
              <EditIcon className="me-3" style={{color: "#ff7a00"}} />
            </Link>
           
          </div>
        ),
        maxWidth: "130px",
        style: {
          justifyContent: "flex-start",
          placeContent: "flex-start",
        },
      },
    ];
  return columns;
}

function User() {


    return (
        <>
            <BottomHeader>
                <Navbar.Brand href="#home">
                    <Row>
                        <Col>
                            <Link className="text-decoration-none" to="/">
                                <ArrowBackIcon className="text-light" />
                                <span className="text-light">Usuários</span>
                            </Link>
                        </Col>
                    </Row>
                </Navbar.Brand>
                <Row>
                  <Col sm="auto">
                    <Form>
                        <Form.Group controlId="formBasicSearch">
                            <Form.Control className="search-style" type="text" placeholder="Pesquisar" />
                        </Form.Group>
                    </Form>
                  </Col>
                </Row>
            </BottomHeader>
            <Container>
              <div className="container-add">
                  <Link to={"/FormUser"}>
                    <Button className="add-button">
                      <div className="d-flex div-button">
                        <span>Usuário</span>
                        <AddIcon />
                      </div>
                    </Button>
                  </Link>
              </div>
              <div className="mt-3">
                <TableCustom
                  
                />
              </div> 
            </Container>
        </>
    )
}

export default User