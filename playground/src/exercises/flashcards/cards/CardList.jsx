import { useEffect,useState } from "react";

import { useAppState } from "context";
const getCards = async () => {
  const cards = await fetch('local/flashcards');
  const data = await cards.json();
  return data;
}

const answer = (answer) => {
  return (         
  <div className="answer">
    <button className="btn-show">show answer</button>
    <div className="answer">{answer}</div>
  </div>)
}
export const CardList = ({hasChanged}) => {
  const [cards,setCards] = useState([])
  const state = useAppState();
  console.log(state)
  useEffect(() => {
      const getData = async() => {
        const data = await getCards();
        setCards(data)
     }
     getData();
  },[hasChanged])
  const toggle = (id) => {
    const element = document.querySelector(`[id="${id}"]`);
    const btnShow = element.querySelector('.btn-show');
    const answer = element.querySelector('.info');
    answer.classList.toggle('active')
    answer.classList.contains('active') ? btnShow.textContent = 'hide answer' : btnShow.textContent = 'show answer'
  }
  return (
    <> 
      <div className="card-list">
        {cards.map(card => {
          return (
          <div className="card" id={card.id}>
            <div className="word"  >{card.title}</div>
            <div className="info">
              <button className="btn-show" onClick={() => toggle(card.id)}>show answer</button>
              <div className="answer">{card.answer}</div>
            </div>
          </div>)
        })}

      </div>
    </>
  )
}
