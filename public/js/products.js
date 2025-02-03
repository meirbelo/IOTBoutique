document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("editModal");
    const editButtons = document.querySelectorAll(".edit-btn");
    const form = document.getElementById("editProductForm");

    editButtons.forEach(button => {
        button.addEventListener("click", function () {
            const productId = this.getAttribute("data-id");
            const title = this.getAttribute("data-title");
            const price = this.getAttribute("data-price");
            const description = this.getAttribute("data-description");
            const category = this.getAttribute("data-category"); // Nom de la catégorie
            const categoryId = this.getAttribute("data-category-id"); // ID de la catégorie

            // Remplir les champs du formulaire avec les données du produit
            document.getElementById("product").value = productId;
            document.getElementById("Title").value = title;
            document.getElementById("Prix").value = price;
            document.getElementById("Description").value = description;
            
            // Sélectionner correctement la catégorie dans le formulaire
            const categorySelect = document.getElementById("category");
            if (categorySelect) {
                categorySelect.value = categoryId; // Pré-sélectionner l'ID de la catégorie
            }

            // Mettre à jour l'action du formulaire pour correspondre à la route de modification
            form.action = `/shop/admin/product/edit/${productId}`;
        });
    });
});
