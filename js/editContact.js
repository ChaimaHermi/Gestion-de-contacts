document.addEventListener("DOMContentLoaded", function () {
    // Sélectionner le bouton "Editer ce contact"
    var editButton = document.querySelector(".edit-button");

    // Ajouter un écouteur d'événements pour le clic sur le bouton "Editer ce contact"
    editButton.addEventListener("click", function () {
        // Récupérer les valeurs des champs civilite, nom, prenom, telephone depuis les éléments span
        var civiliteSpan = document.querySelector(".civilite");
        var nomSpan = document.querySelector(".nom");
        var prenomSpan = document.querySelector(".prenom");
        var telephoneSpan = document.querySelector(".telephone");

        var civilite = civiliteSpan.textContent.trim();
        var nom = nomSpan.textContent.trim();
        var prenom = prenomSpan.textContent.trim();
        var telephone = telephoneSpan.textContent.trim();

        // Afficher le formulaire avec les valeurs pré-remplies
        var form = document.querySelector(".Formulaire");
        form.style.display = "block";
        detailContact.style.display = 'none';

        var saveButton = document.querySelector(".Enregistrer");

        // Ajouter un écouteur d'événements pour le clic sur le bouton "Enregistrer"
        saveButton.removeEventListener("click",add_Contacts)
         
        // Pré-remplir les champs du formulaire avec les valeurs récupérées
        var civiliteInput = document.querySelector("#civilite");
        var nomInput = document.querySelector("#nom");
        var prenomInput = document.querySelector("#prenom");
        var telephoneInput = document.querySelector("#telephone");

        civiliteInput.value = civilite;
        nomInput.value = nom;
        prenomInput.value = prenom;
        telephoneInput.value = telephone;
    });

    // Sélectionner le bouton "Enregistrer" dans le formulaire
    var saveButton = document.querySelector(".Enregistrer");

    // Ajouter un écouteur d'événements pour le clic sur le bouton "Enregistrer"
    saveButton.addEventListener("click", function (event) {
        event.preventDefault(); // Empêcher le comportement par défaut du formulaire

        // Récupérer les valeurs mises à jour depuis les champs du formulaire
        var civilite = document.querySelector("#civilite").value;
        var nom = document.querySelector("#nom").value;
        var prenom = document.querySelector("#prenom").value;
        var telephone = document.querySelector("#telephone").value;

        // Récupérer les contacts depuis le localStorage
        var existingContacts = localStorage.getItem("contacts");
        var contacts = existingContacts ? JSON.parse(existingContacts) : [];

        // Identifier le contact à mettre à jour (par exemple, en utilisant le numéro de téléphone comme identifiant unique)
        var contactToUpdate = contacts.find(function(contact) {
            return contact.telephone === telephone;
        });

        if (contactToUpdate) {
            // Mettre à jour les informations du contact
            contactToUpdate.civilite = civilite;
            contactToUpdate.nom = nom;
            contactToUpdate.prenom = prenom;

            // Mettre à jour la liste des contacts dans le localStorage
            localStorage.setItem("contacts", JSON.stringify(contacts));

            // Réinitialiser le formulaire
            document.querySelector(".Formulaire").reset();

            // Afficher un message de succès (vous pouvez remplacer cela par une autre action)
            alert("Les informations du contact ont été mises à jour avec succès.");
            
            // Recharger la page pour refléter les mises à jour (optionnel)
            window.location.reload(); // Recharge la page après la mise à jour du contact
        } 
    });
});
