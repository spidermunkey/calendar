import { birthdayModel } from './birthdays'
export const createAppModel = () => {
  const date = new Date();
  return {
    name:'My first app',
    birthdays:birthdayModel,
    today: {
      month: date.getMonth(), 
      year: date.getFullYear(),
      day: date.getDate(),
  }
  
  }
}
