"use strict";

{
  //計算機入力更新
  class Update {
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

  const updateInstance = new Update();

  //ローカルストレージ関連
  class MotoData {
    constructor() {
      this.savedDataSelect = document.getElementById('savedData');
      this.saveBtn = document.getElementById('save-btn');
      this.loadBtn = document.getElementById('load');
      this.dataDeleteBtn = document.getElementById('delete');
      this.inputs = ['moto-name', 'rpm', 'primary', 'secondary', 'sprocketF', 'sprocketR', 'tireWidth', 'aspectRatio', 'inch', 'ratio1', 'ratio2', 'ratio3', 'ratio4', 'ratio5', 'ratio6'];
      this.init();
    }

    init() {
      this.saveBtn.addEventListener('click', () => this.saveData());
      this.dataDeleteBtn.addEventListener('click', () => this.dataDelete());
      this.loadBtn.addEventListener('click', () => this.loadSavedData());
      this.addSavedData();
    }

    //ローカルストレージに保存
    saveData() {
      const motoName = document.getElementById('moto-name').value.trim();

      if (motoName !== '') {
        const motoToSave = this.inputMotoData();
        localStorage.setItem(motoName, JSON.stringify(motoToSave));
        this.addSavedData();
        alert('保存済み数値"に保存されました')
      } else {
        alert('車名を入力してください');
      }
    }

    //calcのinputの値取得
    inputMotoData() {
      return this.inputs.map(input => document.getElementById(input).value);
    }

    //selectに追加表示
    addSavedData() {
      this.savedDataSelect.innerHTML = '<option hidden>--選択してください--</option>';
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = key;
        this.savedDataSelect.appendChild(option);
      });
    }

    //保存データ読み込み
    loadSavedData() {
      const selectkey = this.savedDataSelect.value;
      this.loadSavedDataIntoInputs(selectkey);
    }

    loadSavedDataIntoInputs(key) {
      const saveedString = localStorage.getItem(key);
      const restoredValues = JSON.parse(saveedString);
      if (saveedString === null) {
        window.alert('数値を選択してください。');
        return
      }
      this.inputs.forEach((input, index) => {
        document.getElementById(input).value = restoredValues[index] || '';
        updateInstance.inputUpdate();
      });
    }

    //データ削除
    dataDelete() {
      const selectKey = this.savedDataSelect.value;
      if (this.savedDataSelect.selectedIndex === 0) {
        window.alert('削除する数値を選択してください。');
        return
      } else if (window.confirm(`${selectKey}を削除しますか?`)) {
        localStorage.removeItem(selectKey);
        this.addSavedData();
      }
    }
  }

  new MotoData();


  class CalcTopSpeed {
    constructor() {
      this.rpm = parseFloat(document.getElementById('rpm').value.trim());
      this.sprocketF = parseFloat(document.getElementById('sprocketF').value.trim());
      this.sprocketR = parseFloat(document.getElementById('sprocketR').value.trim());
      this.primary = parseFloat(document.getElementById('primary').value);
      this.secondary = parseFloat(document.getElementById('secondary').value);
      this.tireWidth = parseFloat(document.getElementById('tireWidth').value);
      this.aspectRatio = parseFloat(document.getElementById('aspectRatio').value);
      this.inch = parseFloat(document.getElementById('inch').value);
      this.tableResult1 = document.getElementById('table-result1');
      this.tableResult2 = document.getElementById('table-result2');
      this.calcBtn = document.getElementById('calc-btn');
      this.resetBtn = document.getElementById('reset-btn');
      this.targetTableId = this.calcBtn.getAttribute('data-target');
      this.changeTarget();
      this.calcButonScroll();
    }

    //スプロケットの丁数
    sprockets() {
      if (this.sprocketF !== '' && this.sprocketR !== '' && !isNaN(this.sprocketF) && !isNaN(this.sprocketR)) {
        return Math.floor((this.sprocketR / this.sprocketF) * 1000) / 1000;
      } else {
        return;
      }
    }

    //総減速比
    overallGearRatio() {
      const ratios = [];
      for (let gear = 1; gear <= 6; gear++) {
        const ratio = parseFloat(document.getElementById('ratio' + gear).value.trim());
        if (this.sprocketF !== '' && this.sprocketR !== '' && !isNaN(this.sprocketF) && !isNaN(this.sprocketR)) {
          ratios.push(this.primary * this.sprockets() * ratio);
        } else {
          ratios.push(this.primary * this.secondary * ratio);
        }
      }
      return ratios;
    }

    //タイヤの外径
    outerDiameter() {
      const thickness = this.tireWidth * (this.aspectRatio / 100) * 2;
      const wheel = (this.inch * 2.54) * 10;

      return thickness + wheel;
    }


    //トップスピード
    topSpeed(target) {
      const overallRatios = this.overallGearRatio();
      const motoName = document.getElementById('moto-name').value;

      for (let gear = 1; gear <= 6; gear++) {

        const nonRatio = document.getElementById('ratio' + gear).value.trim();

        const t = Math.floor(this.rpm / overallRatios[gear - 1] * this.outerDiameter() * Math.PI * 60 / 1000000);
        const resultGear = document.getElementById(`result${target}-gear` + gear);
        if (gear === gear && nonRatio === '') {
          resultGear.textContent = '';
        } else {
          setTimeout(() => {
            resultGear.textContent = `${t}km/h`;
            document.getElementById(`base${target}-rpm`).textContent = `${this.rpm}`;
            document.getElementById(`moto-name-value${target}`).textContent = motoName;
          }, 1000);
        }
      }
      this.otherTopSpeed();
    }

    //±500rpm,±1000rpm
    otherRpm(offset) {
      const rpmOffsets = [offset];
      const adjustedRpm = this.rpm + rpmOffsets.reduce((sum, currentOffset) => sum + currentOffset, 0);
      return adjustedRpm;
    }

    otherRpmSetValue(offset, label, target) {

      for (let gear = 1; gear <= 6; gear++) {
        const nonRatio = document.getElementById('ratio' + gear).value.trim();
        const result1Gear = document.getElementById(`${label}-${target}-gear` + gear);

        const adjustedRpm = this.otherRpm(offset);
        const overallGearRatios = this.overallGearRatio();
        const outerDiameter = this.outerDiameter();
        const adjustedRpmTopSpeed = Math.floor(adjustedRpm / overallGearRatios[gear - 1] * outerDiameter * Math.PI * 60 / 1000000);
        if (gear === gear && nonRatio === '') {
          result1Gear.textContent = '';
        } else {
          setTimeout(() => {
            document.getElementById(`${label}-${target}-gear` + gear).textContent = `${adjustedRpmTopSpeed}km/h`;
            document.getElementById(`${label}-${target}`).textContent = `${adjustedRpm}`;
          }, 1000);
        }
      }
    }

    //計算結果表示先ターゲット
    changeTarget() {
      if (this.targetTableId === 'table-result1') {
        this.topSpeed(1);
      } else if (this.targetTableId === 'table-result2') {
        this.topSpeed(2);
      }
    }

    otherTopSpeed() {
      let target;
      if (this.targetTableId === 'table-result1') {
        target = '1';
      } else if (this.targetTableId === 'table-result2') {
        target = '2';
      }

      this.otherRpmSetValue(500, 'plus500', target);
      this.otherRpmSetValue(1000, 'plus1000', target);
      this.otherRpmSetValue(-500, 'minus500', target);
      this.otherRpmSetValue(-1000, 'minus1000', target);
    }

    //計算ボタンクリック後スクロール
    calcButonScroll() {
      if (this.targetTableId === 'table-result1') {
        this.tableResult1.scrollIntoView({ behavior: 'smooth' });
      } else if (this.targetTableId === 'table-result2') {
        this.tableResult2.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }


  //計算機と結果関連のボタン（数値保存はMotoDataに有り）
  class Buttons {
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
        resultSelect1.classList.remove('is-inactive');
      } else if (this.tableResult2.style.display === 'none') {
        this.changeTarget1();
        this.resultSelectMessage1.style.display = 'none';
        this.tableResult1.classList.remove('select');
        this.tr1R.forEach(element => {
          element.classList.remove('select');
        });
        this.tr1Last.classList.remove('select');
        this.resultSelect1.disabled = true;
        resultSelect1.classList.add('is-inactive');
        this.resultDisplayTarget1.style.display = 'none';
        this.resultDisplayTarget2.style.display = 'none';
      }
    }
  }


  // 結果ハイライト
  class Highlight {
    constructor() {
      this.trElements1 = document.querySelectorAll('.tr1');
      this.trElements2 = document.querySelectorAll('.tr2');
      this.highlight();
    }

    highlight() {
      this.trElements1.forEach((tr1) => {
        tr1.addEventListener('click', () => {
          tr1.querySelectorAll('td, th').forEach((child) => {
            child.classList.toggle('highlight');
          });
        });
      });

      this.trElements2.forEach((tr2) => {
        tr2.addEventListener('click', () => {
          tr2.querySelectorAll('td, th').forEach((child) => {
            child.classList.toggle('highlight');
          });
        });
      });
    }
  }

  new Highlight();

  //アニメーション
  class Animation {
    constructor() {
      this.loadingImg1 = document.getElementById('loading-img1');
      this.loadingImg2 = document.getElementById('loading-img2');
      this.whiteLoading1 = document.getElementById('white-loading1')
      this.whiteLoading2 = document.getElementById('white-loading2');
      this.dataTarget = calcBtn.getAttribute('data-target');
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

  /*------------------------------------------------------------------------------------------------------- */
  /*------------------------------------------------------------------------------------------------------- */

  const tableContents = {
    table: 'table',
    tableResult2: 'table-result2',
    resultSelect1: 'result-select1',
    resultSelect2: 'result-select2',
    resultReset1: 'result-reset1',
    resultReset2: 'result-reset2',
    fukidashiResult1: 'fukidashi-result1',
    fukidashiResult2: 'fukidashi-result2',
    resultSelectMessage1: 'result-select-message1',
    resultSelectMessage2: 'result-select-message2',
    whiteLoading2: 'white-loading2',
    loadingImg2: 'loading-img2',
    compareBtn: 'compare-btn',
    compareOpen: 'compare-open',
    compareClose: 'compare-close',
    calcBtn: 'calc-btn',
    resetBtn: 'reset-btn',
    resultButtons2: 'result-buttons2',
    resultDisplayTarget1: 'result-display-target1',
    resultDisplayTarget2: 'result-display-target2',
  };

  const compareBtn = document.getElementById(tableContents.compareBtn);
  // const table = document.getElementById(tableContents.table);
  const tableResult2 = document.getElementById(tableContents.tableResult2);
  const resultSelect1 = document.getElementById(tableContents.resultSelect1);
  const resultSelect2 = document.getElementById(tableContents.resultSelect2);
  const resultReset1 = document.getElementById(tableContents.resultReset1);
  const resultReset2 = document.getElementById(tableContents.resultReset2);
  const fukidashiResult1 = document.getElementById(tableContents.fukidashiResult1);
  const fukidashiResult2 = document.getElementById(tableContents.fukidashiResult2);
  const resultSelectMessage1 = document.getElementById(tableContents.resultSelectMessage1);
  const resultSelectMessage2 = document.getElementById(tableContents.resultSelectMessage2);
  const calcBtn = document.getElementById(tableContents.calcBtn);
  const resetBtn = document.getElementById(tableContents.resetBtn);
  const compareOpen = document.getElementById(tableContents.compareOpen);
  const compareClose = document.getElementById(tableContents.compareClose);
  const whiteLoading2 = document.getElementById(tableContents.whiteLoading2);
  const loadingImg2 = document.getElementById(tableContents.loadingImg2);
  const resultButtons2 = document.getElementById(tableContents.resultButtons2);
  const resultDisplayTarget1 = document.getElementById(tableContents.resultDisplayTarget1);
  const resultDisplayTarget2 = document.getElementById(tableContents.resultDisplayTarget2);


  //初期表示設定(非表示)
  const hidden = [
    tableResult2,
    resultSelect2,
    resultReset2,
    fukidashiResult2,
    resultButtons2,
    resultSelectMessage1,
    resultSelectMessage2,
    whiteLoading2,
    loadingImg2,
    compareClose,
    resultDisplayTarget1,
    resultDisplayTarget2,
  ];
  hidden.forEach(element => {
    element.style.display = 'none';
  });

  //初期表示設定(表示)
  const displayed = [
    fukidashiResult1,
    compareOpen,
  ];
  displayed.forEach(element => {
    element.style.display = 'block';
  });


  /*----------------------------計算ボタン・リセット---------------------------------- */
  new Update();

  calcBtn.addEventListener('click', () => {
    new CalcTopSpeed();
    new Animation();
  });
  resetBtn.addEventListener('click', () => {
    const form = document.getElementById('calc');
    form.reset();
    new Update();
  });
  /*----------------------------計算結果---------------------------------- */
  const buttons = new Buttons();
  resultSelect1.disabled = true;
  resultSelect1.classList.add('is-inactive');

  //結果１
  resultSelect1.addEventListener('click', () => {
    buttons.changeTarget1();
  });
  resultReset1.addEventListener('click', () => {
    buttons.resultReset(1);
  });

  //結果２
  resultSelect2.addEventListener('click', () => {
    buttons.changeTarget2();
  });
  resultReset2.addEventListener('click', () => {
    buttons.resultReset(2);
  });

  //比較ボタン
  compareBtn.addEventListener('click', () => {
    buttons.compareBtn();
  });
}