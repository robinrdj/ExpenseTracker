import React, { useState, useEffect} from 'react';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';
import "./PieChartCard.css";
import { useData } from '../Context';

const PieChartCard = () => {
    const [activeIndex, setActiveIndex] = useState(-1);    
    const { data, setData } = useData();
    const [pieChartData, setPieChartData] = useState([
            { name: 'Food', price:33 },
            { name: 'Entertainment', price:33},
            { name: 'Travel', price:34 },
        ]);

    const updateData = () =>{
        let food = 0;
        let entertainment =0;
        let travel = 0;
        data.forEach((item)=>{
            if(item.category==="Food"){
                food+=parseInt(item.amount);
            }
            if(item.category==="Entertainment"){
                entertainment+=parseInt(item.amount);
            }
            if(item.category==="Travel"){
                travel+=parseInt(item.amount);
            }
        })
        const newData = [
            { name: 'Food', price:food },
            { name: 'Entertainment', price:entertainment},
            { name: 'Travel', price:travel },
        ];
        setPieChartData(newData);
        // console.log(pieChartData)
    }

    useEffect(()=>{
       updateData();
    },[data]);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    const onPieEnter = (_, index) => {
        setActiveIndex(index);
    };

    return (
        <PieChart width={299} height={299} className='pieChart'>
            <Pie
                activeIndex={activeIndex}
                data={pieChartData}
                dataKey="price"
                outerRadius={150}
                fill="green"
                onMouseEnter={onPieEnter}
                style={{ cursor: 'pointer', outline: 'none' }}
            >
                {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip />
        </PieChart>
    );
}

export default PieChartCard;