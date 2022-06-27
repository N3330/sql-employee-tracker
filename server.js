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
    console.log ('Connected to the company_db database')
);

const init = () => {
    const choices = [
        { name: 'View all departments', value: 'viewAllDepartments' },
        { name: 'View all roles', value: 'viewAllRoles' },
        { name: 'View all employees', value: 'viewAllEmployees' },
        { name: 'Add a new department', value: 'addNewDepartment' },
        { name: 'Add a new role', value: 'addNewRole' },
        { name: 'Add a new employee', value: 'addNewEmployee' },
        { name: 'Update an employee role', value: 'updateEmployeeRole' },
        { name: 'Exit', value: 'exit'},
    ];
    inquirer.prompt([
        {
            type: 'rawlist',
            name: 'query',
            message: 'What option would you like to select?',
            choices,
        }
    ]).then((answers) => finally[answers.query]());
};

init();