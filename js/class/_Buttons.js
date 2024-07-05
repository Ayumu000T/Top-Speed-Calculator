

//計算機と結果関連のボタン（数値保存はMotoDataに有り）
export class Buttons {
  constructor() {
    this.calcBtn = document.getElementById('calc-btn');
    this.resultSelect1 = document.getElementById('result-select1');
    this.resultSelect2 = document.getElementById('result-select2');
    this.resultReset2 = document.getElementById('result-reset2');
    this.resultButtons2 = document.getElementById('result-buttons2');
    this.tableResult1 = document.getElementById('table-result1');
    this.tableResult2 = document.getElementById('table-result2');
    this.fukidashiResult1 = document.getElementById('fukidashi-result1');
    this.fukidashiResult2 = document.getElementById('fukidashi-result2');
    this.resultSelectMessage1 = document.getElementById('result-select-message1');
    this.resultSelectMessage2 = document.getElementById('result-select-message2');
    this.compareOpen = document.getElementById('compare-open');
    this.compareClose = document.getElementById('compare-close');
    this.tr1R = document.querySelectorAll('.tr1-r');
    this.tr1Last = document.querySelector('.tr1-last');
    this.tr2R = document.querySelectorAll('.tr2-r');
    this.tr2Last = document.querySelector('.tr2-last');
    this.resultDisplayTarget1 = document.getElementById('result-display-target1');
    this.resultDisplayTarget2 = document.getElementById('result-display-target2');
  }

  //計算ボタンのターゲット変更(選択ボタン)
  changeTarget1() {
    this.calcBtn.setAttribute('data-target', 'table-result1');
    this.resultSelectMessage1.style.display = 'block';
    this.resultSelectMessage2.style.display = 'none';
    this.resultDisplayTarget1.style.display = 'block';
    this.resultDisplayTarget2.style.display = 'none';
    this.tableResult1.classList.add('select');
    this.tr1R.forEach(element => {
      element.classList.add('select');
    });
    this.tr2R.forEach(element => {
      element.classList.remove('select');
    });
    this.tr1Last.classList.add('select');
    this.tr2Last.classList.remove('select');
    this.tableResult2.classList.remove('select');
  }
  changeTarget2() {
    this.calcBtn.setAttribute('data-target', 'table-result2');
    this.resultSelectMessage1.style.display = 'none';
    this.resultSelectMessage2.style.display = 'block';
    this.tableResult1.classList.remove('select');
    this.tableResult2.classList.add('select');
    this.resultDisplayTarget1.style.display = 'none';
    this.resultDisplayTarget2.style.display = 'block';
    this.tr1R.forEach(element => {
      element.classList.remove('select');
    });
    this.tr1Last.classList.remove('select');
    this.tr2R.forEach(element => {
      element.classList.add('select');
    });
    this.tr2Last.classList.add('select');
  }

  //計算結果リセットボタン
  resultReset(target) {
    const rapmOffsetsReset = [500, 1000];
    document.getElementById(`moto-name-value${target}`).textContent = '';
    for (let gear = 1; gear <= 6; gear++) {
      document.getElementById(`result${target}-gear` + gear).textContent = '';
      document.getElementById(`base${target}-rpm`).textContent = '---?---';

      rapmOffsetsReset.forEach(offsetReset => {
        document.getElementById(`minus${offsetReset}-${target}-gear` + gear).textContent = '';
        document.getElementById(`plus${offsetReset}-${target}-gear` + gear).textContent = '';
        document.getElementById(`minus${offsetReset}-${target}`).textContent = `-${offsetReset}`;
        document.getElementById(`plus${offsetReset}-${target}`).textContent = `+${offsetReset}`;
      });
    }
    const trElements = document.querySelectorAll(`.tr${target}`);
    trElements.forEach((tr) => {
      tr.querySelectorAll('td, th').forEach((child) => {
        child.classList.remove('highlight');
      });
    });
  }

  //比較ボタン
  compareBtn() {

    const displayNone = {
      tableResult2: this.tableResult2,
      resultReset2: this.resultReset2,
      resultSelect2: this.resultSelect2,
      fukidashiResult2: this.fukidashiResult2,
    }

    const displayBlock = {
      compareClose: this.compareClose,
      compareOpen: this.compareOpen,
    }

    const displayFlex = {
      resultButtons2: this.resultButtons2,
    }

    Object.entries(displayNone).forEach(([elementName, element]) => {
      const computedStyle = getComputedStyle(element).display;
      element.style.display = computedStyle === 'none' ? 'block' : 'none';
    });

    Object.entries(displayBlock).forEach(([elementName, element]) => {
      const computedStyle = getComputedStyle(element).display;
      element.style.display = computedStyle === 'block' ? 'none' : 'block';
    });

    Object.entries(displayFlex).forEach(([elementName, element]) => {
      const computedStyle = getComputedStyle(element).display;
      element.style.display = computedStyle === 'none' ? 'flex' : 'none';
    });

    if (this.tableResult2.style.display === 'block') {
      this.changeTarget2();
      this.tableResult2.scrollIntoView({ behavior: 'smooth' });
      this.resultSelect1.disabled = false;
      this.resultSelect1.classList.remove('is-inactive');
    } else if (this.tableResult2.style.display === 'none') {
      this.changeTarget1();
      this.resultSelectMessage1.style.display = 'none';
      this.tableResult1.classList.remove('select');
      this.tr1R.forEach(element => {
        element.classList.remove('select');
      });
      this.tr1Last.classList.remove('select');
      this.resultSelect1.disabled = true;
      this.resultSelect1.classList.add('is-inactive');
      this.resultDisplayTarget1.style.display = 'none';
      this.resultDisplayTarget2.style.display = 'none';
    }
  }
}