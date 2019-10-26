import React from 'react';
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input,  } from 'reactstrap';
import axios from 'axios';
import { Spinner } from 'reactstrap';

class App extends React.Component {
  state = {
    employees: [],
    newEmployeeData: {
      employee_name: '',
      employee_salary: '',
      employee_age: '',
      profile_image: ''
    },
    editEmployeeData: {
      id: '',
      employee_name: '',
      employee_salary: '',
      employee_age: '',
      profile_image: ''
    },
    isAddEmployeeModalOpen: false,
    isEditEmployeeModalOpen: false,
    loadListingSpinner: true
  }

  componentDidMount(){
    axios.get('http://dummy.restapiexample.com/api/v1/employees').then((response) => {
      this.setState( { 
        employees: response.data,
        loadListingSpinner: false
       } );
    })
  }

  toggleNewModal() {
    this.setState( { 
      isAddEmployeeModalOpen: !this.state.isAddEmployeeModalOpen
    } );
  }

  toggleEditModal(employee_id) {
    axios.get('http://dummy.restapiexample.com/api/v1/employee/'+employee_id).then( ( response ) => {
      this.setState( {
        editEmployeeData: response.data,
        isEditEmployeeModalOpen: !this.state.isEditEmployeeModalOpen
      } );
    } );
  }

  addNewEmployee() {
    axios.post('http://dummy.restapiexample.com/api/v1/create', this.state.newEmployeeData ).then( ( response ) => {
      console.log( response.data );
      let { employees } = this.state;
      employees.push = response.data;
      console.log(response.data, employees);
      this.setState( { employees, newEmployeeData: {
        employee_name: '',
        employee_salary: '',
        employee_age: '',
        profile_image: ''
      },
      isAddEmployeeModalOpen: false } );
    } );
  }

  updateEmployee() {
    axios.put('http://dummy.restapiexample.com/api/v1/update/'+this.state.editEmployeeData.id).then( ( response ) => {
      console.log(response.data);
    } );
  }

  deleteEmployee(employee_id) {
    this.setState( { loadListingSpinner: true } );
    axios.delete('http://dummy.restapiexample.com/api/v1/delete/'+employee_id).then( ( response ) => {
      if(response.data.success.text) {
        let employees = this.state.employees.filter( employee => {
          return employee.id !== employee_id;
        } );

        this.setState( { employees, loadListingSpinner: false } );
      }
    } );
  }

  render() {
    let employees = this.state.employees.map((employee) => {
      return (
        <tr key={employee.id}>
          <td>
            {employee.id}
          </td>
          <td>
            {employee.employee_name}
          </td>
          <td>
            {employee.employee_salary}
          </td>
          <td>
            {employee.employee_age}
          </td>
          <td>
            {employee.profile_image}
          </td>
          <td>
            <Button onClick={this.toggleEditModal.bind(this, employee.id)} color="success" size="sm" className="mr-2">Edit</Button>
            <Button onClick={this.deleteEmployee.bind(this, employee.id)} color="danger" size="sm">Delete</Button>
          </td>
        </tr>
      )
    } );

    return (
    <div className="App container">
    <h1>Employee Directory</h1>
      <Button color="primary" className="my-3" onClick={this.toggleNewModal.bind(this)}>Add Employee</Button>
      <Modal isOpen={this.state.isAddEmployeeModalOpen} toggle={this.toggleNewModal.bind(this)}>
        <ModalHeader toggle={this.toggleNewModal.bind(this)}>Add Employee</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="employeeName">Employee Name</Label>
            <Input id="employeeName" value={this.state.newEmployeeData.employee_name} onChange={(e) => {
              let { newEmployeeData } = this.state;

              newEmployeeData.employee_name = e.target.value;
              this.setState( { newEmployeeData } );
            }} 
            placeholder="Enter Employee Name" />
          </FormGroup>
          <FormGroup>
            <Label for="salary">Salary</Label>
            <Input id="salary" value={this.state.newEmployeeData.employee_salary} onChange={(e) => {
              let { newEmployeeData } = this.state;
              newEmployeeData.employee_salary = e.target.value;

              this.setState( {newEmployeeData} );
            }} placeholder="Enter Salary" />
          </FormGroup>
          <FormGroup>
            <Label for="age">Age</Label>
            <Input id="age" value={this.state.newEmployeeData.employee_age} onChange={(e) => {
              let { newEmployeeData } = this.state;
              newEmployeeData.employee_age = e.target.value;
              this.setState( { newEmployeeData } );
            }} placeholder="Enter Employee Age" />
          </FormGroup>
          <FormGroup>
            <Label for="profileImage">Profile Image</Label>
            <Input id="profileImage" value={this.state.profile_image} onChange={(e) => {
              let { newEmployeeData } = this.state;
              newEmployeeData.profile_image = e.target.value;
              this.setState( { newEmployeeData } );
            }} placeholder="Enter Profile Image" />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.addNewEmployee.bind(this)}>Add Employee</Button>{' '}
          <Button color="secondary" onClick={this.toggleNewModal.bind(this)}>Cancel</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={this.state.isEditEmployeeModalOpen} toggle={this.toggleEditModal.bind(this)}>
        <ModalHeader toggle={this.toggleEditModal.bind(this)}>Edit Employee</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="employeeName">Employee Name</Label>
            <Input id="employeeName" value={this.state.editEmployeeData.employee_name} onChange={(e) => {
              let { editEmployeeData } = this.state;

              editEmployeeData.employee_name = e.target.value;
              this.setState( { editEmployeeData } );
            }} 
            placeholder="Enter Employee Name" />
          </FormGroup>
          <FormGroup>
            <Label for="salary">Salary</Label>
            <Input id="salary" value={this.state.editEmployeeData.employee_salary} onChange={(e) => {
              let { editEmployeeData } = this.state;
              editEmployeeData.employee_salary = e.target.value;

              this.setState( {editEmployeeData} );
            }} placeholder="Enter Salary" />
          </FormGroup>
          <FormGroup>
            <Label for="age">Age</Label>
            <Input id="age" value={this.state.editEmployeeData.employee_age} onChange={(e) => {
              let { editEmployeeData } = this.state;
              editEmployeeData.employee_age = e.target.value;
              this.setState( { editEmployeeData } );
            }} placeholder="Enter Employee Age" />
          </FormGroup>
          <FormGroup>
            <Label for="profileImage">Profile Image</Label>
            <Input id="profileImage" value={this.state.editEmployeeData.profile_image} onChange={(e) => {
              let { editEmployeeData } = this.state;
              editEmployeeData.profile_image = e.target.value;
              this.setState( { editEmployeeData } );
            }} placeholder="Enter Profile Image" />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.updateEmployee.bind(this)}>Update Employee</Button>{' '}
          <Button color="secondary" onClick={this.toggleEditModal.bind(this)}>Cancel</Button>
        </ModalFooter>
      </Modal>

      <div className={!this.state.loadListingSpinner ? 'd-none' : ''}>
        <Spinner type="grow" color="primary" />
        <Spinner type="grow" color="secondary" />
        <Spinner type="grow" color="success" />
        <Spinner type="grow" color="danger" />
        <Spinner type="grow" color="warning" />
        <Spinner type="grow" color="info" />
        <Spinner type="grow" color="light" />
        <Spinner type="grow" color="dark" />
      </div>

      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Employee Name</th>
            <th>Salary</th>
            <th>Age</th>
            <th>Profile Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees}
        </tbody>
      </Table>
    </div>
  )}
}

export default App;
