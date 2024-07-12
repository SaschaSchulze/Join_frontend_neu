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
    if (!token) {
        console.error('Token not found in local storage');
        return;
    }
    let payload = { key, value };
    try {
        let response = await fetch(STORAGE_URL_SET, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}` // Token hier mit Authorization Header senden
            },
            body: JSON.stringify(payload)
        });
        if (!response.ok) {
            let errorText = await response.text();
            console.error('Failed to upload data:', errorText);
            throw new Error('Failed to upload data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error uploading data:', error);
    }
}

/**
 * Fetches data from the backend.
 * @param {string} key - data name (key)
 * @returns {Promise<any>} - promise resolving to the fetched data
 */
async function getItem(key) {
    let token = localStorage.getItem('token');
    if (!token) {
        console.error('Token not found in local storage');
        return;
    }
    let url = `${STORAGE_URL_GET}?key=${key}`;
    try {
        let response = await fetch(url, {
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json' // Optional, falls benötigt
            }
        });
        if (!response.ok) {
            let errorText = await response.text();
            console.error('Failed to fetch data:', errorText);
            throw new Error('Failed to fetch data');
        }
        let data = await response.json();
        return data.data.value;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
