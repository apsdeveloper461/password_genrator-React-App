import { useState, useCallback ,useEffect, useRef} from 'react'
import './App.css'

function App() {
  const [length, setlength] = useState(8);
  const [number, allowedNumber] = useState(false);
  const [symbol, allowedSymbol] = useState(false);
  const [password,setPassword]=useState("")
  const passwordRef=useRef(null);
  const passwordGenrator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number)
      str += "0123456789";
    if (symbol)
      str +="!@#$%^&*()_+-=|}{[]\?><,./:';~`";
    for (let i = 0; i <= length; i++) {
      let char=Math.floor(Math.random()*str.length+1)
      console.log(char);
      pass+=str.charAt(char);
    }
    setPassword(pass)
    let char=Math.random()*str+1

}, [length, number, symbol])
useEffect(()=>{
  passwordGenrator();
},[length,number,symbol,passwordGenrator]);
const copyToClipboard=useCallback(()=>{
  passwordRef.current?.select();
   window.navigator.clipboard.writeText(password)
},[password])
  return (
    <>
      <div className="min-h-screen w-screen bg-gradient-to-r from-cyan-500 to-blue-500 flex flex-col items-center">
        <h1 className="text-center  p-12 text-2xl text-slate-900">Password Generator with ApS Developer</h1>
        <div className="container relative w-fit p-5 bg-white rounded-2xl  flex flex-col justify-center items-center py-2">
          <div className='flex  m-3'>
            <input type="text" id="inputPassword" value={password} ref={passwordRef} className="px-4 p-2 rounded-s-xl bg-slate-50 relative text-blue-950 w-10/12 focus:outline-none cursor-pointer" placeholder="password" readOnly />
            <button type="button" className=" bg-gray-950 text-white p-2  rounded-e-xl cursor-pointer hover:bg-gray-400 hover:text-black" onClick={copyToClipboard}>Copy</button>
          </div>
          <div className="parameterContainer flex justify-between text-slate-900 cursor-pointer">
            <input type="range" className="range relative w-1/4 cursor-pointer" name="" min="8" value={length} max="20" id="rangeLength" onChange={(e)=>{setlength(e.target.value)}}/><label htmlFor="rangeLength">Length:{length}</label>

            <input type="checkbox" defaultChecked={allowedNumber} id="forNumber" onChange={()=>{allowedNumber((prev)=>!prev)}} /><label htmlFor="forNumber">Number</label>

            <input type="checkbox" defaultChecked={allowedSymbol} id="forSymbol"onChange={()=>{allowedSymbol((prev)=>!prev)}} /><label htmlFor="forSymbol">Symbol</label>
          </div>
        </div>

      </div>

    </>
  )
}

export default App
