import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { getEmployees } from "../services/employee-services";
import EmployeeList from "./EmployeeList";
import SearchBar from "./SearchBar";

export const EmployeeContext = React.createContext();

class Home extends Component {

    constructor(props) {
        super(props);
        // console.log(props);
        this.state = {
            employees: props.employees,
            filteredResult: props.employees
        }

        this.handleSearch = this.handleSearch.bind(this);
    }

    //Life cycle method, automaticallly invoke after constructor. We are passing state to component not props.
    static getDerivedStateFromProps(newProps, state) {
        if (newProps.employees.length != state.employees.length) {
            console.log("Props Changed : ", newProps);
            return {
                employees: newProps.employees,
                filteredResult: newProps.employees
            }            
        }

        return null;
    }

    async componentDidMount() {
        // let employees = await getEmployees()
        //     .catch(err => console.log("Error in fetching Data"))

        // this.setState({ employees, filteredResult: employees });


    }

    handleSearch(searchText) {
        console.log(this.state.employees);

        if (searchText && searchText.length > 0) {
            searchText = searchText.toUpperCase();
            let searchResult = this.state.employees.filter((item) => item.Name.toUpperCase().indexOf(searchText) >= 0 || item.Location.toUpperCase().indexOf(searchText) >= 0);
            this.setState({ filteredResult: searchResult });
        }
        else {
            this.setState({ filteredResult: this.state.employees });
        }

    }

    render() {
        return <EmployeeContext.Provider value={{ employees: this.state.employees, data: this.state.filteredResult, doSearch: this.handleSearch }}>
            <Container>
                <Row>
                    <Col>
                        <h2>Home</h2>
                        <SearchBar />
                        <EmployeeList />
                    </Col>
                </Row>
            </Container>
        </EmployeeContext.Provider>
    }
}

function mapStateToProps(state) {
    //Property of component:AppReduxState.reducerMapperName
    return {
        employees: state.employeeState.employees
    }
}

// function mapDispatchToProps(dispatch){

// }

// //Redux functionality, to connect react with redux
// //1)
// export default connect(mapStateToProps)(Home);

//2)
let connector = connect(mapStateToProps);
export default connector(Home);
