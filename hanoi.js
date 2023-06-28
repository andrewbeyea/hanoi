// Towers of Hanoi:
// There are 3 towers. The first tower has rings stacked around it, arranged from largest on the bottom to the smallest on the top. 
// The task is to move all the rings from tower 1 to tower 3, one ring at a time. No larger ring may sit atop a smaller ring. 
var towers = [
            {name: 'Tower 1',stack:[]},
            {name: 'Tower 2',stack:[]},
            {name: 'Tower 3',stack:[]}
        ];
var moveCount = 0;
const textMain = document.getElementById('moveLog');
const textT1 = document.getElementById('tower1');
const textT2 = document.getElementById('tower2');
const textT3 = document.getElementById('tower3');


// configure() adds ringCount of rings to Tower 1
const configure = (ringCount) => {
    if(ringCount > 0) {
        //reset first
        towers = [
            {name: 'Tower 1',stack:[]},
            {name: 'Tower 2',stack:[]},
            {name: 'Tower 3',stack:[]}
        ];
        moveCount = 0;
        // add new set
        for (i=0; i<ringCount; i++){
            towers[0].stack.push(i+1);
        }
        iterate(`<button id="start" onClick="launch(${towers[0].stack.length},1,3)">Start Game</>`);
    } else {
        alert('Please enter a number > 0');
    }
}

// iterate(text) updates the  HTML divs for moveLog and each tower
const iterate = (text) => {
    textMain.innerHTML = text;
    textT1.innerHTML = `Tower 1: ${towers[0].stack}`;
    textT2.innerHTML = `Tower 2: ${towers[1].stack}`;
    textT3.innerHTML = `Tower 3: ${towers[2].stack}`;
}

// moveIt(source, destination) moves the top ring from source to destination
const moveIt = (source, destination) => {
    moveCount ++;
    let ring = towers[source -1].stack.shift();
    towers[destination - 1].stack.unshift(ring);
    iterate(`Move ${moveCount}: Ring ${ring} moved from ${towers[source - 1].name} to ${towers[destination-1].name}<br>${textMain.innerHTML}`);
}

// hanoi(count,start,end) moves count of rings from start to end 
const hanoi = (count, start, end) => {
    if(count === 1){
        moveIt(start,end);
    } else {
        //define 'other' tower
        let other = 0;
        other = (6 - (start + end)); 

        // use a (n-1) solution to solve for n
        hanoi((count - 1), start, other);
        moveIt(start, end);
        hanoi((count - 1), other, end);
    }
}

// launch(count,start,end) removes the Start Game button and kicks off the recursive loop
const launch = (count,start,end) => {
    textMain.innerHTML = '';
    hanoi(count,start,end);
}