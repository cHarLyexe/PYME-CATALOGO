let cart = [];

// Función para agregar servicio al carrito
function addToQuote(service, description, price) {
    cart.push({ service, description, price });
    updateCart();
}

// Función para actualizar el carrito en la interfaz
function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const div = document.createElement('div');
        div.textContent = `${item.service} - ${item.description} - $${item.price.toLocaleString('es-CL')}`;
        cartItems.appendChild(div);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.classList.add('delete');
        deleteButton.onclick = () => removeFromQuote(index);
        cartItems.appendChild(deleteButton);

        cartItems.appendChild(document.createElement('br'));

        total += item.price;
    });

    cartTotal.textContent = `Total: $${total.toLocaleString('es-CL')}`;
}

// Función para eliminar servicio del carrito
function removeFromQuote(index) {
    cart.splice(index, 1);
    updateCart();
}

// Función para resetear el carrito
function resetQuote() {
    cart = [];
    updateCart();
}

// Función para enviar la cotización como PDF
function submitQuote() {
    const quoteData = JSON.stringify(cart);
    document.getElementById('quoteData').value = quoteData;
    document.getElementById('quoteForm').submit();
}

// Función para cambiar la imagen principal en la galería de trabajos
function changeImage(imageSrc) {
    const mainImg = document.getElementById('mainImg');
    mainImg.src = imageSrc;
}

// Función para cambiar automáticamente las imágenes del slider
function autoChangeImage() {
    const thumbnails = document.querySelectorAll('.thumbnails img');
    let currentImageIndex = 0;

    setInterval(() => {
        currentImageIndex = (currentImageIndex + 1) % thumbnails.length;
        changeImage(thumbnails[currentImageIndex].src);
    }, 10000); // Cambia la imagen cada 10 segundos
}

// Iniciar el cambio automático de imágenes cuando la página se haya cargado
window.onload = autoChangeImage;
