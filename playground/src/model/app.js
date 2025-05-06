import { birthdayModel } from './birthdays'
export const createAppModel = () => {
  return {
    name:'My first app',
    birthdays:birthdayModel,
  }
}
