function nameValidate() {
    let name = document.getElementById("name").value;
    if (name == "") {
      document.getElementById("Name").innerHTML = "please enter name";
      return false
    } else {
      document.getElementById("Name").innerHTML = "";
      return true
    }
  }
  function emailValidate() {
    let emailId = document.getElementById("email").value;
    console.log("emailId" + emailId);
    if (/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(emailId) == false) {
      document.getElementById("Email").innerHTML = "Please enter valid email ";
      return false;
    } else {
      document.getElementById("Email").innerHTML = "";
      return true;
    }
  }
  function numberValidate() {
    let number = document.getElementById("number").value;
    if (/^[0-9]+$/.test(number) == false) {
      document.getElementById("Number").innerHTML = "please enter a valid number";
      return false
    }
    else if (number.length != 10) {
      document.getElementById("Number").innerHTML = "please enter 10 digits";
      return false
    } else {
      document.getElementById("Number").innerHTML = "";
      return true
    }
  }
  let password = document.getElementById("password").value;
  function passwordValidate() {
    password = document.getElementById("password").value;
    if (password.length < 8) {
      document.getElementById("Password").innerHTML = "please enter minimum 8 digits";
      return false
    } else {
      document.getElementById("Password").innerHTML = "";
      return true
    }
  }
  function passwordValidate2() {
    let password2 = document.getElementById("password2").value;
    console.log(password2)
    if (password2 != password || password2 == "") {
      document.getElementById("Password2").innerHTML = "Password not match";
      return false
    } else {
      document.getElementById("Password2").innerHTML = "";
      return true
    }
  }
  function validate() {
    if (nameValidate() && emailValidate() && numberValidate() && passwordValidate() && passwordValidate2()) {
      return true
    } else {
      return false
    }
  }
  function allChecking() {
    if (emailValidate() && passwordValidate()) {
      return true
    } else {
      return false
    }
  }