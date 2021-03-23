import { Link } from "react-router-dom";
import {useState} from 'react';


function List (props){
    // variables to create pagination
    let len = props.content.length;
    const [start, setStart] = useState(0);
    const delim = 10;
    const [end, setEnd] = useState(len > delim ? delim : len);
    const pagination = len / delim;
    // create array of all the numbered buttons
    let ary = [];
    for(let i = 0; i < pagination; i++){
        ary.push(<button
            disabled={start===i*delim}
            onClick={()=>{
                    setStart(i*delim);
                    setEnd((i*delim)+delim);
                    // scroll back to the top when you click next button
                    document.body.scrollTop = 0; // For Safari
                    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
                }}
        >
            {i+1}
        </button>)
    }
    return(
        <>
            {props.content.slice(start, end>len ? len : end).map(item =>{
                return <div className="list">
                            <div className="list-header">
                                <h1>Issue: {item.number}</h1> 
                                <h3>Status: <span className={item.state === "open" ? "green" : "red"}>{item.state}</span></h3>
                            </div>
                            <p>{item.title}</p>
                            <Link className="link" key={item.id} to={`/issue/${item.number}`}>More Info</Link>
                        </div>
            })}
            <div className="list-btns">
                <button
                    disabled={start-delim<0}
                    onClick={()=>{
                            setStart(start-delim);
                            setEnd(end-delim);
                        }}
                >
                    Back
                </button>
                {ary}
                <button
                    disabled={start+delim>=len}
                    onClick={()=>{
                            setStart(start+delim);
                            setEnd(end+delim);

                            // scroll back to the top when you click next button
                            document.body.scrollTop = 0; // For Safari
                            document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
                        }}
                >
                    Next
                </button>
            </div>
            
            
        </>
    );
}

export default List;