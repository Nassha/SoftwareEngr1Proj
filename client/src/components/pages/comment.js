import React, { useState, useEffect, useContext } from 'react';
import {UserContext} from '../UserContext';
import Axios from 'axios';
import Reg_username from './LoginForm';
import ReactSession from 'react-client-session/dist/ReactSession';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import usericon from '../images/usericon.png';
import { AvatarGenerator } from './generator_avatar.ts';
import { render } from '@testing-library/react';

const generator = new AvatarGenerator();

function useForceUpdate(){
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => value + 1); // update the state to force render
}

export default function Comment(){

  let history = useHistory();
  const {value,setValue} = useContext(UserContext);
    const [comment,setcomment]=useState("");
    const [username,setusername]=useState(ReactSession.get('email'));
    const [commentID,setcommentID]=useState(0);
    const [userid,setuserid]=useState("");
    const [newComment,setnewComment]=useState("");
    const [dis, setDis] = useState(true);
    const [open, setOpen] = useState(false);
    const [clickedID, setClickedID] = useState(0);
    const [cardIndex, setCardIndex] = useState(null);
    const [tempCommentID, setTempCommentID] = useState(0);
    const [commentCount, setCommentCount] = useState(0);
    const [deleteCount, setDeleteCount] = useState(0);
    const [editCount, setEditCount] = useState(0);
    const [commentList,setcommentList]=useState([]);
    const [replies, setReplyList] = useState([]);
    const [backupCommentList, setBackupCommentList] =useState([])
    const [replyValue, setReplyValue] = useState("")
    const [highestReplyID, setHighestReplyID] = useState(9900)
    const [highestCommentID, setHighestCommentID] = useState(1)
    const [replyCardIndex, setReplyCardIndex] = useState(null);
    const [commentReplyIndex, setCommentReplyIndex] = useState(null)
    const [editReplyValue, setEditReplyValue] = useState("")
    // const [backupReplyList, setBackUpReplyList] = useState([])



    
    //get comment and replies
    useEffect(() => {
      Axios.post('http://localhost:3001/api/reply_get').then((response)=>{
        setReplyList(response.data);

    });
        Axios.get('http://localhost:3001/api/comment/get').then((response)=>{
        setcommentList(response.data);
    });
    } , [])

    //append replies to comment
    useEffect(() => {
      // console.log(replies)
  } , [commentList])

    useEffect(() => {
     if (commentList.length){
        setBackupCommentList([...commentList])
     }
  } , [commentList])


  function submitReply(replyMessage, comm_ID){
    {
      let new_reply = [];
      var today = new Date();
      var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      var time = (today.getHours()) + ":" + today.getMinutes() + ":" + today.getSeconds();
      var timeSQL = (today.getHours()-8) + ":" + today.getMinutes() + ":" + today.getSeconds();
      var dateTime = date+' '+time;
      var dateTimeSQL = date+' '+timeSQL;
        Axios.post("http://localhost:3001/api/reply_insert", {
            Reg_email:ReactSession.get("email"),
            Reply_content:replyMessage,
            Reply_written: dateTimeSQL,
            Comment_ID:comm_ID
        })



      setReplyList([...replies,{"reply_id":highestReplyID,"reply_written":dateTime,"comment_id":comm_ID,
      "useravatar_url":ReactSession.get("avatar_display"),"useremail_reg":ReactSession.get("email"),
    "reply_content":replyMessage,"username_reg":ReactSession.get("username")}])
      setHighestReplyID(highestReplyID+1)
      };
      setShow(false)
      setReplyValue("")

  }
    
    
    
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 1000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})
const forceUpdate = useForceUpdate();

