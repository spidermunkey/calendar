
export const birthdayModel = {
  endpoint: 'api/birthdays',
  stale: true,
  _data: [],
  get data(){
    console.log('retrieving birthdays')
    return this.getData();
  },
  async getData() {
    if (this.stale){
      let data = await this.GET();
      this._data = data;
      this.stale = false;
      return data;
    }
    else {
      return this._data;
    }
  },

  async isToday(){
    const data = await this.getData();
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const found = data.filter(bday => bday.month === month && bday.day === day);
    return found;
  },
  async isThisMonth() {
    const date = new Date();
    const thisMonth = await this.getByMonth(date.getMonth())
    return thisMonth
  },
  
  async getByDate({ month, day }){
    const data = await this.getData();
    const found = data.filter(bday => bday.month == month + 1 && bday.day == day);
    return found;
  },

  async getByMonth(monthIndex){
    const data = await this.getData();
    const isThisMonth = data.filter(bday => bday.month == monthIndex + 1);
    return isThisMonth;
  },


  async add(date) {
    console.log('adding date')
    const response = await this.POST(date);
    this.stale = true;
    console.log('returning')
    return response;
  },

  async remove(date){
    const {_id} = date;
    const response = await this.DELETE(_id);
    this.stale = true;
    return response;
  },

  async GET(enpoint = this.endpoint) {
    try {
      const response = await fetch(enpoint);
      console.log(response)
      const data = await response.json();

      return data;
    } catch(error){
        console.log('error fetching birthdays',error)
        return []
      }

  },
  async POST(data, endpoint = this.endpoint){
    console.log('logs')
    const response = fetch(endpoint,{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    console.log('its posted foo')
    return response;
  },
  async DELETE(id, enpoint = this.endpoint){
    console.log(id)
    const response = fetch(enpoint,{
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({id:id})
    })
    return response;
  }
}
