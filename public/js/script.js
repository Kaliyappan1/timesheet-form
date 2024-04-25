const form = document.getElementById('timesheet-form');
const successMessage = document.getElementById('success-message');

form.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission

  // Form validation (add more validation as needed)
  const name = document.getElementById('name').value;
  const date = document.getElementById('date').value;
  const hoursWorked = document.getElementById('hours-worked').value;
  const description = document.getElementById('description').value;

  if (name === '' || date === '') {
    alert('Please enter your name and date.');
    return; // Exit the function if validation fails
  }

  if (hoursWorked < 0 || hoursWorked > 24) {
    alert('Please enter valid hours worked (between 0 and 24).');
    return;
  }

  // Simulate form submission (replace with your actual submission logic)
  console.log('Submitting timesheet:', {
    name: name,
    date: date,
    attendance: document.querySelector('input[name="attendance"]:checked').value,
    hoursWorked: hoursWorked,
    description: description
  });

  successMessage.classList.remove('d-none'); // Show success message
  setTimeout(() => {
    successMessage.classList.add('d-none'); // Hide success message after a delay
    //   Redirect after hiding message
    // window.location.href = "submit.html";
  },100000000000000); // Hide message after 3 seconds
});



function validateAdminLogin(event) {
  event.preventDefault(); // Prevent default form submission

  // Get form values
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Simple validation (replace with your actual validation logic)
  if (email === '' || password === '') {
    alert('Please enter your email and password.');
    return false; // Prevent form submission if validation fails
  }

  // Simulate successful login (replace with your login logic)
  console.log('Admin login successful:', { email: email, password: password });

  // Redirect to another page after successful login
  window.location.href = "timesheetData.html"; // Replace with your target filename
}
