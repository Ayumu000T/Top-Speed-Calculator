
//計算機入力更新
export class Update {
  constructor() {
    this.calc = document.getElementById('calc');
    this.isRequired = this.calc.checkValidity();
    this.ratioInputs = document.querySelectorAll('[id^="ratio"]');
    this.calcBtn = document.getElementById('calc-btn');
    this.resetBtn = document.getElementById('reset-btn');

    this.calc.addEventListener('input', () => this.inputUpdate());
    this.calc.addEventListener('change', () => this.inputUpdate());

    this.inputUpdate();
  }

  inputUpdate() {
    const oneInputValue = Array.prototype.some.call(this.ratioInputs, (input) => {
      return input.value.trim() !== '' && !isNaN(parseFloat(input.value));
    });

    this.isRequired = this.calc.checkValidity();

    this.calcBtn.classList.remove('is-inactive', 'is-active');

    if (this.isRequired && oneInputValue) {
      this.calcBtn.disabled = false;
      this.calcBtn.classList.add('is-active');
    } else {
      this.calcBtn.disabled = true;
      this.calcBtn.classList.add('is-inactive');
    }

    this.resetBtn.addEventListener('click', () => {
      this.calcBtn.classList.remove('is-active');
      this.calcBtn.disabled = true;
    });
  }
}