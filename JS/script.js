
let students = [];

let editIndex = -1;


const studentForm = document.getElementById("studentForm");
const studentList = document.getElementById("studentList");
const studentCount = document.getElementById("studentCount");
const searchInput = document.getElementById("searchInput");
const filterCourse = document.getElementById("filterCourse");
const submitBtn = document.getElementById("submitBtn");



studentForm.addEventListener("submit", function (event) {

    event.preventDefault();


    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const course = document.getElementById("course").value;
    const age = document.getElementById("age").value;

    if (name === "" || email === "" || phone === "" ||
        course === "" || age === "") {

        alert("Please fill all fields.");
        return;
    }

    const student = {
        name: name,
        email: email,
        phone: phone,
        course: course,
        age: age
    };


    if (editIndex !== -1) {

        students[editIndex] = student;
        editIndex = -1;

        submitBtn.textContent = "Add Student";

    } else {


        students.push(student);
    }

    studentForm.reset();

    displayStudents();
});



function displayStudents() {

    studentList.innerHTML = "";


    const searchValue = searchInput.value.toLowerCase();


    const selectedCourse = filterCourse.value;


    const filteredStudents = students.filter(function (student) {

        const matchesSearch =
            student.name.toLowerCase().includes(searchValue);

        const matchesCourse =
            selectedCourse === "All" ||
            student.course === selectedCourse;

        return matchesSearch && matchesCourse;
    });



    filteredStudents.forEach(function (student) {

        const originalIndex = students.indexOf(student);


        const card = document.createElement("div");

        card.className = "student-card";

        card.innerHTML = `
            <h3>${student.name}</h3>

            <p><strong>Email:</strong>
                ${student.email}
            </p>

            <p><strong>Phone:</strong>
                ${student.phone}
            </p>

            <p><strong>Course:</strong>
                ${student.course}
            </p>

            <p><strong>Age:</strong>
                ${student.age}
            </p>

            <button
                class="edit-btn"
                onclick="editStudent(${originalIndex})">
                Edit
            </button>

            <button
                class="delete-btn"
                onclick="deleteStudent(${originalIndex})">
                Delete
            </button>
        `;

        studentList.appendChild(card);
    });


    studentCount.textContent = students.length;
}


function deleteStudent(index) {

    if (confirm("Are you sure you want to delete this student?")) {

        students.splice(index, 1);

        displayStudents();
    }
}


function editStudent(index) {

    const student = students[index];

    document.getElementById("name").value = student.name;
    document.getElementById("email").value = student.email;
    document.getElementById("phone").value = student.phone;
    document.getElementById("course").value = student.course;
    document.getElementById("age").value = student.age;

    editIndex = index;

    submitBtn.textContent = "Update Student";

    window.location.href = "#addStudent";
}



searchInput.addEventListener("input", function () {

    displayStudents();

});


filterCourse.addEventListener("change", function () {

    displayStudents();

});