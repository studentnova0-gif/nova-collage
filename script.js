alert("Welcome to Nova Colllage")
const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3000;
const FILE = "students.json";

// Test backend
app.get("/", (req, res) => {
    res.send("Nova College Backend is Running!");
});

// Save admission
app.post("/admission", (req, res) => {

    const student = req.body;

    fs.readFile(FILE, "utf8", (err, data) => {

        let students = [];

        if (!err && data) {
            students = JSON.parse(data);
        }

        students.push({
            id: Date.now(),
            name: student.name,
            fatherName: student.fatherName,
            phone: student.phone,
            program: student.program
        });

        fs.writeFile(
            FILE,
            JSON.stringify(students, null, 2),
            (err) => {

                if (err) {
                    return res.status(500).json({
                        message: "Could not save student"
                    });
                }

                res.json({
                    message: "Admission saved successfully!"
                });
            }
        );
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
document.getElementById("admissionForm").addEventListener("submit", async function(e) {

    e.preventDefault();

    const student = {
        name: document.getElementById("name").value,
        fatherName: document.getElementById("fatherName").value,
        phone: document.getElementById("phone").value,
        program: document.getElementById("program").value
    };

    const response = await fetch("http://localhost:3000/admission", {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(student)
    });

    const result = await response.json();

    alert(result.message);

});
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("YOUR_MONGODB_CONNECTION_STRING")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  program: String,
  age: Number
});

const Student = mongoose.model("Student", studentSchema);

app.post("/students", async (req, res) => {
  const student = new Student(req.body);
  await student.save();

  res.json({
    message: "Student saved successfully",
    student
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

alert("welcom to nova college")