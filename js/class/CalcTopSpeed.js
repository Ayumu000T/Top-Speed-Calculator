

export class CalcTopSpeed {
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