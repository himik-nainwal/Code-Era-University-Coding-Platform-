import React,{useState,useEffect} from 'react'
import "../styles/Leaderboard.css"
const Leaderboard = () => {
  const [sblog,setSblog]=useState([]);
  const logonkiId=[];
  useEffect(()=>{
    const fetchData = async () => {
      fetch("http://localhost:5000/usermeta").then((res)=>res.json())
      .then((res)=> setSblog(res.data));
    };
    fetchData();
  },[] );

// Lets do some sorting according to score Descending Order . 
function compare(a,b){
  if (a.score > b.score) { return -1; }
  if(a.score<b.score) { return 1 ;}
  return 0;
}

sblog.sort(compare);
console.log(sblog);
  return (
    <div className="board">
        <h1 className='leaderboard'>Leaderboard</h1>

    </div>
  )
}

export default Leaderboard