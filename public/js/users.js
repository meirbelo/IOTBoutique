document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("editModal");
    const closeBtn = document.querySelector(".close");
    const editButtons = document.querySelectorAll(".edit-btn");
    const form = document.getElementById("editUserForm");

    // Fonction pour ouvrir la modale avec les infos du user
    editButtons.forEach(button => {
        button.addEventListener("click", function () {
            const userId = this.getAttribute("data-id");
            const login = this.getAttribute("data-login");
            const email = this.getAttribute("data-email");
            const admin = this.getAttribute("data-admin");

            document.getElementById("userId").value = userId;
            document.getElementById("login").value = login;
            document.getElementById("email").value = email;
            document.getElementById("admin").value = admin;

            // Définir l'action du formulaire pour la modification
            form.action = `/admin/users/edit/${userId}`;

            modal.style.display = "block";
        });
    });

    // Fermer la modale
    closeBtn.addEventListener("click", function () {
        modal.style.display = "none";
    });

    // Fermer si on clique en dehors de la modale
    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});
alert("Hello from users.js");