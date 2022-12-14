import React, { useState, useEffect } from "react";
import { useStateIfMounted } from "use-state-if-mounted";
import { Navbar, Row, Col, Form, Container, Button } from "react-bootstrap"
import BottomHeader from "../../layout/BottomHeader";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TableCustom from "../../table/TableCustom"
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from 'react-toastify';
import AddIcon from "@mui/icons-material/Add";

import "./projects.css"

function handleColumnProjectList(handleDelete) {
    const columns = [
      {
        name: "Projeto",
        selector: (row) => row.project_name
      },
      {
        name: "Potência",
        selector: (row) => row.potency
      },
      {
        name: "Responsável",
        selector: (row) => row.responsible
      },
      {
        name: "CPF/CNPJ",
        selector: (row) => row.client
      },
      {
        name: "Status",
        selector: (row) => row.status
      },
      {
        name: "Valor",
        selector: (row) => row.budget.toLocaleString('pt-BR', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })
      },
      {
        name: "Ações",
        elector: (row) => row.actions,
        cell: (row) => (
          <div className="d-flex actionsIcons">
            <Link
              className="editIcon"
              to="/"
              state={{ id: row.id }}
            >
            <EditIcon className="me-3" type="button" style={{color: "#ff7a00"}}/>
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

function Project() {

    var [project, setProject] = useStateIfMounted({ data: [], count: 0 });
    var [options, setOptions] = useStateIfMounted({ skip: 0, limit: 10 });


    

    return (
        <>
            <BottomHeader>
                <Navbar.Brand href="#home">
                    <Row>
                        <Col>
                            <Link className="text-decoration-none" to="/">
                                <ArrowBackIcon className="text-light" />
                                <span className="text-light">Dashboard</span>
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
                <Link to={"/FormProject"}>
                  <Button className="add-button">
                    <div className="d-flex div-button">
                      <span>Projeto</span>
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
function FormProjectDashboard(){
  var [project, setProject] = useStateIfMounted({ data: [], count: 0 });
  var [options, setOptions] = useStateIfMounted({ skip: 0, limit: 10 });



  const handleDelete = (id) => {

        setProject(0);
     
  };

  return (
      <>
          <Container>
            <div className="container-add">
              <Link to={"/FormProject"}>
                <Button className="add-button">
                  <div className="d-flex div-button">
                    <span>Projeto</span>
                    <AddIcon />
                  </div>
                </Button>
              </Link>
            </div>
            <div className="mt-3">
                <TableCustom
                    data={project.data}
                    columns={project.data}
                    onPaginationChanged={(skip, limit) => {
                    setOptions({ skip, limit });
                    }}
                    total={project.count}
                />
            </div>
          </Container>
      </>
  )
}

export default Project
export {FormProjectDashboard}
