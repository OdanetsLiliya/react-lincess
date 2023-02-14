import React, { useRef, useState } from 'react';
import './styles.scss'
import { MultiSelect } from "react-multi-select-component";
import DatePicker from "react-datepicker"

import "react-datepicker/dist/react-datepicker.css";

const options = [
  { label: "Grapes", value: "grapes" },
  { label: "Mango", value: "mango" },
  { label: "Strawberry", value: "strawberry" },
];


const SartTest = () => {
  const [selected, setSelected] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
    

  
      return (
        <div className="container">
         <MultiSelect
        options={options}
        value={selected}
        onChange={setSelected}
        labelledBy="Select"
        />
         <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
         hrefkopdw
        </div>
      );
  }

export default SartTest;