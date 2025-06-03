import { createObservable } from "./createObservable";
import { add, destroy, get, update } from "./api";

export const createStore = (endpoint) => {
  const context = createObservable({
      endpoint,
      stale: true,
      _data: [],
      get data(){
        return this.getData();
      },
      async getData() {
        if (this.stale){
          let data = await get(this.endpoint);
          this._data = data;
          this.stale = false;
          return data;
        }
        else {
          return this._data;
        }
      },
      async add(data) {
        const response = await add(this.endpoint,data);
        this.stale = true;
        return response;
      },
      async remove(id){
        const response = await destroy(this.endpoint,id);
        this.stale = true;
        return response;
      },
      async update(data){
        const response = await update(this.endpoint,data);
        this.stale = true;
        return response;
      }
  })
  return context
}
