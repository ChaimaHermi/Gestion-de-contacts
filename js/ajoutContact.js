// Click sur Add et apparission de formaulaire 

var addButton = document.getElementById('btnAdd');
var formulaire = document.querySelector('.Formulaire');
var detailContact = document.querySelector('.detail_contact');
addButton.onclick = function() {
    formulaire.style.display = 'block';
    detailContact.style.display = 'none'
};

function add_Contacts() {
  // Récupérer les valeurs des champs du formulaire
  var civilite = document.getElementById("civilite").value;
  var prenom = document.getElementById("prenom").value;
  var nom = document.getElementById("nom").value;
  var telephone = document.getElementById("telephone").value;

  // Vérifier que tous les champs sont remplis
  if (civilite.trim() === '' || prenom.trim() === '' || nom.trim() === '' || telephone.trim() === '') {
    alert("Veuillez remplir tous les champs du formulaire.");
    return; // Arrêter l'exécution si un champ est vide
  }

  // Récupérer les contacts existants depuis le local storage
  var existingContacts = localStorage.getItem("contacts");
  var contacts = existingContacts ? JSON.parse(existingContacts) : [];

  // Vérifier si le numéro de téléphone existe déjà dans les contacts
  var isDuplicate = contacts.some(function(contact) {
    return contact.telephone === telephone;
  });

  if (isDuplicate) {
    // Afficher une alerte si le numéro de téléphone existe déjà
    alert("Ce numéro de téléphone existe déjà dans les contacts.");
  } else {
    // Créer un nouvel objet contact avec les valeurs du formulaire
    var contact = {
      civilite: civilite,
      prenom: prenom,
      nom: nom,
      telephone: telephone,
    };

    // Ajouter le nouveau contact à la liste des contacts
    contacts.push(contact);

    // Enregistrer la liste mise à jour dans le local storage
    localStorage.setItem("contacts", JSON.stringify(contacts));

    // Réinitialiser le formulaire
    document.querySelector("form").reset();

    // Afficher un message de confirmation (vous pouvez remplacer cela par une autre action)
    alert("Le contact a été ajouté avec succès.");
  }
}
