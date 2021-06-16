const getHeader = function(){
  const token = localStorage.getItem('token');
  const headers = {
      Accept:'application/json',
      Authorization: 'Bearer ' + token
  }

  return headers;
}

export default getHeader;