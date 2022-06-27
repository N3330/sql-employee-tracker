const mysql = require('mysql2');
const inquirer = require('inquirer');
require('console.table');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'company_db'
    },
    console.log('Connected to the company_db database')
);

const fn = {
    async viewAllDepartments() {
        db.query('SELECT * FROM department', function (err, results) {
            if (err) return console.error(err);
            console.table(results);
            return init();
        });
    },
    viewAllRoles() {
        db.query('SELECT title, role.id, department.name, salary FROM role JOIN department ON role.department_id = department.id', function (err, results) {
            if (err) return console.error(err);
            console.table(results);
            return init();
        })
    },
    viewAllEmployees() {
        db.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
        FROM employee
        LEFT JOIN employee manager on manager.id = employee.manager_id
        INNER JOIN role ON (role.id = employee.role_id)
        INNER JOIN department ON (department.id = role.department_id)
        ORDER BY employee.id;`, function (err, results) {
            if (err) return console.error(err);
            console.table(results);
            return init();
        })
    },
    addNewDepartment() {
        inquirer.prompt([
            {
                type: "input",
                name: "newDepartment",
                message: "Please enter the department name you want to add"
            }
        ]).then(({ newDepartment }) => {
            console.log(newDepartment);
            db.query(`INSERT INTO department (name) VALUES ("${newDepartment}");`, function (err, results) {
                if (err) return console.error(err);
                return init();

            })
        })
        //need to find a way to pass answer into query to insert string into department_db
    },
    async addNewRole() {
        const [departments] = await db.promise().query('SELECT * FROM department')
        const departmentArray = departments.map(({ name, id }) => ({
            name: name,
            value: id
        }))
        inquirer.prompt([{
            type: "input",
            name: "title",
            message: "what is the title for the new role?"
        },{
            type: "input",
            name: "salary",
            message: "the salary for the new role?"
        }, {
            type: "list",
            name: "department_id",
            message: "What is the correct department for the new role?",
            choices: departmentArray

        }])
        .then(answers => {
            db.promise().query(`INSERT INTO ROLE SET ?`, answers).then(() => {
                this.viewAllRoles();
            })
        });
    },
    async updateEmployeeRole() {
        const [employees] = await db.promise().query('SELECT * FROM employee');
        const employeeArray = employees.map(({first_name, last_name, id}) => ({
            name: first_name + " " + last_name,
            value: id
        }) )
        const [roles] = await db.promise().query('SELECT * FROM role');
        const roleArray = roles.map(({title, id}) => ({
            name: title,
            value: id
        })) 
        inquirer.prompt([{
            type: "list",
            name: "id",
            message: "Which employee would you want to update",
            choices: employeeArray
        },{
            type: "list",
            name: "role_id",
            message: `What is the new role?`,
            choices: roleArray
        }]).then(answers => {
            // console.log("UPDATE employee SET role_id = ? WHERE id = ?")
            db.promise().query('UPDATE employee SET role_id = ? WHERE id = ?', [answers.role_id, answers.id]).then(() => {
                this.viewAllEmployees();
            } )
        })
    }



};


const init = () => {
    const choices = [
        { name: 'View all departments', value: 'viewAllDepartments' },
        { name: 'View all roles', value: 'viewAllRoles' },
        { name: 'View all employees', value: 'viewAllEmployees' },
        { name: 'Add a new department', value: 'addNewDepartment' },
        { name: 'Add a new role', value: 'addNewRole' },
        { name: 'Add a new employee', value: 'addNewEmployee' },
        { name: 'Update an employee role', value: 'updateEmployeeRole' },
        { name: 'Exit', value: 'exit' },
    ];
    inquirer.prompt([
        {
            type: 'rawlist',
            name: 'query',
            message: 'What option would you like to select?',
            choices,
        }
    ]).then((answers) => fn[answers.query]());
};

init();