document.addEventListener('DOMContentLoaded', function () {
    const menuIcon = document.querySelector('.menu-icon');
    const navLinks = document.querySelector('.nav-links.botton');
    const navItems = document.querySelectorAll('.nav-links.botton a');

    // Toggle menu open/close on icon click
    menuIcon.addEventListener('click', () => {
        menuIcon.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Function to close the menu
    function closeMenu() {
        if (navLinks.classList.contains('active')) {
            menuIcon.classList.remove('active');
            navLinks.classList.remove('active');
        }
    }

    // Close menu when a navigation link is clicked
    navItems.forEach(item => {
        item.addEventListener('click', closeMenu);
    });

    // Form submission and modal logic
    const form = document.getElementById('my-form');
    const modal = document.getElementById('submission-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const status = document.getElementById('my-form-status');
            const data = new FormData(form);

            fetch(form.action, {
                method: 'POST',
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    modal.style.display = 'flex'; // Show the modal
                    form.reset();
                } else {
                    response.json().then(data => {
                        if (Object.hasOwn(data, 'errors')) {
                            status.innerHTML = data["errors"].map(error => error["message"]).join(", ");
                        } else {
                            status.innerHTML = "Oops! There was a problem submitting your form";
                        }
                    });
                }
            }).catch(error => {
                status.innerHTML = "Oops! There was a problem submitting your form";
            });
        });
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }
});

