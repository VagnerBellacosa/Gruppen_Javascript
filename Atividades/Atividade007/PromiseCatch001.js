function getUser(userId) {
 const userData = fetch(`https://api.com/api/user/${userId}`)
   .then(response => response.json())
   .then(data => console.log(data.name))
   .catch(error => console.log(error))
   .finally(() => /*{ aviso de fim de carregamento }*/)
}

getUser(1); // "Nome Sobrenome"