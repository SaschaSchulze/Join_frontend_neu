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

/** initialize the current user id
 * 
 * @returns the current user ID of the logged in user. If not logged in, currentUser is "Guest"
 */

function initUserID() {
    console.log('Users array in initUserID:', users);  // Überprüfen Sie das users-Array
    for (let i = 0; i < users.length; i++) {
        let user = users[i];
        console.log('Checking user:', user);
        if (user["isYou"]) {
            currentUser = user["userID"];
            isUserLoggedIn = true;
            console.log('Logged in as:', currentUser);  // Logging the current user ID
            console.log('isUserLoggedIn:', isUserLoggedIn); // Logging the isUserLoggedIn status
            return;
        }
    }

    // If no user is logged in, set the current user to 'Guest'
    currentUser = 'Guest';
    // isUserLoggedIn = false;  // Ensure isUserLoggedIn is explicitly set to false here
    console.log('Logged in as:', currentUser);  // Logging 'Guest' if no user is logged in
    console.log('isUserLoggedIn:', isUserLoggedIn); // Logging the isUserLoggedIn status
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
        console.log(users);
    } catch (e) {
        console.error('Loading Data error:', e);
    }
}