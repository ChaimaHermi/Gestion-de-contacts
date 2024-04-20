// Click sur Add et apparission de formaulaire 

  var addButton = document.getElementById('btnAdd');
  var formulaire = document.querySelector('.Formulaire');
  addButton.onclick = function() {
      formulaire.style.display = 'block';
  };




  function save_data(contact) {
    // Récupérer les contacts existants depuis le localStorage
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
  