document.addEventListener("DOMContentLoaded", function () {
    // Sélectionner le bouton "Editer ce contact"
    var editButton = document.querySelector(".edit-button");
  
    // Ajouter un écouteur d'événements pour le clic sur le bouton "Editer ce contact"
    editButton.addEventListener("click", function () {
        // Récupérer les valeurs des champs civilite, nom, prenom, telephone
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
    var saveButton = document.querySelector("#save-button");

    // Ajouter un écouteur d'événements pour le clic sur le bouton "Enregistrer"
    saveButton.addEventListener("click", function (event) {
        event.preventDefault(); // Empêcher le comportement par défaut du formulaire

        // Récupérer les valeurs du formulaire
        var civiliteValue = document.querySelector("#civilite").value;
        var nomValue = document.querySelector("#nom").value;
        var prenomValue = document.querySelector("#prenom").value;
        var telephoneValue = document.querySelector("#telephone").value;

        // Vérifier si les champs sont remplis (pour éviter l'ajout d'un contact vide)
        if (nomValue && prenomValue && telephoneValue) {
            // Récupérer les contacts existants depuis localStorage
            var contacts = JSON.parse(localStorage.getItem('contacts')) || [];

            // Rechercher l'index du contact à mettre à jour (s'il existe)
            var indexToUpdate = contacts.findIndex(function(contact) {
                return contact.nom === nomValue && contact.prenom === prenomValue && contact.telephone === telephoneValue;
            });

            if (indexToUpdate !== -1) {
                // Mettre à jour le contact existant
                contacts[indexToUpdate] = {
                    civilite: civiliteValue,
                    nom: nomValue,
                    prenom: prenomValue,
                    telephone: telephoneValue
                };

                // Mettre à jour localStorage avec la liste mise à jour des contacts
                localStorage.setItem('contacts', JSON.stringify(contacts));

                // Cacher le formulaire après la mise à jour
                var form = document.querySelector(".Formulaire");
                form.style.display = "none";

                // Recharger la page ou effectuer d'autres actions si nécessaires
                // window.location.reload(); // Recharger la page (exemple)
            } else {
                console.log("Le contact à mettre à jour n'a pas été trouvé.");
            }
        } else {
            console.log("Veuillez remplir tous les champs.");
        }
    });
});
