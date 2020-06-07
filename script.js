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

// Generate Random Password function
var generatePassword = function(){

  // prompt for the Password Length
  var prdLength = promptPwdLength();

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
  
  var promptConfirm = confirm("You selected the following criteria to generate a password:" + "\r\n\r\n" + "Password Length: " + prdLength.toString() + "\r\n\r\n" + "Included characters: " + includeChar );
  
    // generate password
  var strRandomPassword = "";
  if (promptConfirm){
    var strUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var strLower = "abcdefghijklmnopqrstuvwxyz";
    var strNumber = "0123456789";
    var strSpecial = "~!@#$%^&*()_+-=[]\\{}|;:\'\",./<>?";
  
    var charToUse = "";
    if (objCharType.charUpperCase) 
      charToUse+=strUpper;
    if (objCharType.charLowerCase) 
      charToUse+=strLower;
    if (objCharType.charNumeric) 
      charToUse+=strNumber;
    if (objCharType.charSpecial) 
      charToUse+=strSpecial;
  
    for (i = 0; i < prdLength; i++){
      strRandomPassword += charToUse.charAt(Math.floor(Math.random() * charToUse.length));
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
