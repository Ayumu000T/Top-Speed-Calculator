"use strict";

{
  const calc = document.getElementById('calc');
  const calcBtn = document.getElementById('calc-btn');
  const resetBtn = document.getElementById('reset-btn');
  // const whiteLoading1 = document.getElementById('loading1');
  const whiteLoading2 = document.getElementById('white-loading2');
  // const loadingImg1 = document.getElementById('loading-img1');
  const loadingImg2 = document.getElementById('loading-img2');
  const table = document.getElementById('table');
  const tableResult1 = document.getElementById('table-result1');
  const tableResult2 = document.getElementById('table-result2');
  const fukidashiResult1 = document.getElementById('fukidashi-result1');
  const fukidashiResult2 = document.getElementById('fukidashi-result2');
  const resultReset1 = document.getElementById('result-reset1');
  const resultReset2 = document.getElementById('result-reset2');
  const resultSelect1 = document.getElementById('result-select1');
  const resultSelect2 = document.getElementById('result-select2');
  const compareBtn = document.getElementById('compare-btn');
  const compareOpen = document.getElementById('compare-open');
  const compareClose = document.getElementById('compare-close');
  const resultSelectMessage1 = document.getElementById('result-select-message1');
  const resultSelectMessage2 = document.getElementById('result-select-message2');
  const resultButtons2 = document.querySelector('.result-buttons2');
  const resultDisplayTarget1 = document.getElementById('result-display-target1');
  const resultDisplayTarget2 = document.getElementById('result-display-target2');
  const trElements1 = document.querySelectorAll('.tr1');
  const trElements2 = document.querySelectorAll('.tr2');



  //ページ読み込み時
  tableResult2.style.display = 'none';
  fukidashiResult1.style.display = 'block';
  fukidashiResult2.style.display = 'none';
  whiteLoading2.style.display = 'none';
  loadingImg2.style.display = 'none';
  resultReset2.style.display = 'none';
  resultSelect2.style.display = 'none';
  compareOpen.style.display = 'block';
  compareClose.style.display = 'none';
  resultSelectMessage1.style.display = 'none';
  resultSelectMessage2.style.display = 'none';
  resultButtons2.style.display = 'none';
  calcBtn.disabled = true;
  calcBtn.classList.add('is-inactive');
  resultSelect1.disabled = true;
  resultSelect1.classList.add('is-inactive');



  calc.addEventListener('input', update);
  calc.addEventListener('change', update);
  resetBtn.addEventListener('click', reset);


  //計算ボタン
  calcBtn.addEventListener('click', () => {
    table.scrollIntoView({ behavior: 'smooth' });
    targetTableResults();
    allGears();
  });


  //計算結果の表示先の選択
  resultSelect1.addEventListener('click', () => {
    calcBtn.setAttribute('data-target', 'table-result1');
    tableResult1.classList.add('select');
    tableResult2.classList.remove('select');
    resultSelectMessage1.style.display = 'block'
    resultSelectMessage2.style.display = 'none'
    resultDisplayTarget1.classList.add('appear');
    resultDisplayTarget2.classList.remove('appear');
  });
  resultSelect2.addEventListener('click', () => {
    calcBtn.setAttribute('data-target', 'table-result2');
    tableResult1.classList.remove('select');
    tableResult2.classList.add('select');
    resultSelectMessage1.style.display = 'none'
    resultSelectMessage2.style.display = 'block'
    resultDisplayTarget2.classList.add('appear');
    resultDisplayTarget1.classList.remove('appear');
  });


  //計算中GIFアニメ等の表示の選択
  function targetTableResults() {
    const calcBtn = document.getElementById('calc-btn');
    const dataTarget = calcBtn.getAttribute('data-target');
    const loadingImg1 = document.getElementById('loading-img1');
    const whiteLoading1 = document.getElementById('white-loading1')
    const whiteLoading2 = document.getElementById('white-loading2');
    const loadingImg2 = document.getElementById('loading-img2');

    if (dataTarget === 'table-result1') {
      whiteLoading1.classList.add('appear');
      loadingImg1.classList.add('appear');
      setTimeout(() => {
        whiteLoading1.classList.remove('appear');
        loadingImg1.classList.remove('appear');
      }, 1000);
    } else if (dataTarget === 'table-result2') {
      whiteLoading2.style.display = 'block';
      loadingImg2.style.display = 'block';
      whiteLoading2.classList.add('appear');
      loadingImg2.classList.add('appear');

      setTimeout(() => {
        whiteLoading2.classList.remove('appear');
        loadingImg2.classList.remove('appear');
      }, 1000);
    }
  }

  // 結果ハイライト
  trElements1.forEach((tr1) => {
    tr1.addEventListener('click', () => {
      tr1.classList.toggle('highlight');
    });
  });
  trElements2.forEach((tr2) => {
    tr2.addEventListener('click', () => {
      tr2.classList.toggle('highlight');
    });
  });


  //計算機入力更新
  function update() {
    const isRequired = calc.checkValidity();
    const ratioInputs = document.querySelectorAll('[id^="ratio"]');
    const calcBtn = document.getElementById('calc-btn');
    const resetBtn = document.getElementById('reset-btn');

    const oneInputValue = Array.prototype.some.call(ratioInputs, (input) => {
      return input.value.trim() !== '' && !isNaN(parseFloat(input.value));
    });

    calcBtn.classList.remove('is-inactive', 'is-active');

    if (isRequired && oneInputValue) {
      calcBtn.disabled = false;
      calcBtn.classList.add('is-active');
      return
    } else {
      calcBtn.disabled = true;
      calcBtn.classList.add('is-inactive');
    }

    resetBtn.addEventListener('click', () => {
      calcBtn.classList.remove('is-active');
      calcBtn.disabled = true;
    });
  }


  //計算機リセットボタン
  function reset() {
    const form = document.getElementById('calc');
    form.reset();
    update();
  }

  //結果リセットボタン
  const rapmOffsetsReset = [500, 1000];

  resultReset1.addEventListener('click', () => {
    document.getElementById('moto-name-value1').textContent = '';
    for (let gear = 1; gear <= 6; gear++) {
      document.getElementById('result1-gear' + gear).textContent = '';
      document.getElementById('base1-rpm').textContent = '---?---';

      rapmOffsetsReset.forEach(offsetReset => {
        document.getElementById(`minus${offsetReset}-1-gear` + gear).textContent = '';
        document.getElementById(`plus${offsetReset}-1-gear` + gear).textContent = '';
        document.getElementById(`minus${offsetReset}-1`).textContent = `-${offsetReset}`;
        document.getElementById(`plus${offsetReset}-1`).textContent = `+${offsetReset}`;
      });
    }
    trElements1.forEach((tr1) => {
      tr1.classList.remove('highlight');
    });
  });

  resultReset2.addEventListener('click', () => {
    document.getElementById('moto-name-value2').textContent = '';
    for (let gear = 1; gear <= 6; gear++) {
      document.getElementById('result2-gear' + gear).textContent = '';
      document.getElementById('base2-rpm').textContent = '---?---';

      rapmOffsetsReset.forEach(offsetReset => {
        document.getElementById(`minus${offsetReset}-2-gear` + gear).textContent = '';
        document.getElementById(`plus${offsetReset}-2-gear` + gear).textContent = '';
        document.getElementById(`minus${offsetReset}-2`).textContent = `-${offsetReset}`;
        document.getElementById(`plus${offsetReset}-2`).textContent = `+${offsetReset}`;
      });
    }
    trElements2.forEach((tr2) => {
      tr2.classList.remove('highlight');
    });
  });


  //比較ボタン
  compareBtn.addEventListener('click', () => {
    if (tableResult2.style.display === 'block') {
      tableResult1.classList.remove('select');
      tableResult2.classList.remove('select');
      calcBtn.setAttribute('data-target', 'table-result1');
    } else if (tableResult2.style.display === 'none') {
      tableResult2.classList.add('select');
      calcBtn.setAttribute('data-target', 'table-result2');
    }


    resultSelect1.disabled = !resultSelect1.disabled;
    resultSelect1.classList.toggle('is-inactive');

    const tableResult2Display = getComputedStyle(tableResult2).display;
    const fukidashiResult1Display = getComputedStyle(fukidashiResult1).display;
    const fukidashiResu2t1Display = getComputedStyle(fukidashiResult2).display;
    const resultReset2Display = getComputedStyle(resultReset2).display;
    const resultSelect2Display = getComputedStyle(resultSelect2).display;
    const compareOpenDisplay = getComputedStyle(compareOpen).display;
    const compareCloseDisplay = getComputedStyle(compareClose).display;
    const resultButtons2Display = getComputedStyle(resultButtons2).display;
    const whiteLoading2Display = getComputedStyle(whiteLoading2).display;
    const loadingImg2Display = getComputedStyle(loadingImg2).display;


    tableResult2.style.display = tableResult2Display === 'none' ? 'block' : 'none';
    fukidashiResult1.style.display = fukidashiResult1Display === 'block' ? 'none' : 'block';
    fukidashiResult2.style.display = fukidashiResu2t1Display === 'none' ? 'block' : 'none';
    resultReset2.style.display = resultReset2Display === 'none' ? 'block' : 'none';
    resultSelect2.style.display = resultSelect2Display === 'none' ? 'block' : 'none';
    compareOpen.style.display = compareOpenDisplay === 'block' ? 'none' : 'block';
    compareClose.style.display = compareCloseDisplay === 'block' ? 'none' : 'block';
    resultButtons2.style.display = resultButtons2Display === 'none' ? 'flex' : 'none';
    whiteLoading2.style.display = whiteLoading2Display === 'none' ? 'block' : 'none';
    loadingImg2.style.display = loadingImg2Display === 'none' ? 'block' : 'none';

    if (tableResult2.style.display === 'block') {
      resultSelectMessage2.style.display = 'block';
      resultDisplayTarget2.classList.add('appear');
    } else if (tableResult2.style.display === 'none') {
      resultSelectMessage1.style.display = 'none';
      resultSelectMessage2.style.display = 'none';
    }

    if (tableResult2.style.display === 'block') {
      resultDisplayTarget2.classList.add('appear');
    } else if (tableResult2.style.display === 'none') {
      resultDisplayTarget1.classList.remove('appear');
      resultDisplayTarget2.classList.remove('appear');
    }

    if (tableResult2.style.display === 'block') {
      tableResult1.scrollIntoView({ behavior: 'smooth' });
    } else if (tableResult2.style.display === 'none') {
      calcBtn.scrollIntoView({ behavior: 'smooth' });
    }
  });


  //入力数値保存ローカル
  document.getElementById('save-btn').addEventListener('click', () => {
    const motoName = document.getElementById('moto-name').value;
    const rpm = document.getElementById('rpm').value;
    const primary = document.getElementById('primary').value;
    const secondary = document.getElementById('secondary').value;
    const sprocketF = document.getElementById('sprocketF').value;
    const sprocketR = document.getElementById('sprocketR').value;
    const tireWidth = document.getElementById('tireWidth').value;
    const aspectRatio = document.getElementById('aspectRatio').value;
    const inch = document.getElementById('inch').value;
    const ratio1 = document.getElementById('ratio1').value;
    const ratio2 = document.getElementById('ratio2').value;
    const ratio3 = document.getElementById('ratio3').value;
    const ratio4 = document.getElementById('ratio4').value;
    const ratio5 = document.getElementById('ratio5').value;
    const ratio6 = document.getElementById('ratio6').value;

    const motoToSave = [
      motoName,
      rpm,
      primary,
      secondary,
      sprocketF,
      sprocketR,
      tireWidth,
      aspectRatio,
      inch,
      ratio1,
      ratio2,
      ratio3,
      ratio4,
      ratio5,
      ratio6
    ];

    const balloon = document.getElementById('balloon');

    if (motoName.trim() !== '') {
      localStorage.setItem(motoName, JSON.stringify(motoToSave));
      loadSavedData();
      loadBtnActive();
      dataDeleteBtnActive();
      balloon.classList.add('appear');
      setTimeout(() => {
        balloon.classList.remove('appear');
      }, 2500);
    } else {
      alert('車名を入力してください')
    }
  });

  //ドロップダウンリストに表示
  function loadSavedData() {
    const savedDataSelect = document.getElementById('savedData');
    savedDataSelect.innerHTML = '<option hidden>--選択してください--</option > ';
    const keys = Object.keys(localStorage);

    keys.forEach((key) => {
      const option = document.createElement('option');
      option.value = key;
      option.textContent = key;
      savedDataSelect.appendChild(option);
    });
  }


  //数値読み込み再配置
  function loadDataIntoInputs(key) {
    const savedString = localStorage.getItem(key);
    const restoredNumbers = JSON.parse(savedString);

    if (savedString === null) {
      return
    } else {
      document.getElementById('moto-name').value = restoredNumbers[0] || '';
      document.getElementById('rpm').value = restoredNumbers[1] || '';
      document.getElementById('primary').value = restoredNumbers[2] || '';
      document.getElementById('secondary').value = restoredNumbers[3] || '';
      document.getElementById('sprocketF').value = restoredNumbers[4] || '';
      document.getElementById('sprocketR').value = restoredNumbers[5] || '';
      document.getElementById('tireWidth').value = restoredNumbers[6] || '';
      document.getElementById('aspectRatio').value = restoredNumbers[7] || '';
      document.getElementById('inch').value = restoredNumbers[8] || '';
      document.getElementById('ratio1').value = restoredNumbers[9] || '';
      document.getElementById('ratio2').value = restoredNumbers[10] || '';
      document.getElementById('ratio3').value = restoredNumbers[11] || '';
      document.getElementById('ratio4').value = restoredNumbers[12] || '';
      document.getElementById('ratio5').value = restoredNumbers[13] || '';
      document.getElementById('ratio6').value = restoredNumbers[14] || '';
    }
  }

  //読み込みボタン
  const load = document.getElementById('load');
  load.disabled = true;
  load.classList.add('is-inactive');
  document.addEventListener('DOMContentLoaded', () => {
    loadBtnActive();
    dataDeleteBtnActive();
    loadSavedData();
  });

  function loadBtnActive() {
    const keys = Object.keys(localStorage);
    const load = document.getElementById('load');
    load.classList.remove('is-active', 'is-inactive');

    if (keys.length > 0) {
      load.disabled = false;
      load.classList.add('is-active');
    } else {
      load.disabled = true;
      load.classList.add('is-inactive');
    }
  }

  load.addEventListener('click', () => {
    const savedDataSelect = document.getElementById('savedData');

    if (savedDataSelect.selectedIndex !== -1) {
      const selectedKey = savedDataSelect.value;
      loadDataIntoInputs(selectedKey);
      update();
    } else if (savedDataSelect.selectedIndex !== -1) {
      return
    }
  });

  loadSavedData();

  //削除ボタン
  const dataDelete = document.getElementById('delete');
  dataDelete.disabled = true;
  dataDelete.classList.add('is-inactive');
  dataDelete.addEventListener('click', () => {
    const savedDataSelect = document.getElementById('savedData');
    const selectKey = savedDataSelect.value;


    if (window.confirm(`"${selectKey}"を削除しますか？`)) {
      localStorage.removeItem(selectKey);
      loadBtnActive();
    } else {
      return
    }
    dataDeleteBtnActive();
  });

  function dataDeleteBtnActive() {
    const keys = Object.keys(localStorage);
    const dataDelete = document.getElementById('delete');
    dataDelete.classList.remove('is-active', 'is-inactive');

    if (keys.length > 0) {
      dataDelete.disabled = false;
      dataDelete.classList.add('is-active');
    } else {
      dataDelete.disabled = true;
      dataDelete.classList.add('is-inactive');
    }
    loadSavedData();
  }


  //最高速度の計算
  function allGears() {
    for (let gear = 1; gear <= 6; gear++) {
      topSpeed(gear);
    }
  };

  function topSpeed(gear) {

    //スプロケット丁数
    function sprockets() {
      const sprocketF = parseFloat(document.getElementById('sprocketF').value);
      const sprocketR = parseFloat(document.getElementById('sprocketR').value);

      return Math.floor((sprocketR / sprocketF) * 1000) / 1000;
    }

    //総減速比
    function overallGearRatio() {
      const primary = parseFloat(document.getElementById('primary').value);
      const secondary = parseFloat(document.getElementById('secondary').value);
      const ratio = parseFloat(document.getElementById('ratio' + gear).value);
      const sprocketF = document.getElementById('sprocketF').value.trim();
      const sprocketR = document.getElementById('sprocketR').value.trim();

      if (sprocketF !== '' && sprocketR !== '') {
        return primary * sprockets() * ratio;
      } else {
        return primary * secondary * ratio;
      }
    }

    //タイヤの外径
    function outerDiameter() {
      const tireWidth = parseFloat(document.getElementById('tireWidth').value);
      const aspectRatio = parseFloat(document.getElementById('aspectRatio').value);
      const inch = parseFloat(document.getElementById('inch').value);

      const thickness = tireWidth * (aspectRatio / 100) * 2;
      const wheel = (inch * 2.54) * 10;

      return thickness + wheel;
    }

    //トップスピード
    const rpm = parseFloat(document.getElementById('rpm').value);
    const ratio0 = document.getElementById('ratio' + gear).value.trim();
    const calcBtn = document.getElementById('calc-btn');
    const targetTableId = calcBtn.getAttribute('data-target');
    const tableResult1 = targetTableId === 'table-result1';
    const tableResult2 = targetTableId === 'table-result2';

    if (tableResult1) {
      calcForTable1();
    } else if (tableResult2) {
      calcForTable2();
    }

    function calcForTable1() {
      const motoName1 = document.getElementById('moto-name').value; //車名
      const t = Math.floor(rpm / overallGearRatio() * outerDiameter() * Math.PI * 60 / 1000000);
      const nonRatio = document.getElementById('ratio' + gear).value.trim();
      const result1Gear = document.getElementById('result1-gear' + gear);
      if (gear === gear && nonRatio === '') {
        result1Gear.textContent = '';
      } else {
        setTimeout(() => {
          document.getElementById('result1-gear' + gear).textContent = `${t}km/h`;
          document.getElementById('base1-rpm').textContent = `${rpm}`;
          document.getElementById('moto-name-value1').textContent = motoName1;
        }, 1000);
      }
    }

    function calcForTable2() {
      const motoName2 = document.getElementById('moto-name').value; //車名
      const t = Math.floor(rpm / overallGearRatio() * outerDiameter() * Math.PI * 60 / 1000000);
      const nonRatio = document.getElementById('ratio' + gear).value.trim();
      const result1Gear = document.getElementById('result2-gear' + gear);
      if (gear === gear && nonRatio === '') {
        result1Gear.textContent = '';
      } else {
        setTimeout(() => {
          document.getElementById('result2-gear' + gear).textContent = `${t}km/h`;
          document.getElementById('base2-rpm').textContent = `${rpm}`;
          document.getElementById('moto-name-value2').textContent = motoName2;
        }, 1000);
      }
    }

    //±500rpm,±1000rpm
    function otherRpm(offset) {
      const rpm = parseFloat(document.getElementById('rpm').value);
      const rpmOffsets = [offset];

      const adjustedRpm = rpm + rpmOffsets.reduce((sum, currentOffset) => sum + currentOffset, 0);
      return adjustedRpm;
    }


    function otherRpmSetValue(offset, label) {
      const adjustedRpm = otherRpm(offset);

      
      if (tableResult1) {
        const adjustedRpmTopSpeed = Math.floor(adjustedRpm / overallGearRatio() * outerDiameter() * Math.PI * 60 / 1000000);

        const nonRatio = document.getElementById('ratio' + gear).value.trim();
        const result1Gear = document.getElementById(`${label}-1-gear` + gear);

        if (gear === gear && nonRatio === '') {
          result1Gear.textContent = '';
        } else {
          setTimeout(() => {
            document.getElementById(`${label}-1-gear` + gear).textContent = `${adjustedRpmTopSpeed}km/h`;
            document.getElementById(`${label}-1`).textContent = `${adjustedRpm}`;
          }, 1000);
        }
      } else if (tableResult2) {
        const adjustedRpmTopSpeed = Math.floor(adjustedRpm / overallGearRatio() * outerDiameter() * Math.PI * 60 / 1000000);

        const nonRatio = document.getElementById('ratio' + gear).value.trim();
        const result1Gear = document.getElementById(`${label}-2-gear` + gear);

        if (gear === gear && nonRatio === '') {
          result1Gear.textContent = '';
        } else {
          setTimeout(() => {
            document.getElementById(`${label}-2-gear` + gear).textContent = `${adjustedRpmTopSpeed}km/h`;
            document.getElementById(`${label}-2`).textContent = `${adjustedRpm}`;
          }, 1000);
        }
      }
    }
    otherRpmSetValue(500, 'plus500');
    otherRpmSetValue(1000, 'plus1000');
    otherRpmSetValue(-500, 'minus500');
    otherRpmSetValue(-1000, 'minus1000');
  }
}
