function makeEditable(element) {
    element.addEventListener('click', function() {
        const text = this.textContent;
        const input = document.createElement(this.tagName === 'H1' ? 'input' : 'textarea');
        input.value = text;
        input.style.width = '100%';
        input.style.fontSize = window.getComputedStyle(this).fontSize;
        input.style.fontFamily = window.getComputedStyle(this).fontFamily;
        input.style.color = window.getComputedStyle(this).color;
        input.style.backgroundColor = '#333';
        input.style.border = 'none';
        input.style.padding = '5px';

        // if (this.tagName === 'P') {
            input.style.height = '100px';
        // }

        this.parentNode.replaceChild(input, this);
        input.focus();

        input.addEventListener('blur', function() {
            const newElement = document.createElement(element.tagName);
            newElement.textContent = this.value;
            newElement.id = element.id;
            newElement.className = element.className;
            this.parentNode.replaceChild(newElement, this);
            makeEditable(newElement);
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const imageInput = document.getElementById('imageInput');
    const displayImage = document.getElementById('displayImage');

    imageInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file && file.type.match('image.*')) {
            const reader = new FileReader();

            reader.onload = function(e) {
                displayImage.src = e.target.result;
            };

            reader.readAsDataURL(file);
        } else {
            alert('Please select a valid image file.');
        }
    });
});

displayImage.addEventListener('click', function() {
    imageInput.click();
});

makeEditable(document.getElementById('heading'));
makeEditable(document.getElementById('paragraph'));
makeEditable(document.getElementById('paragraph2'));