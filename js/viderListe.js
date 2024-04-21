document.addEventListener("DOMContentLoaded", function () {
  var deleteButton = document.querySelector(".btnDelete");

  deleteButton.addEventListener("click", function () {
    localStorage.removeItem("contacts");

    var contactList = document.querySelectorAll(".Contact");

    contactList.forEach(function (contact) {
      contact.remove();
    });

    if (document.querySelectorAll(".Contact").length === 0) {
      var noContactsMessage = document.querySelector(".noContactsMessage");
      noContactsMessage.style.display = "block";
    }
  });

  if (document.querySelectorAll(".Contact").length === 0) {
    var noContactsMessage = document.querySelector(".noContactsMessage");
    noContactsMessage.style.display = "block";
  }
});
