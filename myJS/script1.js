
let lists= document.getElementById("lists");
let inputValue= document.getElementById("input1");

//we are actually making array of objects that would be stored in LocalStorage for the further use

let myFavourites =[];

let  isMyFavouritesExist= JSON.parse(localStorage.getItem("myFavourites"));
// if not exist then set myFavourites
if(isMyFavouritesExist==null){
    localStorage.setItem("myFavourites",JSON.stringify(myFavourites));
}


//  All the keys and other values that would be used in code

const myPublicKey="829a5143514da0e7b110443c1379bcfe";

const myPrivateKey="7c6158c66355d0187bbd500749a93073db7ee2ef";
 

//this handleInput is triggered from search  button when it is clicked

function handleInput(){
    // for removing auto suggetion name list
    removeElements();

    const searchValue= inputValue.value;

    localStorage.setItem("searchValue", searchValue);
    // const searchValue="batman";
    
    const myReq=  async ()=>{
        const ts= await Date.now();
        const myMDHash=await CryptoJS.MD5(ts+myPrivateKey+myPublicKey);
        // console.log("md",myMDHash);
        
        // const url =`https://gateway.marvel.com/v1/public/characters?nameStartsWith=${searchValue}&ts=${ts}&apikey=${myPublicKey}&hash=${myMDHash}`
        const url= `https://www.superheroapi.com/api.php/1211886636113722/search/${searchValue}`;

        const response= await fetch(url);
        //  console.log(response);
        const mydata= await response.json();
        // console.log(mydata);
        
        // console.log(await mydata.data.results);

        const res= mydata.results;

        // console.log(res[0]);
        // console.log(res.length);
        for(let i=0;i<res.length;i++){

        // making list item that would be used as list
        let listItem=  document.createElement("li");

        listItem.setAttribute("class","listItem");
        

        listItem.innerHTML=  `

        <div class="content">
                        <div class="leftDiv">
                        <a href="./myHTML/detail.html" > <img onClick="handleShowDetail(${res[i].id})" class="listimage" src="${res[i].image.url}" > </a>
                                        </div>
                        <div class="rightDiv">
                            <span class="myId"> Id: ${res[i].id}</span>
                            <span class="myName"> ${res[i].name} </span>
                        </div>
                        <div class="btn">
                            <button onClick="handleAddFavourite(${res[i].id})" >
                                <img  class="likeImage" src="https://cdn-icons-png.flaticon.com/512/3128/3128313.png" alt="" >
                            </button>
                        </div>
                    </div>
    
        `;

        console.log(res[i].id, res[i].name,res[i].image.url );


        lists.appendChild(listItem);

        }

        
    }


// making API call 
myReq();

}



// functionality to handle the showDetail of particular hero of API

function handleShowDetail(givenId){
 /// JSON.parse(arg);
 console.log(givenId);
 window.localStorage.setItem("givenId", givenId);
  console.log("functionality of handle show detail has been called");
 // console.log(arg);
}

// funcitonality to add favourite into myFavorite page

function handleAddFavourite(gotId){

  console.log(gotId,"add favourite functionality has been called");

  
    const myCall = async ()=>{

        // let searchId= localStorage.getItem("givenId");
        let searchValue= localStorage.getItem("searchValue");
        console.log(searchValue);
        const url= `https://www.superheroapi.com/api.php/1211886636113722/search/${searchValue}`;

        const response= await fetch(url);

        const mydata= await response.json();

        
        // console.log(mydata.results);

        const res= mydata.results;

        console.log(res);
        // console.log(res[2].id);
        // console.log("searchId", searchId);

        // console.log(res[1].id == searchId);

        let n= res.length;
        for(let i=0;i<n;i++){
            if(res[i].id == gotId){
                // console.log(i);

                // console.log(res[i]);
                let  myobj=res[i];

                console.log("myobj",myobj);

                    let retrieveArrayOFFav= JSON.parse(localStorage.getItem("myFavourites"));
                     
                    //  console.log(retrieveArrayOFFav);


                    retrieveArrayOFFav.push(myobj);

                    localStorage.setItem("myFavourites",JSON.stringify(retrieveArrayOFFav));


            }}

    }



myCall();


}

// for auto complete suggetion

function displayWords(value){
    console.log(value);
    inputValue.value=value;
    removeElements();
}

listContainer=document.querySelector(".list");
function removeElements(){
    listContainer.innerHTML="";
}
inputValue.addEventListener("keyup",async ()=>{
    removeElements();
    // deside minimum length of word for searching
    if(inputValue.value.length<4){
        return false;
    }
    const url= `https://www.superheroapi.com/api.php/1211886636113722/search/${inputValue.value}`;

    const response= await fetch(url);

    const mydata= await response.json();
    // if releted data not found then return;
    if(mydata.results==null){return;};
    // for adding each similier name suggetion in list
    mydata.results.forEach((result)=>{
        let name=result.name;
        let div=document.createElement("div");
        div.style.cursor="pointer";
        div.classList.add("autocomplete-items");
        div.setAttribute("onclick","displayWords('" + name + "')");
        let word="<b>" + name.substr(0,inputValue.value.length)+"</b>";
        word+=name.substr(inputValue.value.length);
        div.innerHTML=`<p class="item">${word}</p>`;
        listContainer.appendChild(div);
    });
});