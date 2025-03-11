$(document).ready(function () {
	$('.modal__form').on('keydown', 'input', function (event) {
		if (event.key === 'Enter') {
			event.preventDefault()
			return false
		}
	})

	$('.modal__submit-add').click(function (event) {
		event.preventDefault()
		const productNum = $('.modal__product-wrapper').length + 1

		const newProduct = `
				<div class="modal__product" style="display: none;">
								<div class="modal__product-wrapper">
									<p class="modal__product-title modal__marker">Товар ${productNum}</p>
									<span class="modal__product-remove"></span>

									<div class="modal__field">
										<p class="modal__field-label">Название товара</p>
										<input
											type="text"
											class="modal__field-input"
											placeholder="Название товара"
										/>
										<p class="modal__field-description">
											Скорее всего это
											<span class="modal__marker">линия "Одежда"</span>
										</p>
									</div>
									<div class="modal__product-details">
										<div class="modal__dimensions">
											<div class="modal__dimensions-group">
												<div class="modal__field">
													<p class="modal__field-label">Длина, см</p>
													<input
														type="number"
														class="modal__field-input"
														placeholder="Длина"
													/>
												</div>
												<div class="modal__field">
													<p class="modal__field-label">Ширина, см</p>
													<input
														type="number"
														class="modal__field-input"
														placeholder="Ширина"
													/>
												</div>
												<div class="modal__field">
													<p class="modal__field-label">Высота, см</p>
													<input
														type="number"
														class="modal__field-input"
														placeholder="Высота"
													/>
												</div>
											</div>

											<div class="modal__details-group">
												<div class="modal__field">
													<p class="modal__field-label">Вес коробки, кг</p>
													<input
														type="number"
														class="modal__field-input"
														placeholder="Вес"
													/>
												</div>
												<div class="modal__field">
													<p class="modal__field-label">Кол-во, шт</p>
													<input
														type="number"
														class="modal__field-input"
														placeholder="Количество"
													/>
												</div>
												<div class="modal__field">
													<p class="modal__field-label">Стоимость товара, ¥</p>
													<input
														type="number"
														class="modal__field-input"
														placeholder="Стоимость"
													/>
												</div>
											</div>
										</div>
										<div class="modal__product-details--or">
											или
											<div class="modal__field">
												<p class="modal__field-label">Введите объём</p>
												<input
													type="number"
													class="modal__field-input"
													placeholder="Объём"
												/>
											</div>
										</div>
									</div>
									<label class="modal__checkbox">
										<input
											type="checkbox"
											name="confirm"
											class="modal__checkbox-input"
										/>
										Хрупкий товар
									</label>
								</div>
							</div>
    `

		if ($('.modal__product').length > 0) {
			$('.modal__product').last().after(newProduct)
		} else {
			$('.modal__step-header').last().after(newProduct)
		}
		$('.modal__product')
			.last()
			.slideDown(350)
	})
	$(document).on('click', '.modal__product-remove', function () {
		$(this)
			.closest('.modal__product')
			.slideUp(300, function () {
				$(this).remove()
			})
	})
})
