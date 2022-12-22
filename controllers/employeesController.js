const data = {};
data.employees = require("../model/employees.json");

const getAllEmployees = (req, res) => {
  res.json(data.employees);
};

const createNewEmployee = (req, res) => {
  const newEmployee = {
    id: data.employees[data.employees.length - 1].id + 1 || 1,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };
  if (!newEmployee.firstname || !newEmployee.lastname) {
    return res
      .status(400)
      .json({ message: "First and last names are required" });
  }
  data.employees.push(newEmployee);
  res.status(201).json(data.employees);
};

const updateEmployee = (req, res) => {
  let employee = data.employees.find((emp) => emp.id === parseInt(req.body.id));
  if (!employee) {
    return res
      .status(400)
      .json({ message: `Employee ID ${req.body.id} not found` });
  }

  let newData = data.employees.map((ele) => {
    if (ele.id === req.body.id) {
      if (req.body.firstname) {
        ele.firstname = req.body.firstname;
      }
      if (req.body.lastname) {
        ele.lastname = req.body.lastname;
      }
    }
    return ele;
  });
  data.employees = newData;
  res.json(data.employees);
};

const deleteEmployee = (req, res) => {
  let employee = data.employees.find((emp) => emp.id === parseInt(req.body.id));
  if (!employee) {
    return res
      .status(400)
      .json({ message: `Employee ID ${req.body.id} not found` });
  }
  const filteredArray = data.employees.filter(
    (emp) => emp.id !== parseInt(req.body.id)
  );
  data.employees = filteredArray;
  res.json(data.employees);
};

const getEmployee = (req, res) => {
  let employee = data.employees.find(
    (emp) => emp.id === parseInt(req.params.id)
  );
  if (!employee) {
    return res
      .status(400)
      .json({ message: `Employee ID ${req.body.id} not found` });
  }
  res.json(employee);
};

module.exports = {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
};
