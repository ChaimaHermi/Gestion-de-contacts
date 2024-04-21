
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
        tri_contacts(contacts);

        // Au moins un contact enregistré
        noContactsMessage.style.display = 'none';

        // Ajoute chaque contact dans le conteneur des contacts
        contacts.forEach(contact => {
            const contactElement = document.createElement('div');
            contactElement.classList.add('Contact');

            // Ajoute un attribut data-telephone avec le numéro de téléphone
            contactElement.setAttribute('data-telephone', contact.telephone);

            contactElement.innerHTML = `
                <h5><img src="../images/profile.svg" alt="Profil">${contact.nom} ${contact.prenom} </h5>
            `;
            contactsContainer.appendChild(contactElement);
        });
    }
}

  // Appel de la fonction showContacts pour afficher les contacts au chargement de la page
  document.addEventListener('DOMContentLoaded', () => {
    showContacts();
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
  
  