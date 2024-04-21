var contactsContainer = document.querySelector('.contactsContainer');

contactsContainer.addEventListener('click', function(event) {
  var clickedContact = event.target.closest('.Contact');
  selectContact(clickedContact);
});

function selectContact(clickedContact) {
  document.querySelectorAll('.Contact.selected').forEach(function(contact) {
    contact.classList.remove('selected');
  });

  if (clickedContact) {
    clickedContact.classList.add('selected');

    var telephone = clickedContact.getAttribute('data-telephone');
    var foundContact = find_contact(telephone);

    if (foundContact) {
      var civilite = foundContact.civilite;
      var nom = foundContact.nom;
      var prenom = foundContact.prenom;
      var telephone = foundContact.telephone;
      showDetailContact(civilite, nom, prenom, telephone);
    } else {
      showDetailContact();
    }
  }
}

function find_contact(telephone) {
  var contactsList = JSON.parse(localStorage.getItem('contacts')) || [];
  return contactsList.find(function(contact) {
    return contact.telephone === telephone;
  });
}

function showDetailContact(civilite, nom, prenom, telephone) {
  var form = document.querySelector(".Formulaire");
  form.style.display = "none";

  var detailContactDiv = document.querySelector('.detail_contact');

  if (detailContactDiv) {
    var civilitePara = detailContactDiv.querySelector('.civilite');
    var nomPara = detailContactDiv.querySelector('.nom');
    var prenomPara = detailContactDiv.querySelector('.prenom');
    var telephonePara = detailContactDiv.querySelector('.telephone');

    if (civilitePara && nomPara && prenomPara && telephonePara) {
      civilitePara.textContent = civilite || '';
      nomPara.textContent = nom || '';
      prenomPara.textContent = prenom || '';
      telephonePara.textContent = telephone || '';
    }

    detailContactDiv.style.display = 'block';
  }
}
