import { useState } from "react";
import './task.css';
import React,{useEffect} from 'react';

function TaskApp() {
  const getLocalItem = () =>{
    let list = localStorage.getItem("lists");
    if(list){
      return JSON.parse(list);
    }
    else{
      return [];
    }
  }
  const [newItem,setNewItem]=useState();
  const [items,setItems]=useState(getLocalItem);
  const [showEdit,setShowEdit]=useState(-1);
  const [updatedText,setUpdatedText]=useState();



  useEffect(()=>{
    localStorage.setItem("lists", JSON.stringify(items));
  }, [items]);
console.log(newItem);

  function addItems(){
    if(!newItem){
      alert ("Please add task ")
      }
    else {
      const item=items.concat(newItem)
      setItems(item);
      setNewItem("")
    }
  }


  //Delete Task 
  function Delete(idx){
    const  newArr=items.filter((item,id) => id!==idx)
    console.log(newArr)
    setItems(newArr);
    
  }

  function Updated(ids,newT){
    Delete(ids)
    setItems((oldList)=> [...oldList, newT]);
    setUpdatedText("")
    setShowEdit(-1);  
  }

  //Clear List Function
  function DeleteAll(){
  setItems([]);
  }
  return(
   <>
   <h1  align="center">TO-DO App</h1>
   <div  id="container" class="border border-primary w-50 p-3 mx-auto" align="center" >
    <input  class="form-control w-50 p-3 h-30 d-block" aria-label="readonly input example" readonly
    value={newItem}
    onChange={(e)=>setNewItem(e.target.value)}
    placeholder="Enter Your Task"
    /><br/>
    <button class="btn btn-primary btn-sm" type="submit" data-toggle="button" aria-pressed="false" autocomplete="off" onClick={()=> addItems()}>ADD Task</button>
    <br/><br/><br/>
   </div>
   <div id="List" class="border border-primary w-50 p-3 mx-auto" align="center">
    <h2>DISPLAY TASK </h2>
    <ul class="list-group list-group-numbered w-75 p-3 ">
      {items.map((todo,id)=>{
        return(<>
       <li  class="list-group-item mx-lg" key={id} >{todo+"           "}
       <button class="btn btn-primary btn-sm" type="submit" onClick={()=>Delete(id)}>Delete TASk </button> 
       <button class="btn btn-primary btn-sm" type="submit" onClick={()=>setShowEdit(id)}>Edit TASk </button>
       </li><br/>
       {showEdit===id?(
        <div className="editor">
          <input value={updatedText} onChange={(e)=>setUpdatedText(e.target.value)}/>
          <button class="btn btn-primary btn-sm" type="submit" onClick={()=>Updated(id,updatedText)}>Update</button>
        </div>
       ):null}
       </>)
      })}
    </ul>
   </div>
   <div id="Clearall" align="center">
   <button class="btn btn-primary" type="submit" onClick={()=>DeleteAll()}>Clear List</button>
   </div>
   </>
  );
}
export default TaskApp;