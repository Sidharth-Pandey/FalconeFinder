
const postData = async function (url, data = {}){
  let res = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    headers: {
      'Content-Type': 'application/json',
      'Accept':'application/json'
    },
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  })
  return await res.json(); // parses JSON response into native JavaScript objects
}

export default postData;
