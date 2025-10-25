document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const menuMovil = document.getElementById('menuMovil');

    menuToggle.addEventListener('click', function() {
        menuMovil.classList.toggle('active');
    });

    document.addEventListener('click', function(event) {
        if (!menuMovil.contains(event.target) && !menuToggle.contains(event.target)) {
            menuMovil.classList.remove('active');
        }
    });
});