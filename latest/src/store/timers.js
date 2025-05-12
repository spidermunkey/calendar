const _endpoint = 'api/timers';

export const timerStore = {
  stale: true,
  _data: [],

  get data(){
    console.log('retrieving timers')
    return this.getData();
  },
  async getData() {
    if (this.stale){
      let data = await getTimers();
      this._data = data;
      this.stale = false;
      return data;
    }
    else {
      return this._data;
    }
  },
  async add(date) {
    const response = await addTimer(date);
    this.stale = true;
    return response;
  },
  async remove(date){
    const {_id} = date;
    const response = await deleteTimer(_id);
    this.stale = true;
    return response;
  },
}

async function getTimers(enpoint = _endpoint) {
  try {
    const response = await fetch(enpoint);
    const data = await response.json();
    return data;
  } catch(error){
      console.log('error fetching timers',error)
      return []
    }

}
async function addTimer(data, endpoint = _endpoint){
  const response = fetch(endpoint,{
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return response;
}
async function deleteTimer(id, enpoint = _endpoint){
  const response = fetch(enpoint,{
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({id:id})
  })
  return response;
}
