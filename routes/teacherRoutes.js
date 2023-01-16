var express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');
const { check, validationResult } = require('express-validator');



router.get('/login',teacherController.teacher_login_get);
router.post('/login',teacherController.teacher_login_post);
router.get('/viewall',teacherController.teacher_viewall_get);
router.get('/edit/:id',teacherController.teacher_edit_get);
router.post('/edit/:id',[check('roll','Give Integer value').isNumeric(),
 check('sname','Name Should have atleast 3 characters').isLength({min:3})
,check('score','Score of a Student should be in Integer value').isNumeric()],
teacherController.teacher_edit_post);
router.get('/delete/:id',teacherController.teacher_delete_get);
router.get('/option',teacherController.teacher_option_get);
router.post('/add',[check('sname','Name Should have atleast 3 characters').isLength({min:3})
,check('score','Score of a Student should be in Integer value').isNumeric()],
teacherController.teacher_add_post);
router.get('/add',teacherController.teacher_add_get);

module.exports = router;