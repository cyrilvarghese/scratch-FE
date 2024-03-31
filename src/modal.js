// modal.js
export function openModal(item) {
    const modalContent = document.getElementById('modalText');
    let highlightStub = "/#unfamiliar:~:text=" + item.page_content.split(' ').slice(0, 3).join(' ');
    modalContent.textContent = item.page_content;
    // Set href for the 'ulrSrc' link
    document.getElementById('ulrSrc').href = item.url_source + highlightStub;

    // Set href for the 'fileSrc' link
    document.getElementById('fileSrc').href = item.file_source + highlightStub;
    const modal = document.getElementById('popupModal');
    modal.style.display = 'block';
}

export function closeModal() {
    const modal = document.getElementById('popupModal');
    modal.style.display = 'none';
}