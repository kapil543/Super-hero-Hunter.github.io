let favouriteContainer= document.getElementById("favouriteContainer");


// THIS IS ACTUAL SCHEMA OF OBJECT THAT HOW IT HAS BEEN TRAVERSED IN THE FUNCTION ********** 



// let obj={
//     image:{
//         url: "https://www.superherodb.com/pictures2/portraits/10/100/667.jpg"
//     },
//     id: 195 ,
//     name: "Cyborg Superman" ,
//     powerstats: {
//         intelligence: "75",
//         strength: "93", 
//         speed: "92",
//         durablity: "100",
//         power: "100"
//     },
//     appearance:{
//         gender: "Male",
//         race: "Cyborg",
//         eyeColor: "blue",
//         hairColor: "black"

//     }
// }


let retriveArrFav= JSON.parse(localStorage.getItem("myFavourites"));


console.log(retriveArrFav);


let len=retriveArrFav.length;

for(let i=0;i<len;i++){


    let obj= retriveArrFav[i];


    
    let favouriteItem= document.createElement("li");
    favouriteItem.setAttribute("class","favouriteItem");

    favouriteItem.innerHTML=
        `
        <div class="favDiv" > 
        <img class="favImage" src="${obj.image.url}" >
        
        <div class="rightD">
        <p class="aaaad">${obj.id} </p>

        <p class="aaaad">${obj.name} </p>

        </div>
        <img class="deleteimage" onClick="deleteFav(${obj.id})" src="https://cdn-icons-png.flaticon.com/512/657/657059.png" >
        </div>

        `;

    favouriteContainer.appendChild(favouriteItem);
  
}


// FUNCTIONALITY TO DELETE THE FAVOURITE LIST FROM THE BROWSER

function deleteFav(gotId){
    console.log("delete  functionality has been called", gotId);

    
    let retriveArrFav= JSON.parse(localStorage.getItem("myFavourites"));


    let len=retriveArrFav.length;


    retriveArrFav= retriveArrFav.filter((myobject)=>{
        if(myobject.id != gotId){
            return true;
        }
    });

    localStorage.setItem("myFavourites", JSON.stringify(retriveArrFav));
    window.location.reload();
}