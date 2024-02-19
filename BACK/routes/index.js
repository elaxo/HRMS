const { SUCCESS_MSG } = require('../service/responses')
const router = require('express').Router()
const Validator = require('../middleware/Validator')
const { userAuth } = require('../auth/Authorize')
const CONTROLLER = require('../controller')
const multer = require('multer')


const AvatarStorage = multer.diskStorage({
    destination: function (req,file, cb) {
      cb(null, './uploads/avatars')
    },
    filename: function (req, file, cb) {

        if(file.mimetype == "image/jpeg" || file.mimetype == "image/png") // || file.mimetype == 'application/pdf'
        {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            let fileName = file.mimetype == "image/jpeg"?uniqueSuffix+file.fieldname+'.jpg':uniqueSuffix+file.fieldname+'.pdf'
            req.fileName = fileName
            cb(null, fileName)            
        }
        else 
        {
            cb(new Error('Invalid file type. Only JPEG and PDF files are allowed.'), false);
        }
    }
  })
  
const DocumentStorage = multer.diskStorage({
    destination: function (req,file, cb) {
      cb(null, './uploads/documents')
    },
    filename: function (req, file, cb) {

        if(file.mimetype == "image/jpeg" || file.mimetype == 'application/pdf' || file.mimetype == "application/vnd.openxmlformats-officedocument.wordprocessingml.document") // || file.mimetype == 
        {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            let fileName = file.mimetype == "image/jpeg"?uniqueSuffix+file.fieldname+'.jpg':uniqueSuffix+file.fieldname+'.pdf'
            req.fileName = fileName
            cb(null, fileName)            
        }
        else 
        {
            const error = new Error('Invalid file type. Only JPEG and PDF files are allowed.');
            error.statusCode = 400;          
            cb(error, false);
        }
    }
  })
  


const Avatar = multer({ storage: AvatarStorage })
const Document = multer({storage:DocumentStorage})




//user routs
router.get('/',(req,res)=>SUCCESS_MSG("Hey world",res))
router.post('/users/create',Validator.CREATE_USER_VALIDATOR,CONTROLLER.USER_CONTROLLER.CREATE_USER)
router.post('/users/login',Validator.LOGIN_USER,CONTROLLER.USER_CONTROLLER.LOGIN_USER)
router.post('/users/verify',CONTROLLER.USER_CONTROLLER.VALIDATE_USER)
router.post('/users/verify/email',CONTROLLER.USER_CONTROLLER.VALIDATE_USER_EMAIL)
router.put('/user/create/password',userAuth,CONTROLLER.USER_CONTROLLER.CREATE_PASSWORD)


//Employee routes 
router.post('/employees/create',userAuth,Validator.CREATE_EMPLOYEE_VALIDATOR,CONTROLLER.USER_CONTROLLER.CREATE_EMPLOYEE_PROFILE)
router.get('/employee/profile',userAuth,CONTROLLER.USER_CONTROLLER.EMPLOYEE_PROFILE)
router.post('/employee/profile/upload/avatar',userAuth,Avatar.single('avatar'),CONTROLLER.USER_CONTROLLER.UPLOAD_AVATAR)
router.post('/employee/profile/upload/document',userAuth,Document.single('document'),CONTROLLER.USER_CONTROLLER.UPLOAD_DOCUMENT)
router.get('/employees/profile',userAuth,CONTROLLER.COMPANY_EMPLOYEE_CONTROLLER.EMPLOYEE_DETAIL)
router.post('/employees/filter',userAuth,CONTROLLER.COMPANY_EMPLOYEE_CONTROLLER.SEARCH_EMPLOY)
router.get('/employees/search',userAuth,CONTROLLER.COMPANY_EMPLOYEE_CONTROLLER.SEARCH_QUERY)


router.post('/company/create',userAuth,Validator.CREATE_COMPANY_VALIDATOR,CONTROLLER.COMPANY_CONTROLLER.CREATE_COMPANY)
router.get('/company/user',userAuth,CONTROLLER.COMPANY_CONTROLLER.USER_COMPANY_DETAIL)
router.get('/company/employees',userAuth,CONTROLLER.COMPANY_EMPLOYEE_CONTROLLER.COMPANY_EMPLOYEE)

router.get('/branches/user',userAuth,CONTROLLER.BRANCH_CONTROLLER.USER_BRANCHES_LIST)
router.get('/branch/detail',userAuth,CONTROLLER.BRANCH_CONTROLLER.SINGLE_BRANCH_DETAIL)


router.post('/department/create',userAuth,CONTROLLER.DEPARTMENT_CONTROLLER.CREATE_DEPARTMENT)
router.get('/departments/user',userAuth,CONTROLLER.DEPARTMENT_CONTROLLER.USERS_DEPARTMENT_LIST)
router.put('/department/update',userAuth,CONTROLLER.DEPARTMENT_CONTROLLER.UPDATE_DEPARTMENT)
router.get('/department/detail',userAuth,CONTROLLER.DEPARTMENT_CONTROLLER.SINGLE_DEPARTMENT)



router.post('/position/create',userAuth,CONTROLLER.POSITION_CONTROLLER.CREATE_POSITION)
router.get('/positions/team',userAuth,CONTROLLER.POSITION_CONTROLLER.ALL_TEAM_POSITIONS)
router.get('/positions/user',userAuth,CONTROLLER.POSITION_CONTROLLER.USER_POSITIONS)
router.get('/position/detail',userAuth,CONTROLLER.POSITION_CONTROLLER.POSiTION_DETAIL)


router.post('/pending/employee/create',userAuth,CONTROLLER.PENDING_EMPLOYEE.CREATE)
router.get('/pending/employee/user',userAuth,CONTROLLER.PENDING_EMPLOYEE.USER_PENDING_EMPLOYEES)
router.delete('/cancel/employee',userAuth,CONTROLLER.PENDING_EMPLOYEE.DELETE_PENDING_EMPLOYEE)


router.post('/team/create',userAuth,CONTROLLER.TEAM_CONTROLLER.CREATE_TEAM)
router.get('/teams/user',userAuth,CONTROLLER.TEAM_CONTROLLER.LIST_USER_TEAM)
router.get('/teams/department',userAuth,CONTROLLER.TEAM_CONTROLLER.LIST_DEPARTMENT_TEAM)
module.exports = router

