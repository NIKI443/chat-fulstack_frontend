$(document).ready(function () {
	const modalTrigger = $('.modal__trigger')
	const modalWindow = $('.modal__window')

	modalTrigger.click(function () {
		modalTrigger.toggleClass('hidden')
		modalWindow.removeClass('hidden')
		setTimeout(function () {
			modalWindow.toggleClass('open')
		}, 50)
	})
	$('.modal__header .modal__close').click(function () {
		modalWindow.removeClass('open')
		setTimeout(function () {
			modalTrigger.removeClass('hidden')
			modalWindow.toggleClass('hidden')
		}, 150)
	})
})
// Checkboxes
$(document).ready(function () {
	const selectWrapper = $('.modal__select-wrapper.package')
	const selectHeader = selectWrapper.find('.modal__select-header')
	const selectOptions = selectWrapper.find('.modal__select-options')
	const checkboxes = selectOptions.find('input[type="checkbox"]')

	selectHeader.click(function () {
		selectWrapper.toggleClass('open')
		$('.modal__select-below').toggleClass('hidden')
	})

	selectWrapper.on('click', '.modal__select-below .modal__close', function () {
		const valueBelow = $(this).parent().text().trim()
		const checkbox = checkboxes.filter(function () {
			return $(this).val() === valueBelow
		})
		console.log(checkbox)
		checkbox.prop('checked', false)
		$(this).parent().remove()
	})

	checkboxes.on('change', function () {
		updateSelect()
		selectOptions.addClass('fade-in')
	})

	$(document).click(function (event) {
		if (!$(event.target).closest('.modal__select-wrapper').length) {
			selectWrapper.removeClass('open')
			$('.modal__select-below').removeClass('hidden')
		}
	})


	function updateSelect() {
		const selectedOptions = checkboxes
			.filter(':checked')
			.map(function () {
				return $(this).parent().text().trim()
			})
			.get()

		const newSubmitBelow = option => `
		<p class="modal__submit-below">
			${option} <span class="modal__close"></span>
		</p>`

		selectWrapper.find('.modal__submit-below').remove()
		selectedOptions.map(function (option) {
			$(newSubmitBelow(option)).appendTo('.modal__select-below')
		})
	}
})

// Base Select
$(document).ready(function () {
	const selectWrapper = $('.modal__order .modal__select-wrapper')
	const selectHeader = selectWrapper.find('.modal__select-header')
	const options = selectWrapper.find('.modal__select-options p')

	selectHeader.click(function () {
		selectWrapper.toggleClass('open')
		$('.modal__select-below').toggleClass('hidden')
	})

	options.click(function () {
		const selectedOption = $(this).text().trim()

		selectHeader.text(selectedOption)
		selectWrapper.removeClass('open')
	})

	$(document).click(function (event) {
		if (!$(event.target).closest('.modal__select-wrapper').length) {
			selectWrapper.removeClass('open')
		}
	})
})
