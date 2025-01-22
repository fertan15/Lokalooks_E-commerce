document.addEventListener('DOMContentLoaded', function() {
    updateCartDisplay();
    updateCheckoutButton();

    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-minus') || e.target.parentElement.classList.contains('btn-minus')) {
            const cartItem = e.target.closest('.cart-item');
            const item = JSON.parse(cartItem.getAttribute('data-item'));
            updateQuantity(item, -1);
        }
        else if (e.target.classList.contains('btn-plus') || e.target.parentElement.classList.contains('btn-plus')) {
            const cartItem = e.target.closest('.cart-item');
            const item = JSON.parse(cartItem.getAttribute('data-item'));
            updateQuantity(item, 1);
        }
        else if (e.target.classList.contains('btn-remove') || e.target.parentElement.classList.contains('btn-remove')) {
            const cartItem = e.target.closest('.cart-item');
            const item = JSON.parse(cartItem.getAttribute('data-item'));
            removeItem(item);
        }
    });
});

function formatPrice(price) {
    const numPrice = parseFloat(price.replace(/[^0-9.-]+/g, '')) * 1000;

    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0 
    }).format(numPrice);
}


function updateQuantity(item, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const index = cart.findIndex(i => i.id === item.id && i.size === item.size);
    
    if (index !== -1) {
        const newQuantity = cart[index].quantity + change;
        if (newQuantity <= 0) {
            cart = cart.filter(i => !(i.id === item.id && i.size === item.size));
        } else {
            cart[index].quantity = newQuantity;
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
        updateCheckoutButton();
    }
}

function updateCartDisplay() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const emptyCartMessage = document.querySelector('.empty-cart');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '';
        emptyCartMessage.classList.remove('d-none');
        updateOrderSummary([]);
        return;
    }

    emptyCartMessage.classList.add('d-none');
    
    cartItemsContainer.innerHTML = `

        <div class="mb-3">
            <button id="erase-all-btn" class="btn btn-danger" onclick="eraseAllCart()">
                <i class='bx bx-trash me-2'></i>Clear Cart
            </button>
        </div>
        ${cart.map(item => `
            <div class="cart-item" data-item='${JSON.stringify(item)}'>
                <div class="row g-3 align-items-center">
                    <div class="col-12 col-md-2">
                        <img src="${item.image}" alt="${item.name}" class="img-fluid rounded">
                    </div>
                    <div class="col-12 col-md-3">
                        <div class="product-info">
                            <h5 class="product-title mb-0">${item.name}</h5>
                            <p class="text-muted mb-0">${item.size}</p>
                        </div>
                    </div>
                    <div class="col-12 col-md-2">
                        <span class="price">${formatPrice(item.price)}</span>
                    </div>
                    <div class="col-12 col-md-3">
                        <div class="quantity-input">
                            <div class="input-group">
                                <button class="btn btn-outline-secondary btn-sm btn-minus" type="button">
                                    <i class='bx bx-minus'></i>
                                </button>
                                <input type="text" class="form-control text-center" value="${item.quantity}" readonly>
                                <button class="btn btn-outline-secondary btn-sm btn-plus" type="button">
                                    <i class='bx bx-plus'></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-md-2">
                        <div class="cart-actions">
                            <button class="btn btn-outline-danger btn-sm btn-remove">
                                <i class='bx bx-trash'></i> Remove
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `).join('')}`;

    updateOrderSummary(cart);
    updateCheckoutButton();
}

function removeItem(item) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(i => !(i.id === item.id && i.size === item.size));
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

function eraseAllCart() {
    if (confirm('Are you sure you want to clear your entire cart?')) {
        localStorage.removeItem('cart');
        updateCartDisplay();
    }
}

