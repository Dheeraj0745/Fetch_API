//fetch returns a promise.
//fetch resolved value return responce object  and reject throws a exception //
// responce object has method and properties one of them is responce.json
 // responceobject.json will return a promise which whose resolve value is a js object which contains user details


function getData(){
    let txtUserName=document.querySelector("#githubId").value.trim();
    let detailsdiv=document.querySelector("#details");
    if(!txtUserName){   //emptystring is false in js
        detailsdiv.innerHTML=`<p style="color:red;"> please enter a valid github username:</p>`;
        return;
    }

    let endpoint="https://api.github.com/users/"+txtUserName;
    let pr = fetch(endpoint); 
    pr.then((responseobject) => {  
        detailsdiv.innerHTML=""; // this will clear the previous details and error message..

        if (responseobject.status !== 200) {
            throw new Error("User not found:");
        }
         return responseobject.json();  
         //Promise chaining में हर अगला .then() पिछले .then() 
         // से जो भी value (या promise) return होती है, उसी को receive करता है।   
    }).then((user) => {
        let name=user.name;
        let company=user.company;
        let website=user.blog;
        let imgUrl=user.avatar_url;

        let img=document.createElement("img");
        img.src=imgUrl;

        let uname=document.createElement("p");
        uname.innerHTML=`<strong>Name:</strong>${name}`;

        let ucompany=document.createElement("p");
        ucompany.innerHTML=`<strong>Company:</strong>${company}`;

        let uwebsite=document.createElement("p");
        uwebsite.innerHTML=`<strong>Website:</strong>"<a href="${website}">${website}</a>`;

        detailsdiv.appendChild(img);
        detailsdiv.appendChild(uname);
        detailsdiv.appendChild(ucompany);
        detailsdiv.appendChild(uwebsite);

    })

    .catch((error)=>{
        detailsdiv.innerHTML=`<p style="color:red;">${error.message}</p>`;
    })


}
// fetch return promis object on resolving we get responce object on calling responce
//responceobject.json again we get promis on resoliving which we get js object which contain user details