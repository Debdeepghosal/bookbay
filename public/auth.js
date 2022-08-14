if (window.location.pathname=="/register") {
    //SignUP
//get data from signup form
function getUserInfo(){
    let form=document.getElementById("registerform").elements;
    let name=form[0].value;
    let email=form[1].value;
    let password=form[2].value;
    let Confirmpassword=form[3].value;

    if (password==Confirmpassword) {
        
        if (!name || !email || !password || !Confirmpassword) {
            alert("Empty Fields!")
            return;
        }
        else{
        const json = JSON.stringify({ "name": `${name}` ,"email": `${email}`,
            "password": `${password}`
        } );
        axios
        .post('/api/v1/account/register', json,{
            headers: {
              'Content-Type': 'application/json'
            }
          })
        .then(()=>{
            window.location.pathname=="/"
        })
        .catch(()=>{
            alert('Account Created! Now Login')
        }
        );

        }
    }
    else{
        alert("Password Not matching !");
    }

}


function redirect(res){
    window.location.pathname=="/"
}

//Eventlistener
let signupbtn=document.getElementById("registersubmitbutton");
signupbtn.addEventListener('click',getUserInfo);

}
else if(window.location.pathname=="/login"){

    //login operations

function getLoginInfo(){
    let form=document.getElementById("loginform").elements;
    let email=form[0].value;
    let password=form[1].value;
    
    if (!email || !password) {
    alert("Empty Fields !")
    return;
    }
    else{
    const json = JSON.stringify({ "email": `${email}`,
    "password": `${password}`
    } );
    axios
        .post('/api/v1/account/login', json,{
            headers: {
              'Content-Type': 'application/json'
            }
          })
        .then(res => redirect(res))
        .catch(()=>{
            alert('Wrong Credentials !')
        })
    }
}

function redirect(res){
    console.log(res);
    window.location = "/";
}


//eventlistener
let loginbtn=document.getElementById("loginsubmitbutton");
loginbtn.addEventListener('click',getLoginInfo);

}


