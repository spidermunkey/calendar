export async function get(enpoint) {
  try {
    const response = await fetch(enpoint);
    const data = await response.json();
    return data;
  } catch(error){
      console.log('error fetching birthdays',error)
      return []
    }

}

export async function add(data, endpoint){
  const response = fetch(endpoint,{
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return response;
}
export async function destroy(id){
  const response = fetch(enpoint,{
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({id:id})
  })
  return response;
}
