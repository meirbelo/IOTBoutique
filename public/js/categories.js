document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("editModal");
    const editButtons = document.querySelectorAll(".edit-btn");
    const form = document.getElementById("editcategoryForm");

    editButtons.forEach(button => {
        button.addEventListener("click", function () {
            const categoryId = this.getAttribute("data-id");
            const category_name = this.getAttribute("data-category_name");

            document.getElementById("categoryId").value = categoryId;
            document.getElementById("category_name").value = category_name;
            
            form.action = `/shop/admin/category/edit/${categoryId}`;
        });
    });
});