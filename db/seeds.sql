INSERT INTO department (name)
VALUES ("Marketing"),
        ("Finance"),
        ("Sales"),
        ("IT");

INSERT INTO role (title, salary, department_id)
VALUES ( "Manager", 85000.00, 1),
        ("Analyst", 50000.00, 1),
        ("Manager", 85000.00, 2),
        ("Analyst", 50000.00, 2),
        ("Manager", 85000.00, 3),
        ("Analyst", 50000.00, 3),
        ("Manager", 85000.00, 4),
        ("Engineer", 50000.00, 4);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("James", "Giraldo", 3),
        ("Matt", "Davis", 1),
        ("John", "Smith", 1),
        ("Anthony", "Cooper", 3);

