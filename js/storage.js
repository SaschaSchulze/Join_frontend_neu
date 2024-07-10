/**
 * @file storage.js
 * This file is used to handle the storage of the application
 * 
 */

let STORAGE_URL_SET = 'http://127.0.0.1:8000/api/set-item/';
let STORAGE_URL_GET = 'http://127.0.0.1:8000/api/get-item/';

/**
 * Uploads data into the backend.
 * @param {string} key - data name (key)
 * @param {any} value - data value to upload
 * @returns {Promise} - promise resolving to JSON response
 */
async function setItem(key, value) {
    let token = localStorage.getItem('token');
    let payload = { key, value, token };
    return fetch(STORAGE_URL_SET, { 
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload) 
    })
    .then(res => res.json());
}

async function getItem(key) {
    let url = `${STORAGE_URL_GET}?key=${key}`;
    let token = localStorage.getItem('token');
    if (!token) {
        console.error('Token not found in local storage');
        return;
    }
    url += `&token=${token}`;
    try {
        let response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        let data = await response.json();
        return data.data.value;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}