const signInBtn = document.getElementById('signinBtn');
const userName = document.getElementById('name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const signUpRedirect = document.getElementById('signUpRedirect');

function checkIfUserExist(email){
    let users = JSON.parse(localStorage.getItem('userList'));
    
    const obj = users.find(userObj=>{
        return userObj.email === email;
        
    })
    if(obj) return true;
    else return false;
}

function saveUser(fName,emailInput,passwordInput){
    const token = generateAccessToken();
    let userObj ={
        userName: fName, // firstName.value
        email: emailInput,
        accessToken: token,
        password: passwordInput,
    }
    let users = JSON.parse(localStorage.getItem('userList'));
    if(users === null){
        users = [];
    }
    users.push(userObj); 
    localStorage.setItem('userList',JSON.stringify(users)); 

    sessionStorage.setItem('signInUser',JSON.stringify(userObj));
    userName.value='';
    email.value='';
    password.value='';
    confirmPassword.value='';
    alert('sign up successful');
    // this is how we handle multiple pages
    // this will redirect to profile folder
    window.location.href='./profile';
}

signInBtn.addEventListener('click', (event) => {
    event.preventDefault();
    // if any of my field is empty
    if (userName.value.trim() === '' ||
        email.value.trim() === '' ||
        password.value.trim() === '' ||
        confirmPassword.value.trim() === '') {
        alert('all fields are mandatory');
    }
    else {
        if (password.value.trim() !== confirmPassword.value.trim()) {
            alert('password not matching');
            password.value = '';
            confirmPassword.value = '';
        } else {
            // if my user exist
            if (localStorage.getItem('userList')) {
                if (checkIfUserExist(email.value)) {
                    alert('email is linked with other account');
                } else {
                    saveUser(userName.value, email.value, password.value);
                }
            } else {
                saveUser(userName.value, email.value, password.value);
            }
        }
    }
})

function generateAccessToken() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < 16; i++) {
      token += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return token;
  }

    // signUpRedirect.addEventListener('click',()=>{
    //     location.href='./login';
    // })
