/**
 * This file is responsible for managing the user data and the current user
 * @file userManager.js
 */

let currentUser;
let isUserLoggedIn = false;

/**
 * load user data and initialize user id
 */

async function initUser() {
    await loadData();
    initUserID();
}

/**
 * initialize the current user id
 * 
 * @returns the current user ID of the logged in user. If not logged in, currentUser is "Guest"
 */
function initUserID() {
    let currentUserId = localStorage.getItem('userId');
    console.log('Current User ID from localStorage:', currentUserId);

    let isUserFound = false;

    for (let i = 0; i < users.length; i++) {
        let user = users[i];
        // console.log('Checking user:', user);

        if (user["id"] == currentUserId) { // Vergleich als Zahl, da localStorage immer als String speichert
            currentUser = user;
            isUserLoggedIn = true;
            console.log('Logged in as:', currentUser);
            console.log('Logged in user found:', user);
            console.log('isUserLoggedIn:', isUserLoggedIn);
            isUserFound = true;
            break;
        }
    }

    if (!isUserFound) {
        // If no user is logged in, set the current user to 'Guest'
        currentUser = 'Guest';
        isUserLoggedIn = false;
        console.log('No user found. Logged in as:', currentUser);
        console.log('isUserLoggedIn:', isUserLoggedIn);
    }
}


/**
 * loads the users from our storage
 */
async function loadData() {
    try {
      let usersData = await getItem('users');
      if (typeof usersData === 'string') {
        users = JSON.parse(usersData);
      } else {
        users = usersData; // Falls usersData bereits ein Objekt ist
      }
    //   console.log(users);
    } catch (e) {
      console.error('Loading Data error:', e);
    }
  }