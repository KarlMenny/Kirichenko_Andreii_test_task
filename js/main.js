const productsBox = document.querySelector('.products-box');
const allGoods = document.querySelectorAll('.product-box__item');
const popUp = document.querySelector('.confirm-order');
const quantityGoods = document.getElementById('quantity-goods');
const sum = document.getElementById('sum');
const categories = document.getElementById('categories');
const prices = document.getElementById('prices');

document.addEventListener('click', handler);
document.addEventListener('change', handler);
document.addEventListener('submit', handler);

function handler(event) {
    const { target, type } = event;

    switch (type) {
        case 'click':
            if (target.classList.contains('product-box__btn')) {
                const amountProduct = +target.previousElementSibling.firstElementChild.value;
                const priceProduct = +target.parentElement.parentElement.dataset.price;
                const totalPrice = calcPrice(amountProduct, priceProduct);

                addToCart(amountProduct, totalPrice);

            } else if (target.id === 'confirm-order') {
                popUp.style.display = 'flex';
            } else if (target.classList.contains('confirm-order__icon-svg') || target.tagName === 'path') {
                popUp.style.display = 'none';
            }
            break;

        case 'change':
            if (target.id !== 'categories' && target.id !== 'prices') return;

            const selectedCategory = +categories.value;
            const selectedPrice = +prices.value;
            const filteredGoods = filterGoods(allGoods, selectedCategory, selectedPrice);

            renderGoods(filteredGoods);
            break;

        case 'submit':
            event.preventDefault();
            const confirmOrderForm = document.forms.confirm_order;

            if (checkEmptyFields(confirmOrderForm)) {
                alert('Благодарим за Ваш заказ!');
                confirmOrderForm.submit();
            }
            break;
    }
}

function checkEmptyFields(form) {

    let checkResult = true;

    form.querySelectorAll('input[data-check]').forEach((field) => {

        if (!/\S+/.test(field.value)) {
            alert('Поле "' + field.getAttribute('placeholder').match(/\p{L}+.+\p{L}+/u)[0] + '" не заполнено!');
            checkResult = false;
        }
    });

    return checkResult;
}

function addToCart(amount, totalPrice) {

    quantityGoods.innerHTML = +quantityGoods.textContent + amount;
    sum.innerHTML = +sum.textContent + totalPrice;
}

function calcPrice(amount, price) {
    return amount * price;
}

function filterGoods(goods, category, price) {

    const filteredGoods = [];

    for (let i = 0; i < goods.length; i++) {

        if (+goods[i].dataset.cid === category || category === 0) {
            if (+goods[i].dataset.price <= price || price === 0) {
                filteredGoods.push(goods[i]);
            }
        }
    }

    return filteredGoods;
}

function renderGoods(goods) {
    const layout = [].map.call(goods, function(product) {
        return product.outerHTML;
    }).join('');

    productsBox.innerHTML = layout;
}