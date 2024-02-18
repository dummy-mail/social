import React,{useState} from 'react'
import '../assets/Game1.css'

const Game1 = () => {

    let [chr, setChr] = useState('O');
    let [obj, setObj] = useState({
        v1 : "",
        v2 : "",
        v3 : "",
        v4 : "",
        v5 : "",
        v6 : "",
        v7 : "",
        v8 : "",
        v9 : ""
    })

    let changeChr = () =>{
        if(chr === 'O'){
            setChr('X')
        }else{
            setChr('O')
        }
    }

    let changeState = (props) =>{
        setObj({...obj, [props] : chr})
        changeChr();
    }



  return (
    <>
        <div className="container my-5">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <table className='table'>
                        <tbody>
                            <tr>
                                <td onClick={changeState("v1")}>{obj.v1}</td>
                                <td onClick={changeState("v2")}>{obj.v2}</td>
                                <td onClick={changeState("v3")}>{obj.v3}</td>
                            </tr>
                            <tr>
                                <td onClick={changeState("v4")}>{obj.v4}</td>
                                <td onClick={changeState("v5")}>{obj.v5}</td>
                                <td onClick={changeState("v6")}>{obj.v6}</td>
                            </tr>
                            <tr>
                                <td onClick={changeState("v7")}>{obj.v7}</td>
                                <td onClick={changeState("v8")}>{obj.v8}</td>
                                <td onClick={changeState("v9")}>{obj.v9}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </>
  )
}

export default Game1