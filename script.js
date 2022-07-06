const grid = document.querySelector("#grid-table");

function createGrid(){
    for (let i = 0; i < 10; i++) {
        const rc = document.createElement("div");
        grid.appendChild(rc);
        rc.style.display='flex';
        rc.className='row';
        rc.style.width=`${25*10}px`;
        rc.style.height=`25px`;
        for (let j = 0; j < 10; j++) {
          const r = document.createElement("div");
          rc.appendChild(r);
          r.className='column';
          r.style.width='25px';
          r.style.height='25px';
        }
      }
}

createGrid();

const gridPixels = document.querySelectorAll('div.column');
gridPixels.forEach(pixel => pixel.addEventListener('mouseover', colorGrid));

function colorGrid(){
    this.style.backgroundColor='black';
}
