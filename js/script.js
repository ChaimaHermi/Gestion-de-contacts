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
     tri_contacts (contacts) ;

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

function showDetailContact(civilite, nom, prenom, telephone) {
  // Sélection de l'élément contenant les détails du contact
  const detailContactDiv = document.querySelector('.detail_contact');

  if (detailContactDiv) {
    // Mettre à jour le contenu des paragraphes avec les nouvelles données
    const civilitePara = detailContactDiv.querySelector('.civilite');
    const nomPara = detailContactDiv.querySelector('.nom');
    const prenomPara = detailContactDiv.querySelector('.prenom');
    const telephonePara = detailContactDiv.querySelector('.telephone');

    if (civilitePara && nomPara && prenomPara && telephonePara) {
      // Mettre à jour le texte des paragraphes avec les nouvelles valeurs
      civilitePara.textContent = civilite || ''; // Mettre à jour uniquement si civilite est défini
      nomPara.textContent = nom || ''; // Mettre à jour uniquement si nom est défini
      prenomPara.textContent = prenom || ''; // Mettre à jour uniquement si prenom est défini
      telephonePara.textContent = telephone || ''; // Mettre à jour uniquement si telephone est défini
    }

    // Afficher la div contenant les détails du contact
    detailContactDiv.style.display = 'block';
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









//tri contact
function tri_contacts(contacts) {
  contacts.sort((a, b) => {
    if (a.nom === b.nom) {
      return a.prenom.localeCompare(b.prenom);
    }
    return a.nom.localeCompare(b.nom);
  });
}






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



document.addEventListener("DOMContentLoaded", function () {
  // Sélectionner le bouton "Editer ce contact"
  var editButton = document.querySelector(".edit-button");

  // Ajouter un écouteur d'événements pour le clic sur le bouton
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
    detailContact.style.display = 'none';
    form.style.display = "block";

    // Pré-remplir les champs du formulaire avec les valeurs récupérées
    var civiliteInput = document.querySelector("#civilite");
    var nomInput = document.querySelector("#nom");
    var prenomInput = document.querySelector("#prenom");
    var telephoneInput = document.querySelector("#telephone");

    civiliteInput.value = civilite;
    nomInput.value = nom;
    prenomInput.value = prenom;
    telephoneInput.value = telephone;

    // Ajouter un écouteur d'événements pour le soumission du formulaire
    form.addEventListener("submit", function (event) {
      event.preventDefault(); // Empêcher le comportement par défaut du formulaire

      // Récupérer les nouvelles valeurs saisies dans le formulaire
      var newCivilite = civiliteInput.value.trim();
      var newNom = nomInput.value.trim();
      var newPrenom = prenomInput.value.trim();
      var newTelephone = telephoneInput.value.trim();

      // Supprimer l'objet existant du localStorage s'il existe
      localStorage.removeItem("contact");


      // Créer un nouvel objet avec les nouvelles valeurs
      var newContact = {
        civilite: newCivilite,
        nom: newNom,
        prenom: newPrenom,
        telephone: newTelephone
      };

      // Ajouter le nouvel objet dans le localStorage
      localStorage.addItem("contact", JSON.stringify(newContact));

      // Afficher un message de confirmation
      alert("Les données ont été mises à jour dans le localStorage.");

      // Recharger la page pour afficher les nouvelles valeurs (facultatif)
      location.reload();
    });
  });

  // Charger les données du localStorage au chargement de la page
  var savedContact = localStorage.getItem("contact");

  if (savedContact) {
    var parsedContact = JSON.parse(savedContact);

    // Mettre à jour les valeurs affichées dans les spans avec les données du localStorage
    document.querySelector(".civilite").textContent = parsedContact.civilite;
    document.querySelector(".nom").textContent = parsedContact.nom;
    document.querySelector(".prenom").textContent = parsedContact.prenom;
    document.querySelector(".telephone").textContent = parsedContact.telephone;
  }
});
