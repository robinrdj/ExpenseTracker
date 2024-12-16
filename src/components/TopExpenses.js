import React,{useState, useEffect} from "react";
import "./TopExpenses.css";
import { useData } from '../Context';

const TopExpenses = () => {
  const [lineData, setLineData] = useState([
    { name: 'Food', price:33 },
    { name: 'Entertainment', price:33},
    { name: 'Travel', price:34 },
]);

const { data, setData } = useData();
  const updateData=()=>{
    let food = 0;
    let entertainment =0;
    let travel = 0;
    let total = 0;

    data.forEach((item)=>{
        // console.log(item)
        if(item.category==="Food"){
            food+=parseInt(item.amount);
            total+=parseInt(item.amount);
        }
        if(item.category==="Entertainment"){
            entertainment+=parseInt(item.amount);
            total+=parseInt(item.amount);
        }
        if(item.category==="Travel"){
            travel+=parseInt(item.amount);
            total+=parseInt(item.amount);
        }
    })
    const newData = [
        { category: 'Food', percentage:(food/total)*100},
        { category: 'Entertainment', percentage:(entertainment/total)*100},
        { category: 'Travel', percentage:(travel/total)*100 },
    ];
    // console.log(data);
    setLineData(newData);
}

useEffect(()=>{
  updateData();
},[data]);

  return (
    <div className="top__expenses__container">
      <h2>Top Expenses</h2>
      {lineData.map((item, index) => (
        <div className="expense__row" key={index}>
          <span className="expense__category">{item.category}</span>
          <div className="expense__bar">
            <div
              className="expense__bar__fill"
              style={{ width: `${item.percentage}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopExpenses;