function updateOrderSummary(cart) {
    const subtotal = cart.reduce((sum, item) => {
        const price = parseFloat(item.price.replace(/[^0-9.-]+/g, ''));
        return sum + (price * item.quantity * 1000);
    }, 0);
    
    const shipping = subtotal > 0 ? 50000 : 0;
    const total = subtotal + shipping;
    
    document.getElementById('subtotal').textContent = `Rp ${subtotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
    document.getElementById('shipping').textContent = `Rp ${shipping.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
    document.getElementById('total').textContent = `Rp ${total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
}

function updateCheckoutButton() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const checkoutBtn = document.getElementById('checkout-btn');

    if (cart.length === 0) {
        checkoutBtn.disabled = true;
        checkoutBtn.style.opacity = 0.5;
    } else {
        checkoutBtn.disabled = false;
        checkoutBtn.style.opacity = 1;
    }
}

function initCheckout() {
    document.getElementById('checkout-btn').addEventListener('click', function() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cart.length === 0) {
            return; 
        }

        const loadingModal = document.createElement('div');
        loadingModal.classList.add('modal', 'fade');
        loadingModal.id = 'checkoutLoadingModal';
        loadingModal.setAttribute('tabindex', '-1');
        loadingModal.setAttribute('aria-hidden', 'true');

        const loadingModalDialog = document.createElement('div');
        loadingModalDialog.classList.add('modal-dialog');

        const loadingModalContent = document.createElement('div');
        loadingModalContent.classList.add('modal-content');

        const loadingModalBody = document.createElement('div');
        loadingModalBody.classList.add('modal-body', 'd-flex', 'justify-content-center', 'align-items-center');

        const spinnerElement = document.createElement('div');
        spinnerElement.classList.add('spinner-border', 'text-primary');
        spinnerElement.setAttribute('role', 'status');

        const spinnerText = document.createElement('span');
        spinnerText.classList.add('visually-hidden');
        spinnerText.textContent = 'Loading...';

        spinnerElement.appendChild(spinnerText);
        loadingModalBody.appendChild(spinnerElement);
        loadingModalContent.appendChild(loadingModalBody);
        loadingModalDialog.appendChild(loadingModalContent);
        loadingModal.appendChild(loadingModalDialog);

        document.body.appendChild(loadingModal);

        const loadingModalInstance = new bootstrap.Modal(loadingModal);
        loadingModalInstance.show();

        setTimeout(() => {
            loadingModalInstance.hide();

            const checkoutModal = document.createElement('div');
            checkoutModal.classList.add('modal', 'fade');
            checkoutModal.id = 'checkoutModal';
            checkoutModal.setAttribute('tabindex', '-1');

            const checkoutModalDialog = document.createElement('div');
            checkoutModalDialog.classList.add('modal-dialog', 'modal-lg');

            const checkoutModalContent = document.createElement('div');
            checkoutModalContent.classList.add('modal-content');

            const checkoutModalHeader = document.createElement('div');
            checkoutModalHeader.classList.add('modal-header');

            const checkoutModalTitle = document.createElement('h5');
            checkoutModalTitle.classList.add('modal-title');
            checkoutModalTitle.textContent = 'Checkout Information';

            const checkoutModalCloseBtn = document.createElement('button');
            checkoutModalCloseBtn.classList.add('btn-close');
            checkoutModalCloseBtn.setAttribute('data-bs-dismiss', 'modal');
            checkoutModalCloseBtn.setAttribute('aria-label', 'Close');

            const checkoutModalBody = document.createElement('div');
            checkoutModalBody.classList.add('modal-body');

            const checkoutForm = document.createElement('form');
            checkoutForm.id = 'checkoutForm';

            const fullNameField = document.createElement('div');
            fullNameField.classList.add('mb-3');
            const fullNameLabel = document.createElement('label');
            fullNameLabel.classList.add('form-label');
            fullNameLabel.textContent = 'Full Name';
            const fullNameInput = document.createElement('input');
            fullNameInput.classList.add('form-control');
            fullNameInput.type = 'text';
            fullNameInput.required = true;
            fullNameField.appendChild(fullNameLabel);
            fullNameField.appendChild(fullNameInput);

            const emailField = document.createElement('div');
            emailField.classList.add('mb-3');
            const emailLabel = document.createElement('label');
            emailLabel.classList.add('form-label');
            emailLabel.textContent = 'Email';
            const emailInput = document.createElement('input');
            emailInput.classList.add('form-control');
            emailInput.type = 'email';
            emailInput.required = true;
            emailField.appendChild(emailLabel);
            emailField.appendChild(emailInput);

            const addressField = document.createElement('div');
            addressField.classList.add('mb-3');
            const addressLabel = document.createElement('label');
            addressLabel.classList.add('form-label');
            addressLabel.textContent = 'Full Address';
            const addressInput = document.createElement('textarea');
            addressInput.classList.add('form-control');
            addressInput.rows = '3';
            addressInput.required = true;
            addressField.appendChild(addressLabel);
            addressField.appendChild(addressInput);

            const paymentField = document.createElement('div');
            paymentField.classList.add('mb-3');
            const paymentLabel = document.createElement('label');
            paymentLabel.classList.add('form-label');
            paymentLabel.textContent = 'Payment Method';
            const paymentSelect = document.createElement('select');
            paymentSelect.classList.add('form-select');
            paymentSelect.required = true;
            const paymentOption1 = document.createElement('option');
            paymentOption1.value = '';
            paymentOption1.textContent = 'Choose...';
            const paymentOption2 = document.createElement('option');
            paymentOption2.value = 'Bank Transfer';
            paymentOption2.textContent = 'Bank Transfer';
            const paymentOption3 = document.createElement('option');
            paymentOption3.value = 'Credit Card';
            paymentOption3.textContent = 'Credit Card';
            const paymentOption4 = document.createElement('option');
            paymentOption4.value = 'E-Wallet';
            paymentOption4.textContent = 'E-Wallet';
            paymentSelect.appendChild(paymentOption1);
            paymentSelect.appendChild(paymentOption2);
            paymentSelect.appendChild(paymentOption3);
            paymentSelect.appendChild(paymentOption4);
            paymentField.appendChild(paymentLabel);
            paymentField.appendChild(paymentSelect);

            checkoutForm.appendChild(fullNameField);
            checkoutForm.appendChild(emailField);
            checkoutForm.appendChild(addressField);
            checkoutForm.appendChild(paymentField);

            const checkoutModalFooter = document.createElement('div');
            checkoutModalFooter.classList.add('modal-footer');

            const cancelBtn = document.createElement('button');
            cancelBtn.classList.add('btn', 'btn-secondary');
            cancelBtn.setAttribute('data-bs-dismiss', 'modal');
            cancelBtn.textContent = 'Cancel';

            const confirmBtn = document.createElement('button');
            confirmBtn.classList.add('btn', 'btn-primary');
            confirmBtn.setAttribute('onclick', 'processCheckout()');
            confirmBtn.textContent = 'Confirm Order';

            checkoutModalFooter.appendChild(cancelBtn);
            checkoutModalFooter.appendChild(confirmBtn);

            checkoutModalHeader.appendChild(checkoutModalTitle);
            checkoutModalHeader.appendChild(checkoutModalCloseBtn);

            checkoutModalBody.appendChild(checkoutForm);

            checkoutModalContent.appendChild(checkoutModalHeader);
            checkoutModalContent.appendChild(checkoutModalBody);
            checkoutModalContent.appendChild(checkoutModalFooter);

            checkoutModalDialog.appendChild(checkoutModalContent);
            checkoutModal.appendChild(checkoutModalDialog);

            document.body.appendChild(checkoutModal);

            const checkoutModalInstance = new bootstrap.Modal(checkoutModal);
            checkoutModalInstance.show();
        }, 1000);
    });
}
function processCheckout() {
    const form = document.getElementById('checkoutForm');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const modal = bootstrap.Modal.getInstance(document.getElementById('checkoutModal'));
    modal.hide();

    const successModal = document.createElement('div');
    successModal.classList.add('modal', 'fade');
    successModal.id = 'successModal';
    successModal.setAttribute('tabindex', '-1');
    successModal.setAttribute('aria-hidden', 'true');

    const successModalDialog = document.createElement('div');
    successModalDialog.classList.add('modal-dialog');

    const successModalContent = document.createElement('div');
    successModalContent.classList.add('modal-content');

    const successModalBody = document.createElement('div');
    successModalBody.classList.add('modal-body', 'd-flex', 'flex-column', 'align-items-center', 'justify-content-center');

    const packageIcon = document.createElement('i');
    packageIcon.classList.add('bx', 'bx-package');
    packageIcon.style.fontSize = '4rem';
    packageIcon.style.color = '#28a745';

    const successMessage = document.createElement('p');
    successMessage.classList.add('mt-3');
    successMessage.textContent = 'Your package is on its way to your doorstep!';

    const confirmationMessage = document.createElement('p');
    confirmationMessage.classList.add('text-muted');
    confirmationMessage.textContent = 'You will receive a confirmation email shortly.';

    successModalBody.appendChild(packageIcon);
    successModalBody.appendChild(successMessage);
    successModalBody.appendChild(confirmationMessage);

    successModalContent.appendChild(successModalBody);
    successModalDialog.appendChild(successModalContent);
    successModal.appendChild(successModalDialog);

    document.body.appendChild(successModal);

    const successModalInstance = new bootstrap.Modal(successModal);
    successModalInstance.show();

    localStorage.removeItem('cart');

    setTimeout(() => {
        window.location.href = 'Home.html';
    }, 3000);
}

document.addEventListener('DOMContentLoaded', function() {
    initCheckout();
});