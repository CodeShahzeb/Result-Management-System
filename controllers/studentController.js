//importing student model
const Student = require('../models/student');
var connection = require("../app");

const bodyParser=require("body-parser")



const student_login_get = (req, res) => {
       res.render("student/login");
    };

const student_login_post =  (req, res) => {
        
        let qry = "select * from student where roll=?";
        connection.query(qry,[req.body.roll],(err, results) => {
        if (err){
          res.render("student/login", {
            message : "Login with correct roll number"
          })
        }
        else if(results.length>0) {
          var data=JSON.parse(JSON.stringify(results));
          res.render("student/view",{'result' : data} );
        }
        else{
          res.render("student/login", { message: "Login with correct roll number" });
        }

    });

  };
//exporting student controller functions
module.exports={
    student_login_get,
    student_login_post
}
