var connection = require("../app");
const { validationResult } = require('express-validator');

const teacher_login_get = (req, res) => {
    res.render("teacher/teacherLogin");
};

const teacher_login_post = (req, res) => {

    //******** Teacher Login Password **********//
    let qry = "select * from teacher where password=?";
    connection.query(qry, [req.body.password], (err, results) => {
        if (err) {
            res.render("teacher/teacherLogin", {
                error: "Please Enter Correct Password"
            })
        }
        else if (results.length > 0) {
            res.render("teacher/option");
        }
        else {
            res.render("teacher/teacherLogin", {
                error: "Please Enter Correct Password"
            })
        }

    });

};

const teacher_viewall_get = (req, res) => {


    let qry = "select * from student ";
    connection.query(qry, (err, results) => {
        if (err) {
            res.render("teacher/add", {
                error: "Ooops! Something Wrong Try Again"
            })
        }
        else {
            res.render("teacher/viewall", { student: results });
        }

    });
};

const teacher_edit_get = (req, res) => {
    console.log("edit get")
    var id = req.params.id;
    var sql = `SELECT * FROM student where roll=?`;

    connection.query(sql, [id], function (err, results) {
        if (err) throw err;
        console.log(results)
        var data = JSON.parse(JSON.stringify(results));
        res.render('teacher/edit', { 'result': data });
    });
};
const teacher_edit_post = (req, res) => {
    var id = req.params.id;
    var updateData = req.body;
    var sql = `UPDATE student SET ? WHERE roll= ?`;
    connection.query(sql, [updateData, id], function (err, data) {
        if (err) throw err;
        console.log(data.affectedRows + " record(s) updated");
    });
    res.redirect("/teacher/viewall");
};
const teacher_delete_get = (req, res) => {

    var sql = 'DELETE FROM student WHERE roll = ?';
    var id = req.params.id;

    connection.query(sql, [id], function (err, result) {
        if (err) {
            throw err;
        }
        console.log(result.affectedRows + ' row(s) updated');
    });
    res.redirect("/teacher/viewall");
};
const teacher_option_get = (req, res) => {
    res.render("teacher/option")
};
const teacher_add_get = (req, res) => {
    res.render("teacher/addstudent");
};
const teacher_add_post = (req, res) => {
    const { roll, sname, dob, score } = req.body

    // Sanitization XSS...
    let qry = "select * from student where roll=? ";
    connection.query(qry, [roll], (err, results) => {
        if (err) {
            throw err;
        }

        else {
            if (results.length > 0) {
                res.render("teacher/viewall", { checkmesg: true })
            } else {
                let qry2 = "insert into student values(?,?,?,?)";
                connection.query(qry2, [roll, sname, dob, score], (err, results) => {
                    if (results.affectedRows > 0) {
                        res.redirect("/teacher/viewall")
                    }
                })
            }
        }
    })



};

//exporting teacher controller functions
module.exports = {
    teacher_login_get,
    teacher_login_post,
    teacher_viewall_get,
    teacher_edit_get,
    teacher_edit_post,
    teacher_delete_get,
    teacher_add_post,
    teacher_add_get,
    teacher_option_get
}