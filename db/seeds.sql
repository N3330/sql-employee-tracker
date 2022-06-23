INSERT INTO department (id, name)
VALUES (1,"Marketing"),
        (2, "Finance"),
        (3, "Sales"),
        (4, "IT");

INSERT INTO role (id, title, salary, department_id)
VALUES (1, "Manager", 85000.00, 1),
        (2, "Analyst", 50000.00, 1),
        (1, "Manager", 85000.00, 2),
        (2, "Analyst", 50000.00, 2),
        (1, "Manager", 85000.00, 3),
        (2, "Analyst", 50000.00, 3),
        (1, "Manager", 85000.00, 4),
        (3, "Engineer", 50000.00, 4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (33, "James", "Giraldo", 3, 22),
        (22, "Matt", "Davis", 1, NUll),
        (44, "John", "Smith", 1, NULL),
        (55, "Anthony", "Cooper", 3, 44),

