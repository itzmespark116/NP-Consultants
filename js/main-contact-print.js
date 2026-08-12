fetch("../data/main-contact.json")
    .then(res => res.json())
    .then(data => {
        document.querySelector(".main-contact").innerHTML = `
            <h2>${data["main-contact-title"]}</h2>
            <p>${data["main-contact-description"]}</p>
            <button onclick="location.href='${data["main-contact-buttonLink"]}'">${data["main-contact-button"]}</button>
        `;
    });