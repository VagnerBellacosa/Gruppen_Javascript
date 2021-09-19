async function getUser(userId) {
 let response = await fetch(`https://api.com/api/user/${userId}`);
 let userData = await response.json();
 return userData;
}

let [user1, user2] = await Promise.all([getUser(1), getUser(2)])
