// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!

function getLikeGlyphs() {
	const likeGlyphs = document.getElementsByClassName("like-glyph");
	
	for(let i = 0; i < likeGlyphs.length; i++) {
		const glyph = likeGlyphs[i];
		
		glyph.addEventListener("click", function() {
			processLike(glyph);
		});
	}
}

function processLike(glyph) {
	mimicServerCall({})
		.then(response => handleSuccess(glyph))
		.catch(error => handleError(error));
}

function handleSuccess(glyph) {
	let glyphStatus = glyph.textContent;
	
	if (glyphStatus === EMPTY_HEART) {
		glyph.textContent = FULL_HEART;
		glyph.className = "activated-heart";
	} else {
		glyph.textContent = EMPTY_HEART;
		glyph.className = "";
	}
}

function handleError(error) {
	const errorModal = document.getElementById("modal");
	const errorMessage = document.getElementById("modal-message");
	
	errorMessage.textContent = error;
	errorModal.className = "";
	
	setTimeout(hideModal, 5000);			
}

function hideModal() {
	const errorModal = document.getElementById("modal");
	
	errorModal.className = "hidden";
}

getLikeGlyphs();

//------------------------------------------------------------------------------
// Ignore after this point. Used only for demo purposes
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
