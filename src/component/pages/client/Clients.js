import React, { useState, useEffect } from "react";
import { useStateIfMounted } from "use-state-if-mounted";
import { Navbar, Row, Col, Form, Button, Container } from "react-bootstrap"
import BottomHeader from "../../layout/BottomHeader";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TableCustom from "../../table/TableCustom"
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from 'react-toastify';


import "./client.css"

function handleColumnClientList(handleDelete) {
    const columns = [
      {
        name: "Nome",
        selector: (row) =>  row.name,
      },
      {
        name: "Email",
        selector: (row) =>  row.email,
      },
      {
        name: "Telefone",
        selector: (row) =>  row.phone_number,
      },
      {
        name: "CPF/CNPJ",
        selector: (row) =>  row.cpf_cnpj,
      },
      {
        name: "Ações",
        elector: (row) => row.actions,
        cell: (row) => (
          <div className="d-flex actionsIcons">
            <Link
              className="editIcon"
              to="/"
              state={{ id: row._id }}
            >
              <EditIcon className="me-3" type="button" style={{color: "#ff7a00"}}/>
            </Link>
            
            <DeleteIcon onClick={() => {handleDelete(row.cpf_cnpj)}} /> 
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

function Client() {
  var [client, setClient] = useStateIfMounted({ data: [], count: 0 });
  var [options, setOptions] = useStateIfMounted({ skip: 0, limit: 10 });


  const handleDelete = (id) => {
        setClient(0);

  };

  return (
      <>
        <BottomHeader>
            <Navbar.Brand href="#home">
                <Row>
                    <Col>
                        <Link className="text-decoration-none" to="/">
                            <ArrowBackIcon className="text-light" />
                            <span className="text-light">Clientes</span>
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
            <Link to={"/FormClient"}>
              <Button className="add-button">
                <div className="d-flex div-button">
                  <span>Cliente</span>
                  <AddIcon />
                </div>
              </Button>
            </Link>
          </div>
          <div className="mt-3">
              <TableCustom
                  data={client.data}
                  columns={handleColumnClientList(handleDelete)}
                  onPaginationChanged={(skip, limit) => {
                  setOptions({ skip, limit });
                  }}
                  total={client.count}
              />
          </div>
        </Container>
      </>
    )
}

export default Client