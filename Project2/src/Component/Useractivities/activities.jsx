import { useEffect, useState } from "react";

function activities (){
    const [loading,setloading]= useState([]);
    const [activities, setactivities]= useState([]);
useEffect(()=>{
    
    const fetchactivities=async()=>{
        try{
            const response=await fetch("jsonplaceholder.typicode.com/posts");
            const result=response.json();
            setactivities(result);
            setloading(true)
        }
        catch(error){
            console.error(error);
        }
        finally{
            setloading(false)
        }
  
    }
    fetchactivities();
},[]);
    return(
        <div>{loading?(
            <p>Loading...</p>
        ):(
            <div>
                
            </div>
        )}
             
        </div>
    )
}

export default activities;