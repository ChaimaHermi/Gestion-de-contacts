var addButton = document.getElementById('btnAdd');
var formulaire = document.querySelector('.Formulaire');
var detailContact = document.querySelector('.detail_contact');






addButton.onclick = function() {
  formulaire.style.display = 'block';
  detailContact.style.display = 'none';
  
};

document.addEventListener("DOMContentLoaded", function() {
  var saveButton = document.querySelector(".Enregistrer");

  saveButton.addEventListener("click", add_Contacts);

  var addButton = document.getElementById('btnAdd');
  var formulaire = document.querySelector('.Formulaire');
  var detailContact = document.querySelector('.detail_contact');

  addButton.onclick = function() {
    formulaire.style.display = 'block';
    detailContact.style.display = 'none';

    document.querySelectorAll('.Contact.selected').forEach(function(contact) {
      contact.classList.remove('selected');
    })
  };
});




function add_Contacts() {
  var civilite = document.getElementById("civilite").value;
  var prenom = document.getElementById("prenom").value;
  var nom = document.getElementById("nom").value;
  var telephone = document.getElementById("telephone").value;

  // Validation pour vérifier que les champs requis sont remplis
  if (civilite.trim() === '' || prenom.trim() === '' || nom.trim() === '' || telephone.trim() === '') {
    alert("s'il vous plait veuillez remplir tous les champs du formulaire.");
    return;
  }

  // Validation pour vérifier que prenom et nom contiennent uniquement des lettres
  if (!isAlpha(prenom) || !isAlpha(nom)) {
    alert("Entrer un nom et prenom valide .");
    return;
  }

  // Validation pour vérifier que telephone est numérique et a exactement 8 chiffres
  if (!isValidPhoneNumber(telephone)) {
    alert("s'il vous plait  entrer un numéro de téléphone valide un numero telephone doit etre de 8 chiffres.");
    return;
  }

  var existingContacts = localStorage.getItem("contacts");
  var contacts = existingContacts ? JSON.parse(existingContacts) : [];

  var isDuplicate = contacts.some(function(contact) {
    return contact.telephone === telephone;
  });

  if (isDuplicate) {
    alert("Ce numéro de téléphone existe déjà dans les contacts.");
    return;
  }

  // Si toutes les validations sont passées, ajouter le contact
  var contact = {
    civilite: civilite,
    prenom: prenom,
    nom: nom,
    telephone: telephone,
  };

  contacts.push(contact);
  localStorage.setItem("contacts", JSON.stringify(contacts));

  document.querySelector("form").reset();
  alert("Le contact a été ajouté avec succès.");
  location.reload();
}

// Fonction utilitaire pour vérifier si une chaîne ne contient que des lettres
function isAlpha(str) {
  return /^[a-zA-Z]+$/.test(str);
}

// Fonction utilitaire pour valider le numéro de téléphone (8 chiffres numériques)
function isValidPhoneNumber(phone) {
  return /^\d{8}$/.test(phone);
}

