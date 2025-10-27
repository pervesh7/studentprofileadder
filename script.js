document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("studentForm");
  const studentList = document.getElementById("studentList");
  const clearDataBtn = document.getElementById("clearData");

  function loadStudents() {
    studentList.innerHTML = "";
    const students = JSON.parse(localStorage.getItem("students")) || [];
    students.forEach((student, index) => {
      const card = document.createElement("div");
      card.classList.add("student-card");
      card.innerHTML = `
        <strong>${student.name}</strong><br>
        Email: ${student.email}<br>
        Age: ${student.age}<br>
        Course: ${student.course}<br>
        Notes: ${student.notes || "—"}<br>
        <button onclick="deleteStudent(${index})">Delete</button>
      `;
      studentList.appendChild(card);
    });
  }

  form.addEventListener("submit", function(e) {
    e.preventDefault();
    const student = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      age: form.age.value.trim(),
      course: form.course.value.trim(),
      notes: form.notes.value.trim()
    };

    if (!student.name || !student.email) {
      alert("Please fill in all required fields.");
      return;
    }

    const students = JSON.parse(localStorage.getItem("students")) || [];
    students.push(student);
    localStorage.setItem("students", JSON.stringify(students));

    form.reset();
    loadStudents();
  });

  clearDataBtn.addEventListener("click", function() {
    if (confirm("Are you sure you want to clear all student data?")) {
      localStorage.removeItem("students");
      loadStudents();
    }
  });

  // Expose deleteStudent globally
  window.deleteStudent = function(index) {
    const students = JSON.parse(localStorage.getItem("students")) || [];
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    loadStudents();
  };

  loadStudents();
});

