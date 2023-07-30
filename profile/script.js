function handleLogout() {
    // Clear local storage
    sessionStorage.clear();
    // Redirect to the signup page
    window.location.href = '../index.html';
  }
  
  // Function to check if the user is logged in (has an access token)
  function checkLogin() {
    const userObj = JSON.parse(sessionStorage.getItem('signInUser'));
     const accessToken = userObj.accessToken;
    if (!accessToken) {
      // User is not logged in, redirect to signup page
      window.location.href = '../index.html';
    } else {
      // User is logged in, display profile info
      const username = userObj.userName;
      const email = userObj.email;
      const token = accessToken;
      const password = userObj.password;

      document.getElementById('username').innerText = username;
      document.getElementById('email').innerText = email;
      document.getElementById('token').innerText = token;
      document.getElementById('password').innerText = password;
   
    }
  }
  
  // Check if the user is logged in when the profile page loads
  checkLogin();
  