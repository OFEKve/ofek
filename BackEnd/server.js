const express = require("express");
const mongoose = require("mongoose");
const Student = require("./schema"); // Assuming your schema file
const cors = require("cors");

const app = express();
app.use(cors());

app.use(express.json());

const uri =
  "mongodb+srv://user:Ofek1234!@cluster0.1o0xz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

async function connectToDB() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(uri, clientOptions);
    console.log("Connected to MongoDB!");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    // Handle connection errors gracefully (e.g., retry)
  }
}

connectToDB(); // Call the connection function
app.get("/", async (req, res) => {
  try {
    // שליפת כל הסטודנטים מהמסד
    const students = await Student.find();

    // שליחת המידע חזרה ללקוח
    res.json(students);
  } catch (err) {
    console.error("Error fetching students:", err);
    res.status(500).send("Server error");
  }
});
app.post("/", async (req, res) => {
  try {
    const data = req.body;
    console.log("Received data:", data);

    // יצירת אובייקט סטודנט חדש
    const newStudent = new Student(data);
    await newStudent.save(); // שמירה במסד הנתונים

    // שליחה חזרה ללקוח עם הודעת הצלחה
    res.status(201).json({ msg: "Student added successfully!" });
  } catch (err) {
    console.error("Error adding student:", err);
    res.status(400).json({ msg: "Failed to add student" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Running on port" + port);
});
