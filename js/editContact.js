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
  
      var civiliteInput = document.querySelector("#civilite");
      var nomInput = document.querySelector("#nom");
      var prenomInput = document.querySelector("#prenom");
      var telephoneInput = document.querySelector("#telephone");
  
      civiliteInput.value = civilite;
      nomInput.value = nom;
      prenomInput.value = prenom;
      telephoneInput.value = telephone;
      saveButton.setAttribute("oldTel", telephone);
    }
  
    function saveContact(event) {
      event.preventDefault();
  
      var oldTel = event.currentTarget.getAttribute("oldTel");
      var civilite = document.querySelector("#civilite").value;
      var nom = document.querySelector("#nom").value;
      var prenom = document.querySelector("#prenom").value;
      var telephone = document.querySelector("#telephone").value;
  
      // Validation pour vérifier que les champs requis sont remplis
      if (civilite.trim() === '' || prenom.trim() === '' || nom.trim() === '' || telephone.trim() === '') {
        alert("s'il vous plait veuillez remplir tous les champs du formulaire.");
        saveButton.removeEventListener("click", add_Contacts);

        return;
      }
  
      // Validation pour vérifier que prenom et nom contiennent uniquement des lettres
      if (!isAlpha(prenom) || !isAlpha(nom)) {
        alert("s'il vous plait entrer un nom et prenom valide .");
        saveButton.removeEventListener("click", add_Contacts);

        return;
      }
  
      // Validation pour vérifier que telephone est numérique et a exactement 8 chiffres
      if (!isValidPhoneNumber(telephone)) {
        alert("s'il vous plait  entrer un numéro de téléphone valide un numero telephone doit etre de 8 chiffres.");
        saveButton.removeEventListener("click", add_Contacts);

        return;
      }
  
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
        saveButton.removeEventListener("click", add_Contacts);

        window.location.reload(); 
      }
    }
  
    // Fonction utilitaire pour vérifier si une chaîne ne contient que des lettres
    function isAlpha(str) {
      return /^[a-zA-Z]+$/.test(str);
    }
  
    // Fonction utilitaire pour valider le numéro de téléphone (8 chiffres numériques)
    function isValidPhoneNumber(phone) {
      return /^\d{8}$/.test(phone);
    }
  });
  