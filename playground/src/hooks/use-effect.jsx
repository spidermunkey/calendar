import { useEffect, useState } from "react";
export const EffectExample = () => {
  // run function whenever state changes
  const [data, setData] = useState([]);
  const [showName,setShowName] = useState(false);

  useEffect(() => {
    // execute on state
    console.log('Page Rendered')
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(json => setData(json))
  }, [/* publishers */])

  useEffect(() => {
    console.log("Pedro")
  },[showName])

  return (
    <div>
      <button onClick={() => {setShowName(prev => !prev)}}>Toggle</button>
      <h1>Posts</h1>
      <ul>
        {data.map((item,index) => (
          <li key={index}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}
