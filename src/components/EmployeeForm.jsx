import { Component } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { insertEmployee } from "../services/employee-services";
import { Navigate } from 'react-router-dom'
import { addEmployee } from '../actions/action-creators'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

class EmployeeForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employee: {
                Name: "",
                Age: "",
                Designation: "",
                Department: "",
                Location: "",
                LocationID: "",
                EmpCode: "",
            },
            errors: {
                name: "",
                age: "",
                designation: "",
                department: "",
                location: "",
                locationID: "",
                empCode: "",
            },
            redirect: false

        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(e) {
        e.preventDefault();
        // console.log("Come for insert");

        const { errors, employee } = this.state;

        this.props.addEmployee(employee);
        this.setState({ redirect: true })

        // let body = this.state.employee;
        // // {
        // //     LocationID: this.state.locationID,
        // //     EmpCode: this.state.empCode,
        // //     Name: this.state.name,
        // //     Department: this.state.department,
        // //     Designation: this.state.designation,
        // //     Age: this.state.age,
        // //     Location: this.state.location
        // // }

        // let employee = await insertEmployee(body).then((result) => {
        //     alert("Records inserted successfully");
        //     this.setState({ redirect: true });
        // })
        //     .catch(err => alert("Error in fetching Data"));

    }

    handleChange(e) {
        // this.setState({ [e.target.name]: e.target.value });
        const { name, value } = e.target;
        const { errors, employee } = this.state;

        switch (name) {
            case "EmpCode":
                if (value.length != 4) {
                    this.setState({ errors: { ...errors, empCode: 'Employee code must be 4 charecters' } });
                }
                else {
                    this.setState({ errors: { ...errors, empCode: '' } });
                }
                break;
            case "Name":
                let exists = false;
                for (var ch of value) {
                    if (['@', '%', '^', '&', '*', '(', ')', '+', '-'].indexOf(ch) >= 0) {
                        exists = true
                    }
                }
                if (exists) {
                    this.setState({ errors: { ...errors, name: 'Name should not contain special charecters' } });
                }
                else {
                    this.setState({ errors: { ...errors, name: '' } });
                }
                break;
            default:
                break;
        }

        //update the employee state
        this.setState({
            employee: { ...employee, [name]: value }
        })

        console.log(this.state);

    }

    render() {
        // console.log(this.state);
        if (this.state.redirect) {
            return <Navigate to={"/"}></Navigate>
        }
        return (
            <Container>
                <Row>
                    <Col className="col-md-6 mx-auto">
                        <h2>Employee Creation Form</h2>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group className="mb-3" controlId="empCode">
                                <Form.Label>Employee code </Form.Label>
                                <Form.Control type="text" placeholder="Enter employee code" name="EmpCode" value={this.state.employee.EmpCode} onChange={this.handleChange} required />
                                <div className="text-danger">{this.state.errors.empCode}</div>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter employee name" name="Name" value={this.state.employee.Name} onChange={this.handleChange} />
                                <div className="text-danger">{this.state.errors.name}</div>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="age">
                                <Form.Label>Age</Form.Label>
                                <Form.Control type="number" placeholder="Enter employee age" name="Age" value={this.state.employee.Age} onChange={this.handleChange} />
                                <div className="text-danger">{this.state.errors.age}</div>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="designation">
                                <Form.Label>Designation</Form.Label>
                                <Form.Control type="text" placeholder="Enter designation" name="Designation" value={this.state.employee.Designation} onChange={this.handleChange} />
                                <div className="text-danger">{this.state.errors.designation}</div>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="department">
                                <Form.Label>Department</Form.Label>
                                <Form.Control type="text" placeholder="Enter department" name="Department" value={this.state.employee.Department} onChange={this.handleChange} />
                                <div className="text-danger">{this.state.errors.department}</div>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="locId">
                                <Form.Label>Location ID</Form.Label>
                                <Form.Control type="text" placeholder="Enter location ID" name="LocationID" value={this.state.employee.LocationID} onChange={this.handleChange} required />
                                <div className="text-danger">{this.state.errors.locationID}</div>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="location">
                                <Form.Label>Location</Form.Label>
                                <Form.Control type="text" placeholder="Enter location" name="Location" value={this.state.employee.Location} onChange={this.handleChange} required />
                                <div className="text-danger">{this.state.errors.location}</div>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );

    }
}

function mapDispatchToProps(dispatch) {
    // let actionMap = {
    //     addEmployee: addEmployee
    // }

    //Key and value is same. So this also can use
    let actionMap = {
        addEmployee
    }

    return bindActionCreators(actionMap, dispatch);
}

export default connect(null, mapDispatchToProps)(EmployeeForm);