//submit comment
    const submitComment = () => {
      console.log(commentID)
      var today = new Date();
      var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      var time = (today.getHours()) + ":" + today.getMinutes() + ":" + today.getSeconds();
      var timeSQL = (today.getHours()-8) + ":" + today.getMinutes() + ":" + today.getSeconds();
      var dateTime = date+' '+time;
      var dateTimeSQL = date+' '+timeSQL;
      var dateTime = date+' '+time;
        Axios.post("http://localhost:3001/api/comment/insert", {
            useremail_reg:username,
            comment_text:comment,
            date_written: dateTimeSQL,
        })
        
        Axios.get('http://localhost:3001/api/comment/comment_id/get').then((response)=>{
        // console.log(response.data[0].comment_id)

        if(commentID == null){// setting it to 0 will cause bug for shifting replies to new comment
        setcommentList([...commentList,
          {comment_id:highestCommentID,"useremail_reg":ReactSession.get("email"), "comment_text":comment, "date_written":dateTime, "useravatar_url":ReactSession.get('avatar_display')}])
        setHighestCommentID(highestCommentID+1)
        }
        else
        setcommentList([
          ...commentList,
          {comment_id:((response.data)[0].comment_id+1),useremail_reg:username, comment_text:comment, date_written:dateTime, useravatar_url:ReactSession.get('avatar_display')},
        ]);

      }) 
      setCommentCount(commentCount + 1)
      setShow(false)
      setReplyValue(" ")
      };

      
    

    function submit(){
      Swal.fire({
        title: 'Are you sure you?',
        text: "Submit?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'No',
        cancelButtonText:'Yes'
      }).then((result) => {
        if (!result.isConfirmed) {
          submitComment();
          setcomment("");
        
        }
      })
    }

    function Login(){
        history.push("/login-form");
        
    }


    function convertDate(date){
      var seconds = Math.floor((new Date() - date) / 1000);

      var interval = seconds / 31536000;
    
      if (interval > 1) {
        return Math.floor(interval) + " years ago";
      }
      interval = seconds / 2592000;
      if (interval > 1) {
        return Math.floor(interval) + " months ago";
      }
      interval = seconds / 86400;
      if (interval > 1) {
        return Math.floor(interval) + " days ago";
      }
      interval = seconds / 3600;
      if (interval > 1) {
        return Math.floor(interval) + " hours ago";
      }
      interval = seconds / 60;
      if (interval > 1) {
        return Math.floor(interval) + " minutes ago";
      }
      return Math.floor(seconds) + " seconds ago";
    }


    function deleteReply(id){
      Swal.fire({
        title: 'Are you sure you?',
        text: "Submit?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'No',
        cancelButtonText:'Yes'
      }).then((result) => {
        if (!result.isConfirmed) {

            const updatedReplies = replies.filter(val => val.reply_id != id);
            //setDeleteCount(deleteCount + 1);
            setReplyList([...updatedReplies]);
         Axios.delete(`http://localhost:3001/api/user_reply/delete/${id}`)

        }

      })
    }


    const deleteComment=(id)=>{

     
      Swal.fire({
        title: 'Are you sure you?',
        text: "Submit?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'No',
        cancelButtonText:'Yes'
      }).then((result) => {
        if (!result.isConfirmed) {
          Axios.delete(`http://localhost:3001/api/comment/delete/${id}`)
            const updatedBackendComments = commentList.filter(val => val.comment_id != id);
            //setDeleteCount(deleteCount + 1);
            setcommentList([...updatedBackendComments]);
         Axios.delete(`http://localhost:3001/api/reply/delete/${id}`)

        }

      })
      
      
  
    }

    const updateComment=(comment_id)=>{
      Swal.fire({
        title: 'Are you sure you?',
        text: "Submit?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'No',
        cancelButtonText:'Yes'
      }).then((result) => {
        if (!result.isConfirmed) {
          Axios.put('http://localhost:3001/api/comment/update',{
            comment_text: newComment,
            comment_id: comment_id,

          } )
          //setEditCount(editCount + 1);
          const updatedcomm=setcommentList(commentList.map((val) => {   //maps comment for updating
            return val.comment_id == comment_id?{comment_id:val.comment_id,useravatar_url:val.useravatar_url,useremail_reg:val.useremail_reg,comment_text:newComment,date_written:val.date_written}:val
          }))
       
            
        setDis(!dis);
        
        
       
          

        }
      })
     
    }

    const [show, setShow] = useState(false);
    const [editReplyShow, setEditReplyShow] = useState(false);


      
    
    const editing=(val)=>{
      setTempCommentID(val.comment_id)
      setDis(!dis);
      } 
    

      function handleCardIndex(index){
        setCardIndex(index)
        if (show)
           setShow(false)
        else
           setShow(true)
      }

      
      function handleReplyCardIndex(index, commID){
        setCommentReplyIndex(commID)
        setReplyCardIndex(index)
          if(editReplyShow)
          setEditReplyShow(false)
          else
          setEditReplyShow(true)
      }

      function editReply(replyID){
        
        Swal.fire({
          title: 'Are you sure you?',
          text: "Submit?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'No',
          cancelButtonText:'Yes'
        }).then((result) => {
          if (!result.isConfirmed) {
            Axios.put('http://localhost:3001/api/reply/update',{
              Reply_value: editReplyValue,
              Reply_id: replyID,
  
            } )
            //setEditCount(editCount + 1);
            const updateReply = setReplyList(replies.map((val) => {   //maps replies for updating
              return val.reply_id == replyID?{reply_id:val.reply_id,reply_written:val.reply_written,comment_id:val.comment_id
                ,useravatar_url:val.useravatar_url,useremail_reg:val.useremail_reg,reply_content:editReplyValue,username_reg:val.username_reg}:val
            }))


         
            setEditReplyShow(false)

          }
        })
      }




     return(
        
        <div className="box1">
            <h1 style={{textAlign:"center"}}>DISCUSSION BOARD</h1>
            <br></br>
            <div className="commentform">

      {(() => {
        if (ReactSession.get("username") && commentCount == 2){
          return (
            <div className="commentform">
                <label >Name:{ReactSession.get("username")}</label>
                
            <label>Adding comments is restricted to 2 at a time</label>
            </div>
          )
        }
        else if (ReactSession.get("username")) {
          return (
            <div className="commentform">
              <center><h2>{ReactSession.get("username")}</h2>
              <img className='usericon' width={'70px'} height={'90px'}src={ReactSession.get("avatar_display")}></img>
              </center>
                
                
            {/* <label>COMMENT: </label> */}
            <input type="text" name="comment" value={comment} placeholder="Type a response" onChange={(e)=>{setcomment(e.target.value)}}/>
            <button onClick={submit}  >Submit</button>
            </div>
          )
        } else {
          return (
            <div className="commentform">
              <label>Login to join the discussion!</label>
              <button onClick={Login} >Login</button>
              </div>
          )
        }
      })()}
                
            </div>
            <div className="cardholder">
        {(() => { 
          if (!commentList.length){
            console.log('comment list was emptied')
            // console.log(backupCommentList)
            setcommentList([...backupCommentList])
          }
        })}
            {
            commentList
            .map((val)=>{
               return (
                <div className="card">
                  {(() => {
        if (String(val.username_reg)=="undefined") {
          return (
            <div>
              <img className='usericon' width={'45px'} height={'50px'}src={val.useravatar_url}></img>
              <h2 className='user' value={userid}>{ReactSession.get('username')}</h2><span> • {convertDate(new Date(val.date_written))}</span>
              </div>
          )
        } 
        
        else {
          return (
            <div>
              
              <img className='usericon' width={'45px'} height={'50px'}src={val.useravatar_url}></img>
              <h2 className='user' value={userid}>{val.username_reg}</h2><span> • {convertDate(new Date(val.date_written))}</span>

            </div>
          )
        }
      })()}
            <p className="commentmsg">{val.comment_text} </p> 

<br></br>
{(() =>{
  if (value != "Login/Register"){
    return(
      <div>
        
      </div>
    )
  }
})}

            {/* {ReactSession.get("email") ? <div><button className='replybtn' onClick={() => handleCardIndex(val.comment_id)}>Reply</button>
              <div className={val.comment_id == cardIndex && show ? 'reply_shown' : 'reply_hidden'}>
  <input value={replyValue} placeholder="Input Reply" onChange={(e) => {setReplyValue(e.target.value)}} type="text"></input> <button onClick={() => submitReply(replyValue, val.comment_id)} className='replybtn'>Confirm</button>
</div></div> : ""} */}

                    



            {(() => {
        if (val.useremail_reg == ReactSession.get("email") && deleteCount==2 && editCount==2){
          return (
            <div>
            
            <button id='editBtn' className='commentbtn' onClick={()=>{editing(val)}}>Edit</button>
            <button id='deleteBtn' className='commentbtn' onClick={()=>{deleteComment(val.comment_id)}}>Delete</button>
            
              </div>
          )
        }
        
        else if (val.useremail_reg == ReactSession.get("email")) {
          return (
            <div>    
           
            <button id='editBtn' className='commentbtn' onClick={()=>{editing(val)}}>Edit</button>
            <button id='deleteBtn' className='commentbtn' onClick={()=>{deleteComment(val.comment_id)}}>Delete</button>
            <button className='replybtn' onClick={() => handleCardIndex(val.comment_id)}>Reply</button>
            <div className={val.comment_id == cardIndex && show ? 'reply_shown' : 'reply_hidden'}>
            <input value={replyValue} placeholder="Input Reply" onChange={(e) => {setReplyValue(e.target.value)}} type="text"></input> <button onClick={() => submitReply(replyValue, val.comment_id)} className='replybtn'>Confirm</button>
            </div>
            
              </div>
          )
        } 
        else if (ReactSession.get("username")){
          return(
            <div>
               <button className='replybtn' onClick={() => handleCardIndex(val.comment_id)}>Reply</button>
            <div className={val.comment_id == cardIndex && show ? 'reply_shown' : 'reply_hidden'}>
            <input value={replyValue} placeholder="Input Reply" onChange={(e) => {setReplyValue(e.target.value)}} type="text"></input> <button onClick={() => submitReply(replyValue, val.comment_id)} className='replybtn'>Confirm</button>
            </div>
            </div>
          )
        }
             
      })()}
      
      {(() => {
              if (tempCommentID == val.comment_id && dis==false && val.useremail_reg == ReactSession.get("email") ){
                return(
                  <div>
                    <input type='text' id='editText'  className='updateinput' onChange={(e)=>{setnewComment(e.target.value)}}/>
                    <div>Edit Mode: Enabled<button id='submitEditBtn' className='commentbtn' onClick={()=>{updateComment(val.comment_id)}}>Confirm</button></div>

                  </div>
                )
              }
            })()}


{/* Replies */}
<div className="replyholder">
        {replies.map((item) => (
          <>
            {item.comment_id == val.comment_id ? <div>{convertDate(item.reply_written) == "Invalid Date" ? "" :    
            <div>
             <img src={item.useravatar_url} width="20px" height="20px"></img><label className="replyuser">{item.username_reg}</label><span> • {convertDate(new Date(item.reply_written))}</span>
            <br></br>
            
            <span className="replymsg">{item.reply_content}</span>
            </div>}

            {item.useremail_reg == ReactSession.get("email") ?
             <div>
            <button className='replybtn' onClick={() => handleReplyCardIndex(item.reply_id)}>Edit</button>
             <button className='replybtn' onClick={()=>{deleteReply(item.reply_id)}}>Delete</button>

             <div className={item.reply_id == replyCardIndex && editReplyShow ? 'reply_shown' : 'reply_hidden'}>
            <input value={editReplyValue} placeholder="Edit Reply" onChange={(e) => {setEditReplyValue(e.target.value)}} type="text"></input> <button onClick={() => editReply(item.reply_id)} className='replybtn'>Confirm</button>
            </div>
             
             </div> : ""}

            
          </div>:"" }
          
          </>
        ))}</div>
              </div>

               
               )

          
            })}
            
            </div>
        </div>
          
     )
     
  
}




