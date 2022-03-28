import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import ReactSession from 'react-client-session/dist/ReactSession';
import Swal from 'sweetalert2';
import {UserContext} from '../UserContext';
import {AvatarGenerator} from './generator_avatar.ts';
import { useLocation, useParams, searchParams } from "react-router-dom";
const generator = new AvatarGenerator();

//create your forceUpdate hook
function useForceUpdate(){
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => value + 1); // update the state to force render
}
function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}


function LoginForm() {
  let query = useQuery();
  
  const {value,setValue} = useContext(UserContext);
  //Getting the user infos from the DB
  useEffect(() =>{
    Axios.get('http://localhost:3001/api/get').then((response)=>{
      setuserNameList(response.data)
      if(query.get("code") && query.get("email")){
        confirmUserParams(response.data, query.get("code"), query.get("email"))
      }
    })
  },[]) //Calling it once
  const [staticList, setstaticList] = useState([])

  function validateEmail (emailAdress)
  {
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (emailAdress.match(regexEmail)) {
      return true; 
    } else {
      return false; 
    }
  }

  //Registration
  const [Reg_username, setReg_username] = useState('')
  const [Reg_password, setReg_password] = useState('')
  const [Confirm_password, setConf_password] = useState('')
  const [Reg_email, setReg_email] = useState('')
  const [usernameList, setuserNameList] = useState([])
  const [userSession, setUserSession] = useState("")
  const [avatar_url, set_avatar] = useState("");
  const [avatar_display, set_avatar_display] = useState("");
  const [confirmed, setConfirmed] = useState("false");
  const [code, setCode] = useState("")
  const [enableSubmitCode, setEnableSubmitCode] = useState(false);
  const [backUpUserList, setBackupUserList] = useState([])

  const dis = (param) => {
    setEnableSubmitCode(param);
  }
  const registerUser = () =>{
    if (document.getElementById('reg_user_input').value == '')
    Swal.fire({
      icon: 'info',
      title: 'Blank Input',
      text: 'Enter a username.',
    })
    else if (document.getElementById('reg_user_pass').value == '')
    Swal.fire({
      icon: 'info',
      title: 'Blank Input',
      text: 'Enter a password.',
    })
    else if (document.getElementById('reg_email').value == '')
    Swal.fire({
      icon: 'info',
      title: 'Blank Input',
      text: 'Enter an email.',
    })
    else{
    let emails = usernameList.map((val)=> val.useremail_reg)

    //Validation of email PK
    if(emails.includes(Reg_email)){
    Swal.fire({
      icon: 'error',
      title: 'Email already taken',
      text: 'Enter another email.',
    })
    document.getElementById('reg_email').value = ''
  }
    
    else{
      if(Reg_username.length < 3)
        Swal.fire({
          icon: 'info',
          title: 'Name is too short',
          text: 'Username must be greater than 3',
        })
      
      else if(Reg_password.length < 5)
          Swal.fire({
      icon: 'info',
      title: 'Password is too short',
      text: 'Password length must be greater than 5.',
    })
    else if(!validateEmail(Reg_email))
    Swal.fire({
      icon: 'error',
      title: 'Invalid Email',
      text: 'Enter a valid email',
    })
    else if(Reg_password!=Confirm_password){
      Swal.fire({
        icon: 'info',
        title: 'Password Unmatch',
        text: 'Please input matching password',
      })
    }
    else{
    //Call the api using Axios
    //Generate Random Code for E-Mail Confirmation
    let new_avatar = generator.generateRandomAvatar()
    // set_avatar(new_avatar)
    ReactSession.set("avatar_url", new_avatar)
    const min = 100000;
    const max = 1000000;
    const rand = String(Math.round(min + Math.random() * (max - min)));
    Axios.post('http://localhost:3001/api/insert', {
      Reg_username: Reg_username,
      Reg_email: Reg_email, 
      Reg_password: Reg_password,
      Reg_avatar_url: new_avatar,
      confirmed: confirmed,
      code: rand,
  });
  setuserNameList([
    ...usernameList,
    { useremail_reg: Reg_email,
      username_reg: Reg_username, 
      userpassword_reg: Reg_password,
      confirmed: confirmed,
      code: rand,
      },
  ])

  Axios.post('http://localhost:3001/api/fetch_user_infos',{
    Reg_email:Reg_email}).then((response)=>{setUserInfo(response.data)})

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  
  Toast.fire({
    icon: 'success',
    title: 'Registration Successful! \n\nPlease confirm \nyour E-mail and \nenter your \nconfirmation code'
  })
  //{setValue(Reg_username)}
  //ReactSession.set("username",Reg_username)
  //ReactSession.set("email", Reg_email)
  //ReactSession.set("password", Reg_password)
  //ReactSession.set("avatar_url",avatar_url)

  document.getElementById('reg_user_input').value = ''
  document.getElementById('reg_user_pass').value = ''
  document.getElementById('reg_email').value = ''
  document.getElementById('confirm_user_pass').value =''

  //Sending Confirmation E-mail
  try{
    Axios.post('http://localhost:3001/api/sendemail', {
        code: rand,
        email: Reg_email,
    });
  }
  catch{
    console.log('Invalid E-mail')
  }
  dis(true);
  
}
    }
  };

}

    //Login
  const [log_Email, setLog_Email] = useState('')
  const [log_Password, setLog_Password] = useState('')


  function correctPass_Confirmed(username, email, password){ 
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
    
    Toast.fire({
      icon: 'success',
      title: 'Signed in successfully'
    })
    ReactSession.set("email", email);
    ReactSession.set("password", password);
    document.getElementById('log_email').value = ''
    document.getElementById('log_password').value = ''
    {setValue(username)}
    setLog_Password("")
    setLog_Email("")
    Axios.post('http://localhost:3001/api/avatar_get',{
      Reg_email:email}).then((response)=>{
        getUserAvatar(response.data[0]["useravatar_url"], username);
      }) 
  }
  function getUserAvatar(useravatar, uname){
    ReactSession.set('avatar_display', useravatar);
    ReactSession.set("username", uname);
    forceUpdate();
  }
  const login_User = ()=>{
    let isConfirmed = false;
    let success = false;


    Axios.post('http://localhost:3001/api/userpass/check', {
      Reg_email: log_Email, 
      Reg_password: log_Password
  }).then((response) => {
    console.log(response.data);
    if(response.data){
      if(response.data["correct_pass"] && response.data["confirmed"] == 'true'){
           correctPass_Confirmed(response.data["username_reg"], log_Email, log_Password)
           isConfirmed = true;
           success = true;
           console.log(response.data["correct_pass"])
           console.log(response.data["confirmed"])
         }
      else if(response.data["correct_pass"] && response.data["confirmed"] == 'false'){
          Swal.fire({
            icon: 'error',
            title: 'Email has not been confirmed'
          })
          document.getElementById('log_password').value = ''
          Axios.post('http://localhost:3001/api/fetch_user_infos',{
            Reg_email:log_Email}).then((response)=>{setUserInfo(response.data)})
          dis(true)
      }
      else{
          Swal.fire({
            icon: 'info',
            title: 'Invalid Email or Password',
            text: 'Please input a valid email or password',
          })
          document.getElementById('log_password').value = ''
      }
    }
    else{
      alert("Email does not exist")
    }
  });



  }

  const [userInfo, setUserInfo] = useState([]);
  function confirmUserParams(userlist, confirmcode, email){
    Swal.fire('Confirming E-mail Address...')
    let i;
    let userNamesConfirmCode = userlist.map((val) => [val.useremail_reg, val.code, val.confirmed, val.userpassword_reg, val.username_reg]);
    for (i=0;i<userNamesConfirmCode.length;i++){
      if(email == userNamesConfirmCode[i][0] && confirmcode == userNamesConfirmCode[i][1] && userNamesConfirmCode[i][2] == 'true'){
          Swal.fire({
            icon: 'success',
            title: 'Account already Confirmed! You can now Log-in.'
          })
          break
      }
      else if(email == userNamesConfirmCode[i][0] && confirmcode == userNamesConfirmCode[i][1] && userNamesConfirmCode[i][2] == 'false'){
        Axios.put('http://localhost:3001/api/confirm/update',{
          log_Email: email,
          confirm:'true',
        }).then(()=>{
          Swal.fire({
            icon: 'success',
            title: 'Account Confirmed! You can now Log-in.'
          })
        })
        break
      }
      else if((userNamesConfirmCode.length-1) == i){
        Swal.fire({
          icon: 'error',
          title: 'Invalid Parameters'
        })
      }
    }
}
  //Confirm User
  const confirm_User = () => {

    let i;
    let names = usernameList.map((val)=> [val.username_reg])
    let userNamesConfirmCode = usernameList.map((val) => [val.useremail_reg, val.code, val.confirmed]);
    for (i=0;i<userNamesConfirmCode.length;i++){
      if((log_Email.trim()) == userNamesConfirmCode[i][0] && (code.trim()) == userNamesConfirmCode[i][1] && userNamesConfirmCode[i][2] == 'false'){
        Axios.put('http://localhost:3001/api/confirm/update',{
          log_Email: log_Email,
          confirm:'true',
        }).then(()=>{
          Swal.fire({
            icon: 'success',
            title: 'Confirmed Code'
          })
          document.getElementById('log_confirm_code').value = ''
          dis(false);
          setuserNameList(usernameList.map((val) => { 
            return  val.useremail_reg == log_Email?{useremail_reg:val.useremail_reg, username_reg:val.username_reg, userpassword_reg:val.userpassword_reg, useravatar_url:val.useravatar_url, confirmed:'true', code:val.code}:val
          }))

          correctPass_Confirmed(Reg_username, log_Email, Reg_password)
        })
      }
      else if ((log_Email.trim()) == userNamesConfirmCode[i][0] && (code.trim()) != userNamesConfirmCode[i][1] && userNamesConfirmCode[i][2] == 'false'){
        document.getElementById('log_confirm_code').value = ''
        Swal.fire({
          icon: 'error',
          title: 'Incorrect Code'
        })
        dis(true);
        // console.log('Confirm Code documentID: ',(document.getElementById('log_confirm_code').value),'Confirm Code state: ',code,'Log Email: ',log_Email)
      }
      else if (((log_Email.trim()) != userNamesConfirmCode[i][0] && (code.trim()) == userNamesConfirmCode[i][1] && userNamesConfirmCode[i][2] == 'false')){
        document.getElementById('log_confirm_code').value = ''
        Swal.fire({
          icon: 'error',
          title: 'Incorrect Email'
        })
        dis(true);
        // console.log('Confirm Code documentID: ',(document.getElementById('log_confirm_code').value),'Confirm Code state: ',code,'Log Email: ',log_Email)
      }
    }

  // console.log(userInfo)
  // console.log(JSON.stringify(userInfo).length == 0)
  // if(JSON.stringify(userInfo).length != 0){
  //   console.log(userInfo[0].code)
  //   console.log(userInfo[0].useremail_reg)
  //   console.log(userInfo[0].confirmed)
  //   if((code.trim()) == userInfo[0].code){
  //     Axios.put('http://localhost:3001/api/confirm/update',{
  //       log_Email: log_Email,
  //       confirm:'true',
  //     }).then(()=>{
  //       Swal.fire({
  //         icon: 'success',
  //         title: 'Confirmed Code'
  //       })
  //       document.getElementById('log_confirm_code').value = ''
  //       dis(false);
  //       setuserNameList(usernameList.map((val) => { 
  //         return  val.useremail_reg == log_Email?{useremail_reg:val.useremail_reg, username_reg:val.username_reg, userpassword_reg:val.userpassword_reg, useravatar_url:val.useravatar_url, confirmed:'true', code:val.code}:val
  //       }))
  //       correctPass_Confirmed(userInfo[0].username_reg, userInfo[0].useremail_reg, Reg_password)
  //     })
  //   }

  //   else if((code.trim()) != userInfo[0].code){
  //     document.getElementById('log_confirm_code').value = ''
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Incorrect Code'
  //     })
  //     dis(true);
  //   }
  // }
  // else{
  //   document.getElementById('log_confirm_code').value = ''
  //   Swal.fire({
  //     icon: 'error',
  //     title: 'Incorrect Email'
  //   })
  //   dis(true);
  // }


  }
  const forceUpdate = useForceUpdate();

   function logOut(){
    Swal.fire({
      icon: 'error',
      title: 'Logged out'
    })
    
  
    Swal.fire({
      title: 'Are you sure you?',
      text: "Logout?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'No',
      cancelButtonText:'Yes'
    }).then((result) => {
      if (!result.isConfirmed) {
        ReactSession.remove("username");
        ReactSession.remove("email");
        ReactSession.remove("password");
        ReactSession.remove("avatar_url");
        ReactSession.remove("avatar_display");
        {setValue('Login/Register')}
        dis(false);
        forceUpdate();
      }
    })
  }


  function changeAvatar()
  {
    let new_avatar = generator.generateRandomAvatar()
    set_avatar(new_avatar)
    ReactSession.set("avatar_display",new_avatar)
    Axios.put('http://localhost:3001/api/avatar/update',{
            Reg_email: ReactSession.get('email'),
          Reg_avatar_url: new_avatar} )
  
  }

  function changePassword(){
    (async () => {

      const { value: formValues } = await Swal.fire({
        title: 'Enter New Password',
        html:
          'New Password'+'<input type="password" id="swal-input1" class="swal2-input">' + ' <br></br> ' +'Re-Enter New Password' +
          '<input type="password" id="swal-input2" class="swal2-input">',
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
          return [
            document.getElementById('swal-input1').value,
            document.getElementById('swal-input2').value
          ]
        }
      })
      
      if(formValues)
        if (formValues[0] && formValues[1]) {
           let newPass = formValues[0]
           let re_EnterPass = formValues[1]
           if(newPass == re_EnterPass){
             if(newPass.length < 5 || re_EnterPass.length < 5)
                Swal.fire("Password's length must be at least be 5")
            else{
              ReactSession.set("password", newPass)
              Axios.put('http://localhost:3001/api/userpass/update',{
              Reg_email: ReactSession.get("email"),
              Reg_password: re_EnterPass
             } )
             forceUpdate();
            }
          }
          else
              Swal.fire("Passwords do not match")
        }
      else
        Swal.fire("Please enter a value for both fields")
      
      })()
  }

  function changeName(){

    (async () => {

      const { value: userName } = await Swal.fire({
        title: 'Enter New Username',
        input: 'text',
        inputLabel: 'Username',
        inputPlaceholder: 'Enter new username',
        inputAttributes: {
          maxlength: 20,
          autocapitalize: 'off',
          autocorrect: 'off'
        }
      })
      
      if (userName) {
        Axios.put('http://localhost:3001/api/username/update',{
              Reg_username: userName,
              Reg_email: ReactSession.get("email")
             } )
             {setValue(userName)}
             ReactSession.set("username", userName)
        forceUpdate();
      }
      else
        Swal.fire("Username cannot be blank")
      
      })()

  }


  function deleteAccount(){
    
    Swal.fire({
      title: 'Delete Account?',
      text: "This will delete every info including comments and replies from the account",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      cancelButtonText: 'No',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/api/username/delete/${ReactSession.get("email")}`);
          setBackupUserList(usernameList.filter(val => val.useremail_reg != ReactSession.get("email")));
          setuserNameList([...backUpUserList]);

       Axios.delete(`http://localhost:3001/api/user_comment/delete/${ReactSession.get("email")}`);
       Axios.delete(`http://localhost:3001/api/user_reply/delete/:${ReactSession.get("email")}`);
       ReactSession.remove("username");
       ReactSession.remove("email");
       ReactSession.remove("password");
       ReactSession.remove("avatar_url");
       ReactSession.remove("avatar_display");
       {setValue("Login/Register")}
       dis(false);
       forceUpdate();
            Swal.fire(
              'Deleted!',
              'Your account has been deleted.',
              'success'
            )

      }
    })
      }
    })

    
  }

  return (

<div className='Home'>
         {(() => {
        if (ReactSession.get('username')){
          return (
            <div className='box1'>
              <div className='login_form'>
                <center>
                <img className='usericon' width={'120px'} height={'120px'} src={ReactSession.get('avatar_display')}></img>
                  <h1>Username: {ReactSession.get('username')}</h1>
                     <h1>Email: {ReactSession.get('email')}</h1>
                     <h1>Password: {ReactSession.get('password')}</h1>

                     <button onClick={changeName}>Change Username</button>
                     <button onClick={changePassword}>Change Password</button>
                     <button onClick={changeAvatar}>Change Avatar</button>
                     <br></br>
                     <button onClick={logOut}>Logout</button>
                     <br></br>
                     <br></br>
                     <br></br>
                     <button onClick={deleteAccount}>Delete Account</button>
                </center>
              </div>
            </div>
          )
        }  else if (enableSubmitCode == true) {
          return (
              <div className='box1'>
                
                <div className='login_form'>
                  <h1 className='log_h1' style={{color:'yellow'}}>Confirm Code</h1>
                  <br></br>
                  <div className='logbox'>
                      <center>
                        {/* {document.getElementById("log_email").value = log_Email} */}
                        <input type="email" placeholder="Enter Email" value={log_Email} name="email" id="log_email" onChange={(e) => {
                          setLog_Email(e.target.value)
                        }} ></input>
                        </center>
                        <center>
           
                        <input type="text" placeholder="Enter Confirmation Code" name="confirm" id="log_confirm_code" onChange={(e) => {
                           setCode(e.target.value)
                        }} ></input>
                      </center>
                  
                  </div>
                      <center><button style={{width:'auto'}} onClick={confirm_User}>Submit Code</button></center>
                
               <br></br>
               </div>
               </div>
          )
        }
        else{
          return (
            <div className='box1'>
            <div className='login_form'>
            <h1 className='log_h1'>Login</h1>
            <br></br>
              
              <div className='logbox'>
                <center>

                  <input placeholder="Enter Email" type="email" name="email" id="log_email" onChange={(e) => {
                     setLog_Email(e.target.value)
                  }} ></input>
                </center>
              </div>
              <div>
                <center>

                  <input type="password" placeholder="Enter Password" name="password" id="log_password" onChange={(e) => {
                     setLog_Password(e.target.value)
                  }} ></input>
                </center>
              </div>
              <center><button onClick={login_User}>Login</button></center>
            </div>
   
            <div>
            <div className='login_form'>
            <h1 className='log_h1'>Register</h1>
            <br></br>
              <div>
                <center>

                  <input type="text" name="Reg_username" placeholder="Enter Username" id="reg_user_input" onChange={(e) => {
                     setReg_username(e.target.value)
                  }} ></input>
   <br></br>
                 
                  <input type="email" name="Reg_email" placeholder="Enter Email" id="reg_email" onChange={(e) => {
                     setReg_email(e.target.value)
                  }} ></input>
   <br></br>
                  <input type="password" placeholder="Enter Password" name="Reg_password" id="reg_user_pass" onChange={(e) => {
                     setReg_password(e.target.value)
                  }} ></input>

                  <br></br>
                  <input placeholder="Confirm Password" type="password" name="Confirm_password" id="confirm_user_pass" onChange={(e) => {
                     setConf_password(e.target.value)
                  }} ></input>
                </center>
              </div>
              <center><button onClick={registerUser}>Register</button></center>
            </div>
                 
                 {ReactSession.get("username")}
          </div>
          </div>

        )
        }
        
      })()}
          
        </div>
  )
}

export default LoginForm;
