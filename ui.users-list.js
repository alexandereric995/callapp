// edit by ALEXANDER ERIC@ERIC LAPIN

var usersList = getElement('.users-list');
var numbersOfUsers = getElement('.numbers-of-users');

numbersOfUsers.innerHTML = 1;

var usersContainer = getElement('.users-container');

usersList.onclick = function() {
    if (usersList.className.indexOf('selected') != -1) {
        usersList.className = usersList.className.replace( / selected/g , '');
        usersContainer.style.display = 'none';
    } else {
        usersList.className += ' selected';
        usersContainer.style.display = 'block';
    }
};
