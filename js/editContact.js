// Définir une variable globale pour stocker l'ancien numéro de téléphone
var oldTelephone = '';

// Fonction pour éditer un contact
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

  // Sauvegarder l'ancien numéro de téléphone dans la variable globale
  oldTelephone = telephone;
}

// Fonction pour sauvegarder un contact
function saveContact(event) {
  //event.preventDefault();

  var oldTel = oldTelephone;

  var civilite = document.querySelector("#civilite").value;
  var nom = document.querySelector("#nom").value;
  var prenom = document.querySelector("#prenom").value;
  var telephone = document.querySelector("#telephone").value;

  if (civilite.trim() === '' || prenom.trim() === '' || nom.trim() === '' || telephone.trim() === '') {
    alert("Veuillez remplir tous les champs du formulaire.");
    var saveButton = document.querySelector(".Enregistrer");
    saveButton.removeEventListener("click", add_Contacts);

    
  } else if (!isAlpha(prenom) || !isAlpha(nom)) {
    alert("Veuillez entrer un nom et prénom valides.");
    var saveButton = document.querySelector(".Enregistrer");
    saveButton.removeEventListener("click", add_Contacts);

  } else if (!isValidPhoneNumber(telephone)) {
    alert("Veuillez entrer un numéro de téléphone valide (8 chiffres).");
    var saveButton = document.querySelector(".Enregistrer");
    saveButton.removeEventListener("click", add_Contacts);

  } else {
    var existingContacts = localStorage.getItem("contacts");
    var contacts = existingContacts ? JSON.parse(existingContacts) : [];

    // Vérification si le nouveau numéro de téléphone existe déjà
    var contactWithSamePhone = contacts.find(function(contact) {
      return contact.telephone === telephone && contact.telephone !== oldTel;
    });

    if (contactWithSamePhone) {
      alert("Ce numéro de téléphone existe déjà.");
      var saveButton = document.querySelector(".Enregistrer");
      saveButton.removeEventListener("click", add_Contacts);
  
    } else {
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
         var saveButton = document.querySelector(".Enregistrer");
      saveButton.removeEventListener("click", add_Contacts);
        window.location.reload(); 
      }
    }
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

document.addEventListener("DOMContentLoaded", function () {
  var editButton = document.querySelector(".edit-button");
  editButton.addEventListener("click", editContact);

  var saveButton = document.querySelector(".Enregistrer");
  saveButton.removeEventListener("click", add_Contacts);
  saveButton.addEventListener("click", saveContact);
});
