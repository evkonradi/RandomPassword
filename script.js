// Assignment Code
var generateBtn = document.querySelector("#generate");

// Prompt for password Length function
var promptPwdLength = function(){
  var pwdLength = 0;
  var promptMessage = "How many characters password would you like (8-128 characters)?";

  while(true){
    pwdLength = parseInt(prompt(promptMessage),10);
    if (!isNaN(pwdLength))
      if (pwdLength >= 8 && pwdLength <= 128)
        break;

    promptMessage = "Please enter a valid number of characters you would like in the password (8-128 characters)!";
  }

  return pwdLength;
}

//Prompt for character types function
var charactersType = function(objCharType){

  var stringCharType;
  var promptMessage = "Please enter what characters you would like in the password: l(lowercase), u(uppercase), n(numeric), s(special characters)." +  "\r\n" + "Example: nul for numeric, upper and lower case. )";
  while(true){
    stringCharType = prompt(promptMessage);
    if (stringCharType){
      stringCharType = stringCharType.toLowerCase().split(" ").join(""); // delete all empty characters from the string
      userInputValid = true;
      for (i=0; i < stringCharType.length; i++)
        switch (stringCharType[i]){
          case 'l':
            objCharType.charLowerCase = true;
            break;
          case 'u':
            objCharType.charUpperCase = true;
            break;
          case 'n':
            objCharType.charNumeric = true;
            break;
          case 's':
              objCharType.charSpecial = true;
            break;
          default:
            userInputValid = false;
        }
      
      if (userInputValid && stringCharType.length > 0)
        break;
    }

    promptMessage = "Please enter a valid combination of characters you would like in the password: l(lowercase), u(uppercase), n(numeric), s(special characters)." +  "\r\n" + "Example: 'nul' for numeric, upper and lower case. )!";
    for(var propertyCharType in objCharType)
      propertyCharType = false;
  }
}

// randomly generate one character out of the specified list of characters and put it in a random place in the password string
var generateOneCharInPwd = function(strRandomPassword, strOfChars){
  while (true){
    var charToReplaceWith = strOfChars.charAt(Math.floor(Math.random() * strOfChars.length));
    var indexToReplaceAt = Math.floor(Math.random() * strRandomPassword.length);
    if (strRandomPassword[indexToReplaceAt] === " "){
      strRandomPassword = strRandomPassword.substr(0,indexToReplaceAt) + charToReplaceWith + strRandomPassword.substr(indexToReplaceAt+1);
      break;
    }
  }

  return strRandomPassword;
}

// Generate Random Password function
var generatePassword = function(){

  // prompt for the Password Length
  var pwdLength = promptPwdLength();

  //prompt for character types
  var objCharType = {
    charUpperCase: false,
    charLowerCase: false,
    charNumeric: false,
    charSpecial: false
  };
  charactersType(objCharType);

  //confirmation of user selection
  var includeChar = "";
  if (objCharType.charLowerCase) includeChar+= "\r\n" + "lower case";
  if (objCharType.charUpperCase) includeChar+= "\r\n" + "upper case";
  if (objCharType.charNumeric) includeChar+= "\r\n" + "numeric";
  if (objCharType.charSpecial) includeChar+= "\r\n" + "special";
  
  var promptConfirm = confirm("You selected the following criteria to generate a password:" + "\r\n\r\n" + "Password Length: " + pwdLength.toString() + "\r\n\r\n" + "Included characters: " + includeChar );
  
  // generate password
  var strRandomPassword = new Array(pwdLength + 1).join(" "); // generate a string of password length filled with spaces
  if (promptConfirm){
    var strUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var strLower = "abcdefghijklmnopqrstuvwxyz";
    var strNumber = "0123456789";
    var strSpecial = "~!@#$%^&*()_+-=[]\\{}|;:\'\",./<>?";
  
    var charToUse = "";
    if (objCharType.charUpperCase){
      charToUse+=strUpper;
      strRandomPassword = generateOneCharInPwd(strRandomPassword, strUpper); // make sure at least one character in the password is Upper case
    }
    if (objCharType.charLowerCase){
      charToUse+=strLower;
      strRandomPassword = generateOneCharInPwd(strRandomPassword, strLower); // make sure at least one character in the password is Lower case
    }
    if (objCharType.charNumeric){
      charToUse+=strNumber;
      strRandomPassword = generateOneCharInPwd(strRandomPassword, strNumber); // make sure at least one character in the password is Number
    }
    if (objCharType.charSpecial){
      charToUse+=strSpecial;
      strRandomPassword = generateOneCharInPwd(strRandomPassword, strSpecial); // make sure at least one character in the password is special character
    }

    //set all other characters in the password string to randomly selected characters
    for (i = 0; i < pwdLength; i++){
      if (strRandomPassword.charAt(i) === " ")
        strRandomPassword = strRandomPassword.substr(0,i) + charToUse.charAt(Math.floor(Math.random() * charToUse.length)) + strRandomPassword.substr(i+1);
    }
  }

  return strRandomPassword;
}


// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
