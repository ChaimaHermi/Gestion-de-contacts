document.addEventListener("DOMContentLoaded", function () {
    var editButton = document.querySelector(".edit-button");
    editButton.addEventListener("click", editContact);


    var saveButton = document.querySelector(".Enregistrer");
      saveButton.removeEventListener("click", add_Contacts);
        saveButton.addEventListener("click", saveContact);

    function editContact() {
        var civiliteSpan = document.querySelector(".civilite");
        var nomSpan = document.querySelector(".nom");
        var prenomSpan = document.querySelector(".prenom");
        var telephoneSpan = document.querySelector(".telephone");

        var civilite = civiliteSpan.textContent.trim();
        var nom = nomSpan.textContent.trim();
        var prenom = prenomSpan.textContent.trim();
        var telephone = telephoneSpan.textContent.trim();
        var form = document.querySelector(".Formulaire");
        form.style.display = "block";
        detailContact.style.display = 'none'; 
        saveButton.removeEventListener("click",add_Contacts)
        var civiliteInput = document.querySelector("#civilite");
        var nomInput = document.querySelector("#nom");
        var prenomInput = document.querySelector("#prenom");
        var telephoneInput = document.querySelector("#telephone");

        civiliteInput.value = civilite;
        nomInput.value = nom;
        prenomInput.value = prenom;
        telephoneInput.value = telephone;
        saveButton.setAttribute("oldTel",telephone)
    }

    function saveContact(event) { 
        event.preventDefault(); 
        let oldTel = event.currentTarget.getAttribute("oldTel")
        var civilite = document.querySelector("#civilite").value;
        var nom = document.querySelector("#nom").value;
        var prenom = document.querySelector("#prenom").value;
        var telephone = document.querySelector("#telephone").value;
        var existingContacts = localStorage.getItem("contacts");
        var contacts = existingContacts ? JSON.parse(existingContacts) : [];
        var contactToUpdate = contacts.find(function(contact) {
            return contact.telephone === oldTel;
        });

        if (contactToUpdate) {
            contactToUpdate.civilite = civilite;
            contactToUpdate.nom = nom;
            contactToUpdate.prenom = prenom;
            contactToUpdate.telephone = telephone;
            localStorage.setItem("contacts", JSON.stringify(contacts));
            document.querySelector(".Formulaire").reset();
            alert("Les informations du contact ont été mises à jour avec succès.");
            window.location.reload(); 
        } 
    }
});
