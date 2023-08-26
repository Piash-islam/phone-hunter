
      window.onload = async () => {
        // Get the value from localStorage
        var url = localStorage.getItem("myValue");
        const res = await fetch(url);
        const data = await res.json();
        loadPhoneDetails(data.data);
      };

      const modelName = document.getElementById('model-name')
      const imageContainer = document.getElementById('image-container')
      const othersContainer = document.getElementById('others-container')
      
      const loadPhoneDetails = data =>{
        console.log(data)
        modelName.innerText = `${data.brand}`
        imageContainer.innerHTML = `
            <img class="img-fluid" src="${data.image}">
        `
        othersContainer.innerHTML = `
           <h2 class="mb-4">${data.name}</h2>
           <p><b>Details:</b> ${data.others.WLAN},${data.others.Bluetooth},${data.others.GPS}</p>
           <p><b>MainFeatures:</b> ${data.mainFeatures.storage},${data.mainFeatures.displaySize}</p>
        `
      }