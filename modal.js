// modal.js
export function openModal(text) {
    const modalContent = document.getElementById('modalText');
    modalContent.textContent = text;

    const modal = document.getElementById('popupModal');
    modal.style.display = 'block';
}

export function closeModal() {
    const modal = document.getElementById('popupModal');
    modal.style.display = 'none';
}