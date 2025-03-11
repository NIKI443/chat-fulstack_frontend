$('#modal__form').validate({
	rules: {
		length: { required: true, min: 0 },
		width: { required: true, min: 0 },
		height: { required: true, min: 0 },
		volume: { required: true, min: 0 },

		heft: { required: true, min: 0 },
		amount: { required: true, min: 0 },
		price: { required: true, min: 0 },
	},
	messages: {
		length: {
			required: 'Заполните это поле или "Объём"',
			min: 'Значение должно быть больше или равно 0',
		},
		width: {
			required: 'Заполните это поле или "Объём"',
			min: 'Значение должно быть больше или равно 0',
		},
		height: {
			required: 'Заполните это поле или "Объём"',
			min: 'Значение должно быть больше или равно 0',
		},
		volume: {
			required: 'Заполните это поле или поля "длины, ширины, высоты"',
			min: 'Значение должно быть больше или равно 0',
		},
		heft: {
			required: 'Обязательное поле',
			min: 'Значение должно быть больше или равно 0',
		},
		amount: {
			required: 'Обязательное поле',
			min: 'Значение должно быть больше или равно 0',
		},
		price: {
			required: 'Обязательное поле',
			min: 'Значение должно быть больше или равно 0',
		},
	},
	errorPlacement: function (e, i) {
		e.appendTo(i.closest('.modal__field'))
	},
})
	jQuery.extend(jQuery.validator.messages, { required: 'Обязательное поле' })

$(document).ready(function () {
	$('#modal__form').on('submit', function () {
		if ($('.name-product').valid()) {
			$('.modal__field-description').removeClass('error')
		} else {
			$('.modal__field-description').addClass('error')
		}
	})

	function updateFormData() {
		const formData = {}
		const $productWrapper = $('.modal__product-wrapper')

		$productWrapper.each(function (index) {
			const productNum = index + 1
			formData[`Товар ${productNum}`] = {}

			$(this)
				.find('input:not(:disabled), select:not(:disabled)')
				.each(function () {
					const field = $(this)
					const fieldName = field.attr('placeholder')
					const fieldValue = field.val()
					const fieldType = field.attr('type')

					if (fieldType === 'checkbox') {
						formData[`Товар ${productNum}`][fieldName] = field.prop('checked')
					} else {
						formData[`Товар ${productNum}`][fieldName] = fieldValue
					}
				})

			if (productNum === 1 || $productWrapper.length > 1) {
				const specificFields = $(this).find(
					'.modal__dimensions-group input, .modal__details-group input'
				)
				specificFields.each(function () {
					const field = $(this)
					const fieldName = field.attr('placeholder')
					formData[`Товар ${productNum}`][fieldName] = field.val()
				})
			}
		})

		$productWrapper.each(function (index) {
			let totalVolume = 0
			let totalHeft = 0
			let totalPrice = 0
			const productNum = index + 1
			const formItem = formData[`Товар ${productNum}`]
			const productNumInput = index && index * 3
			const $volume = $(
				'.modal__product-details--or input[placeholder="Объём"]'
			)[index]
			const $dimensionsInput = $('.modal__dimensions-group input')

			if (
				formItem['Длина'] > 0 ||
				formItem['Ширина'] > 0 ||
				formItem['Высота'] > 0
			) {
				$volume.disabled = true
			} else if (formItem['Объём'] > 0) {
				$dimensionsInput[0 + productNumInput].disabled = true
				$dimensionsInput[1 + productNumInput].disabled = true
				$dimensionsInput[2 + productNumInput].disabled = true
			} else {
				$volume.disabled = false

				$dimensionsInput[0 + productNumInput].disabled = false
				$dimensionsInput[1 + productNumInput].disabled = false
				$dimensionsInput[2 + productNumInput].disabled = false
			}

			totalVolume +=
				+formItem['Объём'] ||
				formItem['Длина'] * formItem['Ширина'] * formItem['Высота']
			totalHeft += formItem['Вес'] * formItem['Количество']
			totalPrice += formItem['Стоимость'] * formItem['Количество']

			$('.modal__product-result input[placeholder="Объём"]').val(totalVolume)
			$('.modal__product-result input[placeholder="Вес"]').val(totalHeft)
			$('.modal__product-result input[placeholder="Стоимость"]').val(totalPrice)
		})

		formData['Общие результаты'] = {}
		$('.modal__product-result input').each(function () {
			const field = $(this)
			const fieldName = field.attr('placeholder').trim()

			formData['Общие результаты'][fieldName] = field.val()
		})
		$('.modal__result-total input').each(function () {
			const field = $(this)
			const fieldName = field.attr('placeholder').trim()
			if (fieldName != 'Страховка')
				field.val(formData['Общие результаты'][fieldName])
		})
	}

	$('.modal__form').on(
		'input',
		'input:not(:disabled), select:not(:disabled)',
		function () {
			updateFormData()
		}
	)
})
