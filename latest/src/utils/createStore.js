import { createObservable } from "./createObservable";
import { add, destroy, get } from "./api";

export const createStore = (endpoint) => {
  const context = createObservable({
      endpoint,
      stale: true,
      _data: [],
      get data(){
        console.log('retrieving events')
        return this.getData();
      },
      async getData() {
        if (this.stale){
          console.log('fetching',(this.endpoint));
          let data = await get(this.endpoint);
          console.log(this.endpoint,'data',data)
          this._data = data;
          this.stale = false;
          return data;
        }
        else {
          return this._data;
        }
      },
      async add(data) {
        const response = await add(data,this.endpoint);
        this.stale = true;
        return response;
      },
      async remove(id){
        const response = await destroy(id,this.endpoint);
        this.stale = true;
        return response;
      },
  })
  return context
}
