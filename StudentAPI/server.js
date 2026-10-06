
const express = require("express");
const prisma = require("./prismaClient");

const app = express();

const PORT = 3000;

// Middleware to read JSON request body
app.use(express.json());

// Test API
app.get("/", (req, res) => {
    res.send("Student API is running!");
});

// Get all students
app.get("/students", async (req, res) => {
    try {
        const students = await prisma.student.findMany();

        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch students"
        });
    }
});

// Get one student by ID
app.get("/students/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);

        const student = await prisma.student.findUnique({
            where: {
                id: id
            }
        });

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.status(200).json(student);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch student"
        });
    }
});

// Add a new student
// Add a new student
app.post("/students", async (req, res) => {
    try {
        const { name, email, course, age, city } = req.body;

        // Validation
        if (!name || !email || !course || !age || !city) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const student = await prisma.student.create({
            data: {
                name,
                email,
                course,
                age,
                city
            }
        });

        res.status(201).json(student);

    } catch (error) {
        res.status(500).json({
            message: "Failed to create student"
        });
    }
});
// Update a student by ID
app.put("/students/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { name, email, course, age, city } = req.body;

        const student = await prisma.student.update({
            where: {
                id: id
            },
            data: {
                name,
                email,
                course,
                age,
                city
            }
        });

        res.status(200).json(student);

    } catch (error) {
        res.status(404).json({
            message: "Student not found"
        });
    }
});

// Delete a student by ID
app.delete("/students/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);

        const student = await prisma.student.delete({
            where: {
                id: id
            }
        });

        res.status(200).json(student);

    } catch (error) {
        res.status(404).json({
            message: "Student not found"
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

