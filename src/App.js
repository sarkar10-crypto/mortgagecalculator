import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [principle, setprinciple] = useState(0);
  const [Intrest, setIntrest] = useState(0);
  const [Years, setYears] = useState(0);
  const [Emi, setEmi] = useState(0);

  const changeHandle = (e) => {
    console.log(e.target.id, e.target.value);
    const id = e.target.id;
    const value = parseInt(e.target.value);
    if (id === "principle") {
      setprinciple(value);
    }
    else if (id === "Intrest") {
      setIntrest(value);
    }
    else{
      setYears(value);
    }
  }
  console.log(principle, Intrest, Years);

  const calculateEmi = () => {
    // FORMULA : p(r(1+r)^n/((1+r)^n)-1)) p-->principle, r---> Rate of Intrest, n-->Years
    let r = Intrest;
    // converting Intrest/year to Intrest/month-- 
    // ek condition laga raha hu jab bhi ye (principle, Intrest, Years) true honge tabhi neeche ka logic execute hoga
    if (principle && r && Years) {
      r = r / 12 / 100; 
    // (1+r)^n ---> Math.pow(1 + r, Years * 12);years ko month main convert kia (Years*12)
    const calcPow = Math.pow(1 + r, Years * 12);
    const amount = principle * ((r * calcPow) / (calcPow - 1));
    // ab amount ko store karne ke liye ek state variable banaenge. (Emi)
    setEmi(amount);
    }
    
  }

  useEffect(() => {
    // jsb bhi (principle,Intrest,Years) main changes hoga useEffect trigger hoga  usmain calculateEmi function hai jo calculation ka logic dega.
    calculateEmi();
  },[principle,Intrest,Years])
  
  return (
    <div className="App">
      <h1>Mortage Calculator</h1>
      <div className='inputs'>
        <p>Principle :</p>
        <input onChange={changeHandle} type="number" id="principle" name="principle" />
        <p>Intrest :</p>
        <input onChange={changeHandle} type="number" id="Intrest" name="Intrest" />
        <p>Years :</p>
        <input onChange={changeHandle} type="number" id="Years" name="Years" />
      </div>
      <div className='output'>
        <p>Your EMI is {Math.round(Emi)}</p>
      </div>
    </div>
  );
}

export default App;
