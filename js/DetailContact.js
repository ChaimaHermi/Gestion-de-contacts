


// Sélectionner le conteneur des contacts
const contactsContainer = document.querySelector('.contactsContainer');

// Ajouter un gestionnaire d'événements au conteneur des contacts
contactsContainer.addEventListener('click', event => {
  const clickedContact = event.target.closest('.Contact');
  selectContact(clickedContact);

  
});



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

      // Récupérer le numéro de téléphone du contact à partir de l'attribut data-telephone
      const telephone = clickedContact.getAttribute('data-telephone');

      // Rechercher le contact dans la liste stockée dans le localStorage
      const foundContact = find_contact(telephone);

      // Afficher les détails du contact dans la div des détails du contact
      if (foundContact) {
          const { civilite, nom, prenom, telephone } = foundContact;
          showDetailContact(civilite, nom, prenom, telephone);
      } else {
          showDetailContact(); // Afficher le message "Contact non trouvé."
      }
  }
}

// Fonction pour rechercher un contact dans la liste stockée dans le localStorage
function find_contact(telephone) {
  const contactsList = JSON.parse(localStorage.getItem('contacts')) || [];
  return contactsList.find(contact => {
      return contact.telephone === telephone;
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