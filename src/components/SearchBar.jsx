import { useContext, useRef } from "react";
import { Form, FormControl, InputGroup } from "react-bootstrap";
import { EmployeeContext } from "./Home";

export default function SearchBar(){

    const searchInput = useRef('');
    const {doSearch, data, employees} = useContext(EmployeeContext);
    return(
        <div>
            <Form>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="search">Search</InputGroup.Text>
                    <FormControl placeholder="Search by Name or Location" ref={searchInput} onChange={() => doSearch(searchInput.current.value)}></FormControl>
                </InputGroup>
                <p>Showing { data.length } of { employees.length } records</p>
            </Form>
        </div>
    );
}