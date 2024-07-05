

// 結果ハイライト
export class Highlight {
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