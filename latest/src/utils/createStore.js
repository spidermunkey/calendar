import { createObservable } from "./createObservable";
export const createStore = (store) => {
  return createObservable({
      store:store,
      get data() {
        return this.getData();
      },
      async add(...args){
        const response = await this.store.add(...args);
        return response;
      },
      async remove(...args){
        const response = await this.store.remove(...args);
        return response;
      },
      async getData() {
        return this.store.getData();
      },
  })
}
