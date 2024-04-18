
    const checkboxes = document.querySelectorAll('.forms');

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            checkboxes.forEach(cb => {
                if (cb !== this) {
                    cb.checked = false;
                }
            });
            // Remove 'col-auto' class from parent div after a checkbox is clicked
            document.getElementById('checkbox-Container').classList.remove('col-auto');
        });
    });
    const cbAttendence = document.querySelectorAll('.formAttendance');

    cbAttendence.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            cbAttendence.forEach(cb => {
                if (cb !== this) {
                    cb.checked = false;
                }
            });
            // Remove 'col-auto' class from parent div after a checkbox is clicked
            document.getElementById('checkbox-Container').classList.remove('col-auto');
        });
    });

// navigate function 
function navigate() {
    var checkboxes = document.querySelectorAll('.formAttendance');
    var checkedCheckbox = Array.from(checkboxes).find(checkbox => checkbox.checked);

    if (checkedCheckbox) {
        switch (checkedCheckbox.id) {
            case 'work':
                window.location.href = 'work-detail.html';
                break;
            case 'delay':
                window.location.href = 'work-detail.html';
                break;
            case 'leave':
                window.location.href = 'leaveForm.html';
                break;
            default:
                // Handle if no checkbox is checked
                alert('Please select an option.');
        }
    } else {
        // Handle if no checkbox is checked
        alert('Please select an option.');
    }
}

    $(document).ready(function(){
        // Initialize datepicker
        $('#datepicker').datepicker({
            autoclose: true,
            todayHighlight: true
        });
    });


    function navigateToPage1() {
        window.location.href = 'index.html';
    }

    // name form

    document.getElementById("nameForm").addEventListener("submit", function(event) {
        var checkboxes = document.querySelectorAll('.forms');
        var isChecked = false;
        checkboxes.forEach(function(checkbox) {
            if (checkbox.checked) {
                isChecked = true;
            }
        });
        if (!isChecked) {
            alert("required");
            event.preventDefault();
        }
    });