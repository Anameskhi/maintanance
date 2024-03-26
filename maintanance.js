fetch('./maintanance.json')
    .then(response => response.json())
    .then(data => {
        const svgs = data.svgs;

        const computerFrameUrl = svgs.computerFrame;
        const crocoLogoUrl = svgs.crocoLogo;
        const titleUrl = svgs.title;
        const chatUrl = svgs.chat;
        const phoneUrl = svgs.phone;

        const computerFrameImg = document.getElementById('computer-frame');
        const crocoLogoImg = document.getElementById('croco-logo');
        const titleImg = document.getElementById('title')
        const chatImg = document.getElementById('chat')
        const phoneImg = document.getElementById('phone')

        crocoLogoImg.src = crocoLogoUrl
        computerFrameImg.src = computerFrameUrl;
        titleImg.src = titleUrl
        chatImg.src = chatUrl
        phoneImg.src = phoneUrl
    })
    .catch(error => console.error('Error fetching JSON:', error));
