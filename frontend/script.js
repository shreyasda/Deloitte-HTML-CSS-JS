const employeeUrl = "http://localhost:8090/deloitte-jax-rs-demo/employees";
const departmentUrl = "http://localhost:8090/deloitte-jax-rs-demo/departments"; // Assuming departments have their own endpoint

// Fetch and display all employees
function viewAllEmployees() {
    fetch(employeeUrl)
        .then(response => response.json())
        .then(data => {
            console.log("Employee Data:", data);  // Log employee data to inspect the response structure
            let html = "<table><tr><th>ID</th><th>Name</th><th>Salary</th><th>Department</th></tr>";
            data.forEach(employee => {
                // Check if employee object has a 'name', 'firstName', or other property for the employee's name
                const employeeName = employee.name || employee.firstName || employee.fullName || "N/A";
                html += `<tr>
                            <td>${employee.id}</td>
                            <td>${employeeName}</td>
                            <td>${employee.salary}</td>
                            <td>${employee.department ? employee.department.name : 'N/A'}</td>
                        </tr>`;
            });
            html += "</table>";
            document.getElementById("employeeList").innerHTML = html;
        })
        .catch(error => console.error('Error fetching employees:', error));
}


// Fetch and display all departments
function viewAllDepartments() {
    fetch(departmentUrl)
        .then(response => response.json())
        .then(data => {
            let html = "<table><tr><th>ID</th><th>Name</th><th>Location</th></tr>";
            data.forEach(department => {
                html += `<tr>
                            <td>${department.id}</td>
                            <td>${department.name}</td>
                            <td>${department.location}</td>
                        </tr>`;
            });
            html += "</table>";
            document.getElementById("departmentList").innerHTML = html;

            // Populate the department dropdown for adding employees
            const departmentSelect = document.getElementById("addDepartment");
            departmentSelect.innerHTML = '<option value="">Select Department</option>';
            data.forEach(department => {
                departmentSelect.innerHTML += `<option value="${department.id}">${department.name}</option>`;
            });
        })
        .catch(error => console.error('Error fetching departments:', error));
}

// Add new employee
function addEmployee() {
    const firstName = document.getElementById("addFirstName").value;
    const salary = document.getElementById("addSalary").value;
    const departmentId = document.getElementById("addDepartment").value;

    if (!firstName || !salary || !departmentId) {
        alert("Please fill all fields before adding an employee");
        return;
    }

    const employee = {
        firstName: firstName,  // Use 'firstName' as expected by the backend model
        salary: parseFloat(salary),
        department: {
            id: parseInt(departmentId)  // Include the department ID
        }
    };

    console.log("Adding Employee:", employee);  // Log employee data for debugging

    fetch("http://localhost:8090/deloitte-jax-rs-demo/employees", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(employee),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to add employee');
        }
        return response.json();
    })
    .then(data => {
        console.log("Employee added:", data);
        document.getElementById("addResult").innerText = "Employee added successfully!";
        viewAllEmployees();  // Refresh the employee list
    })
    .catch(error => {
        console.error('Error adding employee:', error);
        document.getElementById("addResult").innerText = "Error adding employee.";
    });
}


// Initial loading of departments
viewAllDepartments();
