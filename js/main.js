"use strict";

import { Update } from './class/Update.js';
import { MotoData } from './class/MotoData.js';
import { CalcTopSpeed } from './class/CalcTopSpeed.js';
import { Buttons } from './class/Buttons.js';
import { Highlight } from './class/Highlight.js';
import { Animation } from './class/Animation.js';

{
  // ID
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

  //tableContentsのkeyのidから要素を取得する関数
  function getElementByIds(ids) {
    const elements = {};
    for (const key in ids) {
      if (ids.hasOwnProperty(key)) {
        elements[key] = document.getElementById(ids[key]);
      }
    }
    return elements;
  }

  const elements = getElementByIds(tableContents);

  //初期表示設定(非表示)
  const hidden = [
    elements.tableResult2,
    elements.resultSelect2,
    elements.resultReset2,
    elements.fukidashiResult2,
    elements.resultButtons2,
    elements.resultSelectMessage1,
    elements.resultSelectMessage2,
    elements.whiteLoading2,
    elements.loadingImg2,
    elements.compareClose,
    elements.resultDisplayTarget1,
    elements.resultDisplayTarget2,
  ];
  hidden.forEach(element => {
    element.style.display = 'none';
  });

  //初期表示設定(表示)
  const displayed = [
    elements.fukidashiResult1,
    elements. compareOpen,
  ];
  displayed.forEach(element => {
    element.style.display = 'block';
  });


  new MotoData();
  new Highlight();

  /*----------------------------計算ボタン・リセット---------------------------------- */
  elements.calcBtn.addEventListener('click', () => {
    new CalcTopSpeed();
    new Animation();
  });
  elements.resetBtn.addEventListener('click', () => {
    const form = document.getElementById('calc');
    form.reset();
    new Update();
  });

  /*----------------------------計算結果---------------------------------- */
  const buttons = new Buttons();
  elements.resultSelect1.disabled = true;
  elements.resultSelect1.classList.add('is-inactive');

  //結果１
  elements.resultSelect1.addEventListener('click', () => {
    buttons.changeTarget1();
  });
  elements.resultReset1.addEventListener('click', () => {
    buttons.resultReset(1);
  });

  //結果２
  elements.resultSelect2.addEventListener('click', () => {
    buttons.changeTarget2();
  });
  elements.resultReset2.addEventListener('click', () => {
    buttons.resultReset(2);
  });

  //比較ボタン
  elements.compareBtn.addEventListener('click', () => {
    buttons.compareBtn();
  });
}