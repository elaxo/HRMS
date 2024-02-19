const CONTROLLER = {}


CONTROLLER.USER_CONTROLLER = require('./userController')
CONTROLLER.COMPANY_CONTROLLER = require('./companyController')
CONTROLLER.BRANCH_CONTROLLER = require('./branchController')
CONTROLLER.DEPARTMENT_CONTROLLER = require('./departmentController')
CONTROLLER.TEAM_CONTROLLER = require('./teamController')
CONTROLLER.POSITION_CONTROLLER = require('./positionController')
CONTROLLER.COMPANY_EMPLOYEE_CONTROLLER = require('./companyEmployeController')
CONTROLLER.PENDING_EMPLOYEE = require('./pendingEmployeeController')
module.exports = CONTROLLER