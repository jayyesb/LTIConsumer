var btnElm=document.querySelector('button');

const fd=new FormData();

fd.append('iss','http://localhost:8000');
fd.append('login_hint','123');
fd.append('target_link_uri','https://arlt.moodlecloud.com/enrol/lti/launch.php');

var reqData={
    'iss':'http://localhost:8000',
    'login_hint':'123',
    'target_link_uri':'https://arlt.moodlecloud.com/enrol/lti/launch.php'
}

btnElm.addEventListener('click',(e)=>{
    

    fetch('https://arlt.moodlecloud.com/enrol/lti/login.php?id=ec3ffe58025ffbffc3c60b84f757cb9534da3fb062f42b84552e1dcff0b4',{
        method:'POST',
        mode:'no-cors',
        body: fd
    }).then((response)=>{
        console.log(response);
    });
           
});