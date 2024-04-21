


document.addEventListener("DOMContentLoaded", function () {
  // Sélectionner le bouton de suppression
  var deleteButton = document.querySelector(".btnDelete");

  // Ajouter un gestionnaire d'événements au bouton de suppression
  deleteButton.addEventListener("click", function () {
    // Supprimer les données du local storage
    localStorage.removeItem("contacts");

    // Sélectionner tous les éléments de la liste des contacts
    var contactList = document.querySelectorAll(".Contact");

    // Supprimer chaque élément de la liste
    contactList.forEach(function (contact) {
      contact.remove();
    });

    // Vérifier si la liste est vide
    if (document.querySelectorAll(".Contact").length === 0) {
      // Afficher le message "Aucun contact enregistré"
      var noContactsMessage = document.querySelector(".noContactsMessage");

      // Afficher l'élément
      noContactsMessage.style.display = "block";
    }
  });

  // Vérifier si la liste est vide
  if (document.querySelectorAll(".Contact").length === 0) {
    // Aucun contact enregistré
    var noContactsMessage = document.querySelector(".noContactsMessage");
    noContactsMessage.style.display = "block";
  }
});