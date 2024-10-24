class SliderComponent {
    constructor(containerId, min, max, initialValue, label) {
        this.container = document.getElementById(containerId);
        this.min = min;
        this.max = max;
        this.value = initialValue;
        this.label = label || "Slider Value";

        this.render();
    }

    render() {
        const sliderContainer = document.createElement('div');
        sliderContainer.className = 'slider-container';

        const sliderLabel = document.createElement('label');
        sliderLabel.textContent = this.label;

        const minValueLabel = document.createElement('span');
        minValueLabel.textContent = this.min;

        const sliderInput = document.createElement('input');
        sliderInput.type = 'range';
        sliderInput.min = this.min;
        sliderInput.max = this.max;
        sliderInput.value = this.value;
        sliderInput.className = 'slider';
        sliderInput.addEventListener('input', (e) => this.updateValue(e.target.value));

        const maxValueLabel = document.createElement('span');
        maxValueLabel.textContent = this.max;

        this.currentValueLabel = document.createElement('span');
        this.currentValueLabel.textContent = this.value;

        sliderContainer.appendChild(sliderLabel);
        sliderContainer.appendChild(minValueLabel);
        sliderContainer.appendChild(sliderInput);
        sliderContainer.appendChild(maxValueLabel);
        sliderContainer.appendChild(this.currentValueLabel);

        this.container.appendChild(sliderContainer);
    }

    updateValue(newValue) {
        this.value = newValue;
        this.currentValueLabel.textContent = newValue;
    }
}
