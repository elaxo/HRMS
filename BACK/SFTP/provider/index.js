

const PROVIDER = {}

PROVIDER.USER = require('./userProvider')
PROVIDER.COMPANY = require('./companyProvider')
PROVIDER.TELEGRAM = require('./botProvider')
PROVIDER.BRANCH = require('./branchProvider')
PROVIDER.DEPARTMENT = require('./departmentProvider')
PROVIDER.TEAM = require('./teamProvider')
PROVIDER.POSITION = require('./postionProvider')
PROVIDER.PENDING_EMPLOYEE = require('./pendingEmployee')
PROVIDER.EMPLOYEE_PROFILE = require('./EmployeeProvider')
module.exports = PROVIDER