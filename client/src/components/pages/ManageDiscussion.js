import React, { useState, useEffect, useContext } from 'react';
import {UserContext} from '../UserContext';
import Axios from 'axios';
import ReactSession from 'react-client-session/dist/ReactSession';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AvatarGenerator } from './generator_avatar.ts';

const generator = new AvatarGenerator();

function useForceUpdate(){
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => value + 1); // update the state to force render
}

export default function ManageDiscussion(){

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


    
    //get comment and replies
    useEffect(() => {
      Axios.post('http://localhost:3001/api/reply_get').then((response)=>{
        setReplyList(response.data);

    });
        Axios.get('http://localhost:3001/api/comment/get').then((response)=>{
        setcommentList(response.data);
    });
    } , [])
    useEffect(() => {
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
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      var dateTime = date+' '+time;
        Axios.post("http://localhost:3001/api/reply_insert", {
            Reg_email:ReactSession.get("email"),
            Reply_content:replyMessage,
            Reply_written: dateTime,
            Comment_ID:comm_ID
        })



      setReplyList([...replies,{"reply_id":highestReplyID,"reply_written":dateTime,"comment_id":comm_ID,
      "useravatar_url":ReactSession.get("avatar_url"),"useremail_reg":ReactSession.get("email"),
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

//submit comment
    const submitComment = () => {
      console.log(commentID)
      var today = new Date();
      var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      var dateTime = date+' '+time;
        Axios.post("http://localhost:3001/api/comment/insert", {
            useremail_reg:username,
            comment_text:comment,
            date_written: dateTime,
        })
        
        Axios.get('http://localhost:3001/api/comment/comment_id/get').then((response)=>{
        // console.log(response.data[0].comment_id)

        if(commentID == null){// setting it to 0 will cause bug for shifting replies to new comment
        setcommentList([...commentList,
          {comment_id:highestCommentID,"useremail_reg":ReactSession.get("email"), "comment_text":comment, "date_written":dateTime, "useravatar_url":ReactSession.get('avatar_url')}])
        setHighestCommentID(highestCommentID+1)
        }
        else
        setcommentList([
          ...commentList,
          {comment_id:((response.data)[0].comment_id+1),useremail_reg:username, comment_text:comment, date_written:dateTime, useravatar_url:ReactSession.get('avatar_url')},
        ]);

      }) 
      setCommentCount(commentCount + 1)
      setShow(false)
      setReplyValue(" ")
      };

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

    const deleteComment=(id)=>{

     
      Swal.fire({
        title: 'Are you sure you want to delete this comment?',
        text: "",
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

    function deleteReply(id){
      Swal.fire({
        title: 'Are you sure you want to delete this reply?',
        text: "",
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

    const [show, setShow] = useState(false);
      if(localStorage.getItem("adminusername")){
     return(
        
        <div className="BackendPage">
            <h2 className="backend_title">Discussion Management</h2>
            <br></br>
            <div className="cardholder">
        {(() => { 
          if (!commentList.length){
            console.log('comment list was emptied')
            // console.log(backupCommentList)
            setcommentList([...backupCommentList])
          }
        })}
            {
            commentList.map((val)=>{
               return (
                <div className="backendcard">
                  {(() => {
          return (
            <div>
              
              <img className='usericon' width={'45px'} height={'50px'}src={val.useravatar_url}></img>
              <span className='backenduser' value={userid}>  {val.username_reg}</span><span> • {convertDate(new Date(val.date_written))}</span>

            </div>
          )
        }
      )()}
            <p className="commentmsg">{val.comment_text} </p> 
            <label className="datemsg"></label>
<br></br>
            {(() => {
          return (
            <div>    
            <button id='deleteBtn' className='deletebtn' onClick={()=>{deleteComment(val.comment_id)}}>Delete</button>
            <div className={val.comment_id == cardIndex && show ? 'reply_shown' : 'reply_hidden'}>
            <input value={replyValue} placeholder="Input Reply" onChange={(e) => {setReplyValue(e.target.value)}} type="text"></input> <button onClick={() => submitReply(replyValue, val.comment_id)} className='replybtn'>Confirm</button>
            </div>
            
              </div>
          )     
      })()}


{/* Replies */}
<div className="replyholder">
        {replies.map((item) => (
          <>
            {item.comment_id == val.comment_id ? <div>{convertDate(new Date(item.reply_written)) == "Invalid Date" ? "" :    
            <div>
             <img src={item.useravatar_url} width="20px" height="20px"></img><label className="backendreplyuser">{item.username_reg}</label><span> • {convertDate(new Date(item.reply_written))}</span>
            <br></br>
            
            <span className="replymsg">{item.reply_content}</span>
            <br></br>
            <button className='deletebtn' onClick={()=>{deleteReply(item.reply_id)}}>Delete</button>
            </div>}

            
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
    else window.location.href = "/admin"; 
}