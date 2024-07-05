import { Update } from './Update.js';

const updateInstance = new Update();

//入力数値の保存
export class MotoData {
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