const _endpoint = 'api/birthdays';

export const birthdayStore = {
  stale: true,
  _data: [],

  get data(){
    console.log('retrieving birthdays')
    return this.getData();
  },
  async getData() {
    if (this.stale){
      let data = await getBirthdays();
      this._data = data;
      this.stale = false;
      return data;
    }
    else {
      return this._data;
    }
  },
  async add(date) {
    const response = await addBirthday(date);
    this.stale = true;
    return response;
  },
  async remove(date){
    const {_id} = date;
    const response = await deleteBirthday(_id);
    this.stale = true;
    return response;
  },
}

async function getBirthdays(enpoint = _endpoint) {
  try {
    const response = await fetch(enpoint);
    const data = await response.json();
    return data;
  } catch(error){
      console.log('error fetching birthdays',error)
      return []
    }

}
async function addBirthday(data, endpoint = _endpoint){
  const response = fetch(endpoint,{
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return response;
}
async function deleteBirthday(id, enpoint = _endpoint){
  const response = fetch(enpoint,{
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({id:id})
  })
  return response;
}
