const loadPhones = async (searchText,dataLimit)=>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
    // console.log(data.data);
}


const displayPhones = (phones, dataLimit)  =>{
    const phoneContainer = document.getElementById('phones-container');
    phoneContainer.innerHTML = '';
    // display 10 phones only 
    const showAll = document.getElementById('show-all');
    if(dataLimit && phones.length > 10){
      phones = phones.slice(0,10);
      showAll.classList.remove('d-none');
    }
    else{
      showAll.classList.add('d-none');
    }
    // display no phone message 
    noFoundMessage = document.getElementById('no-found-message');
    if(phones.length === 0){
      noFoundMessage.classList.remove('d-none');
    }
    else{
      noFoundMessage.classList.add('d-none');
    }

    // display all phones 
    phones.forEach(element => {
      // console.log(element.slug);
        const divPhone = document.createElement('div');
        divPhone.classList.add('col');
        divPhone.innerHTML = `
        <div class="card p-4">
              <img src="${element.image}" class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">${element.phone_name}</h5>
                <p class="card-text">
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </p>
                <button onclick="showDetails('${element.slug}')" class="btn btn-primary">Show Details</button>
                  </div>
            </div>
        `
        phoneContainer.appendChild(divPhone);
    });
    toggleSpinner(false);
   
}


// to check if i can send data to another page or not:

const showDetails =async (model) => {
  // Store the value in localStorage
  const url = `https://openapi.programming-hero.com/api/phone/${model}`;
    // const res = await fetch(url);
    // const data = await res.json();
  localStorage.setItem('myValue', url);
  
  // Redirect to the second page
  window.location.href = 'details.html';
}



// ======================================


// const showDetails = async (model) =>{
//   window.location.href="details.html"
//   const url = `https://openapi.programming-hero.com/api/phone/${model}`;
//   const res = await fetch(url);
//   const data = await res.json();
//   console.log(data.data);
// }

const processSearch = (dataLimit) =>{
  toggleSpinner(true);  
  const searchField = document.getElementById('search-field').value;
    loadPhones(searchField,dataLimit);
}




document.getElementById('searchPhone').addEventListener('click', function(){
 processSearch(10);
})

// enter event handler for searching:

document.getElementById("search-field").addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    processSearch(10);
  }
});


document.getElementById('show-all-btn').addEventListener('click', function(){
  processSearch();
})





const toggleSpinner = isLoading =>{
  const loader = document.getElementById('loader');
  if(isLoading){
      loader.classList.remove('d-none')
  }
  else{
    loader.classList.add('d-none');
  }
}


loadPhones('iphone');

