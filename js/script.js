// Click sur Add et apparission de formaulaire 

  var addButton = document.getElementById('btnAdd');
  var formulaire = document.querySelector('.Formulaire');
  var detailContact = document.querySelector('.detail_contact');
  addButton.onclick = function() {
      formulaire.style.display = 'block';
      detailContact.style.display = 'none'
  };




  function save_data(contact) {
    var contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    // Ajouter le nouveau contact à la liste des contacts
    contacts.push(contact);
    // Convertir la liste des contacts en chaîne JSON
    var jsonData = JSON.stringify(contacts);
    // Stocker la chaîne JSON mise à jour dans le localStorage
    localStorage.setItem("contacts", jsonData);
  }

  
  function add_Contacts() {
    // Récupérer les valeurs des champs du formulaire
    var civilite = document.getElementById("civilite").value;
    var prenom = document.getElementById("prenom").value;
    var nom = document.getElementById("nom").value;
    var telephone = document.getElementById("telephone").value;
  
    // Créer un objet JavaScript avec ces valeurs
    var contact = {
      civilite: civilite,
      prenom: prenom,
      nom: nom,
      telephone: telephone,
    };
  
    // Appeler la fonction save_data pour enregistrer le contact
    save_data(contact);
  
    // Réinitialiser le formulaire
    document.querySelector("form").reset();
  }
  



// Fonction pour récupérer les contacts depuis le localStorage
function getContacts() {
  const savedContactsJSON = localStorage.getItem('contacts');
  return savedContactsJSON ? JSON.parse(savedContactsJSON) : []; //Le rôle de JSON.parse() dans JavaScript est de convertir une chaîne JSON (JavaScript Object Notation) en objet JavaScript. Voici une explication détaillée :
}


// Fonction pour afficher les contacts dans la page
function showContacts() {
  const saveList = document.querySelector('.SaveList');
  const contactsContainer = saveList.querySelector('.contactsContainer');
  const noContactsMessage = saveList.querySelector('.noContactsMessage');
  
  // Efface le contenu existant des contacts
  //contactsContainer.innerHTML = '';

  // Récupère les contacts depuis le localStorage
  const contacts = getContacts();

  if (contacts.length === 0) {
      // Aucun contact enregistré
      noContactsMessage.style.display = 'block';
  } else {
      // Au moins un contact enregistré
      noContactsMessage.style.display = 'none';

      // Ajoute chaque contact dans le conteneur des contacts
      contacts.forEach(contact => {
          const contactElement = document.createElement('div');
          contactElement.classList.add('Contact');
          contactElement.innerHTML = `
              <h5><img src="../images/profile.svg" alt="Profil">${contact.nom} ${contact.prenom}</h5>
          `;
          contactsContainer.appendChild(contactElement);
      });
  }
}

// Appel de la fonction showContacts pour afficher les contacts au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
  showContacts();
});







// Fonction pour rechercher un contact dans la liste stockée dans le localStorage
function find_contact(nom, prenom) {
  const contactsList = JSON.parse(localStorage.getItem('contacts')) || [];
  return contactsList.find(contact => {
      return contact.nom === nom && contact.prenom === prenom;
  });
}

// Fonction pour afficher les détails du contact dans la div des détails du contact
function showDetailContact(civilite , nom, prenom, telephone ) {

  formulaire.style.display = 'none';
  detailContact.style.display = 'block'
  const detailContactInfo = document.querySelector('.detail_contact p');

  if (civilite && nom && prenom && telephone) {
      detailContactInfo.innerHTML = `${civilite} ${nom} ${prenom} <br>Tel: ${telephone}`;
  } 
}

// Fonction pour sélectionner un contact lors du clic
function selectContact(clickedContact) {
  // Désélectionner tous les contacts précédemment sélectionnés
  document.querySelectorAll('.Contact.selected').forEach(contact => {
      contact.classList.remove('selected');
  });

  // Sélectionner uniquement la div cliquée (si c'est une div de contact)
  if (clickedContact) {
      // Ajouter la classe 'selected' à la div cliquée
      clickedContact.classList.add('selected');

      // Récupérer le nom et prénom du contact à partir du texte affiché
      const contactText = clickedContact.querySelector('h5').textContent;
      const [nom, prenom] = contactText.trim().split(' ');

      // Rechercher le contact dans la liste stockée dans le localStorage
      const foundContact = find_contact(nom, prenom);

      // Afficher les détails du contact dans la div des détails du contact
      if (foundContact) {
          const { civilite,nom, prenom, telephone } = foundContact;
          showDetailContact(civilite,nom, prenom, telephone);
      } else {
          showDetailContact(); // Afficher le message "Contact non trouvé."
      }
  }
}




// Sélectionner le conteneur des contacts
const contactsContainer = document.querySelector('.contactsContainer');

// Ajouter un gestionnaire d'événements au conteneur des contacts
contactsContainer.addEventListener('click', event => {
  const clickedContact = event.target.closest('.Contact');
  selectContact(clickedContact);
});






















