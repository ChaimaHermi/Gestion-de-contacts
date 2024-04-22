function getContacts() {
  const savedContactsJSON = localStorage.getItem('contacts');
  return savedContactsJSON ? JSON.parse(savedContactsJSON) : [];
}

function showContacts() {
  const saveList = document.querySelector('.SaveList');
  const contactsContainer = saveList.querySelector('.contactsContainer');
  const noContactsMessage = saveList.querySelector('.noContactsMessage');
  
  const contacts = getContacts();

  if (contacts.length === 0) {
      noContactsMessage.style.display = 'block';
  } else {
      tri_contacts(contacts);

      noContactsMessage.style.display = 'none';

      contacts.forEach(contact => {
          const contactElement = document.createElement('div');
          contactElement.classList.add('Contact');
          contactElement.setAttribute('data-telephone', contact.telephone);
          contactElement.innerHTML = `
              <h5><img src="../images/profile.svg" alt="Profil">${contact.nom} ${contact.prenom}</h5>
          `;
          contactsContainer.appendChild(contactElement);
      });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  showContacts();
});

function tri_contacts(contacts) {
  contacts.sort((a, b) => {
    if (a.nom === b.nom) {
      return a.prenom.localeCompare(b.prenom);
    }
    return a.nom.localeCompare(b.nom);
  });
}