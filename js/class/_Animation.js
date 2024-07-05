
//アニメーション
export class Animation {
  constructor() {
    this.loadingImg1 = document.getElementById('loading-img1');
    this.loadingImg2 = document.getElementById('loading-img2');
    this.whiteLoading1 = document.getElementById('white-loading1')
    this.whiteLoading2 = document.getElementById('white-loading2');
    this.calcBtn = document.getElementById('calc-btn');
    this.dataTarget = this.calcBtn.getAttribute('data-target');
    this.calcAnimation();
  }

  calcAnimation() {
    if (this.dataTarget === 'table-result1') {
      this.whiteLoading1.classList.add('appear');
      this.loadingImg1.classList.add('appear');
      setTimeout(() => {
        this.whiteLoading1.classList.remove('appear');
        this.loadingImg1.classList.remove('appear');
      }, 1000);
    } else if (this.dataTarget === 'table-result2') {
      this.whiteLoading2.style.display = 'block';
      this.loadingImg2.style.display = 'block';
      this.whiteLoading2.classList.add('appear');
      this.loadingImg2.classList.add('appear');
      setTimeout(() => {
        this.whiteLoading2.classList.remove('appear');
        this.loadingImg2.classList.remove('appear');
        this.whiteLoading2.style.display = 'none';
        this.loadingImg2.style.display = 'none';
      }, 1000);
    }
  }
}