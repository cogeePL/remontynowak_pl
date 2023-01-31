const thumbnail = document.querySelectorAll('.thumbnail img')
const popup = document.querySelector('.popup')
const popupClose = document.querySelector('.popup-close')
const popupImg = document.querySelector('.popup-img')
const arrowLeft = document.querySelector('.popup-arrow-left')
const arrowRight = document.querySelector('.popup-arrow-right')
const showNextImage = () => {
	if (currentImgIndex === thumbnail.length - 1) {
		currentImgIndex = 0
	} else {
		currentImgIndex++
	}
	popupImg.src = thumbnail[currentImgIndex].src
}
const showPreviousImage = () => {
	if (currentImgIndex === 0) {
		currentImgIndex = thumbnail.length - 1
	} else {
		currentImgIndex--
	}
	popupImg.src = thumbnail[currentImgIndex].src
}

const closePopup = () => {
	popup.classList.add('fade-out')
	setTimeout(() => {
		popup.classList.add('hidden')
		popup.classList.remove('fade-out')
		thumbnail.forEach((element) => {
			element.setAttribute("tabindex", 1)
		}
	)}, 300)
}

let currentImgIndex

thumbnail.forEach((thumbnail, index) => {
	const showPopup = e => {
		popup.classList.remove('hidden')
		popupImg.src = e.target.src
		currentImgIndex = index
		thumbnail.forEach((element) => {
			element.setAttribute("tabindex", -1)
		})
	}

	thumbnail.addEventListener('click', showPopup)
	thumbnail.addEventListener('keydown', e => {
		if (e.code === 'Enter' || e.keyCode === 13) {
			showPopup(e)
		}
	})
})

popupClose.addEventListener('click', () => {
	popup.classList.add('hidden')
})

arrowRight.addEventListener('click', () => {
	if (currentImgIndex === thumbnail.length - 1) {
		currentImgIndex = 0
	} else {
		currentImgIndex++
	}

	popupImg.src = thumbnail[currentImgIndex].src
})

arrowLeft.addEventListener('click', () => {
	if (currentImgIndex === 0) {
		currentImgIndex = thumbnail.length - 1
	} else {
		currentImgIndex--
	}
	popupImg.src = thumbnail[currentImgIndex].src
})

document.addEventListener('keydown', e => {
	if (!popup.classList.contains('hidden')) {
		if (e.code === 'ArrowRight' || e.keyCode === 39) {
			showNextImage()
		}
		if (e.code === 'arrowLeft' || e.keyCode === 37) {
			showPreviousImage()
		}
		if (e.code === 'escape' || e.keyCode === 27) {
			closePopup()
		}
	}
})

popup.addEventListener('click', e => {
	if (e.target === popup) {
		closePopup()
	}
})
