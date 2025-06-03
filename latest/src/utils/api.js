export async function get(endpoint) {
  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    return data;
  } catch(error){
      console.log('error fetching resource', endpoint, error)
      return []
    }

}

export function add(endpoint, data){
  const response = fetch(endpoint,{
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return response;
}

export function destroy(endpoint, id){
  const response = fetch(`${endpoint}/${id}`,{
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json'},
  })
  return response;
}

export function update(endpoint, data){
  const response = fetch(`${endpoint}/${data.id}`,{
    method: 'PUT',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(data),
  })
  return response
}
export function edit(endpoint, data){
  const response = fetch(`${endpoint}/${data.id}`,{
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(data),
  })
  return response
}
