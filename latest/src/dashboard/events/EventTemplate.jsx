const date = new Date();

export const EventTemplate = (eventDate) => {
  const template = {
    title: '',
    description: '',
    frequencyType: 'once',
    frequency: 'once',
    type: 'general',
    
    dynamic_frequency: {
      days:Array(7).fill(false),
      weeks: Array(4).fill(false),
      months: Array(12).fill(false),
    },
    dated_frequency: [date],
    category: 'general',
    date: DateTime.getDate(date),
    time: DateTime.getTime(date),
    duration: '24',
    duration_type: 'hours',
    dom: DateTime.getDate(date).slice(-2),
    dow: date.getDay(),
  }
    const validProps = {}
    for (const prop in eventDate){
      if (template[prop] && typeof template[prop] === typeof eventDate[prop] ){
        validProps[prop] = eventDate[prop]
      }
    }
    const result = {
      ...template,
      ...validProps
    }
    return result
}
