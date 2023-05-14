// defining empty object
let obj;

const myCall = async ()=>{

    let searchId= localStorage.getItem("givenId");
    let searchValue= localStorage.getItem("searchValue");
    console.log(searchValue);
    const url= `https://www.superheroapi.com/api.php/1211886636113722/search/${searchValue}`;

    const response= await fetch(url);

    const mydata= await response.json();

    
    // console.log(mydata.results);

    const res= mydata.results;

    console.log(res);
    // console.log(res[2].id);
    console.log("searchId", searchId);

    // console.log(res[1].id == searchId);

    let n= res.length;
    for(let i=0;i<n;i++){
        if(res[i].id == searchId){
            console.log(i);

            // console.log(res[i]);
            obj=res[i];

            console.log("obj",obj);


                    
            let detailContainer= document.getElementById("detailContainer");

            //functionality for detail generation
            function detailGenerator(obj){
        
                let containerDiv= document.createElement("div");
                containerDiv.setAttribute("class","containerDiv");

                containerDiv.innerHTML=
                    `
                    <div> <img class="detailImg" src="${obj.image.url}" > </div>
                    <p class="mybold" > id: ${obj.id} </p>
                    <p class="mybold" > name: ${obj.name} </p>
                    <h4 class="head" > Appearance </h4>
                    <p class="appearance"> gender: ${obj.appearance.gender} </p>
                    <p class="appearance"> race: ${obj.appearance.race} </p>
                    <p class="appearance"> eyeColor: ${obj.appearance.eyeColor} </p>
                    <p class="appearance"> hairColor: ${obj.appearance.hairColor} </p>

                    <h4 class="head1" > PowerStats </h4>
                        <p class="powerstats">  intelligence: ${obj.powerstats.intelligence} </p>
                        <p class="powerstats">  strength: ${obj.powerstats.strength}  </p>
                        <p class="powerstats"> speed: ${obj.powerstats.speed} </p>
                        <p class="powerstats"> durablity: ${obj.powerstats.durablity} </p>
                        <p class="powerstats">  power: ${obj.powerstats.power} </p>
                    `;


                detailContainer.append(containerDiv);

            }
            //  calling functoin to append the values in object

            detailGenerator(obj);
          

            
        }
    }


}



myCall();

 