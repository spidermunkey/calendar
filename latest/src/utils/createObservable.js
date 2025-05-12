export const createObservable = (context) => {
  context.observables = {};
  context.observe = (prop,cb) => {
      if (!context.observables[prop]){
        context.observables[prop] = {
          value:context[prop],
          actions:[],
        }
        Object.defineProperty(context,prop,{
          get: () => context.observables[prop].value,
          set(value){
            if (value !== context.observables[prop].value){
              context.observables[prop].value = value;
              context.notify(prop,value);
            }
          }
        })
      }
      context.observables[prop].actions.push(cb);
      const unMount = () => {
        const i = context.observables[prop].actions.indexOf(cb);
        if (i >= 0) context.observables[prop].actions.splice(i, 1);
      };
      // Return unsubscribe function
      return unMount
  },
  context.notify = (prop,...args) => {
      if (context.observables[prop]){
        for (const cb of context.observables[prop].actions){
          cb(...args);
        }
      }
  }
  return context;
}
