import { createObservable } from "./createObservable";

export const createStore = (store) => {
  const context = createObservable({
      store:store,
      get data() {
        return this.store.getData();
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
  return context
}
