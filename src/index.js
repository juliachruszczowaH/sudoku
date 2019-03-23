module.exports = function solveSudoku(matrix) {
    // your solution
    // const columns = 9;
    // const rows = 9;
    // const squareSide = 3;

    //numbers used to solve
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let initiallySolved = 0;
    let changed = 0;
    let sol = 0;
    //let rerun = true;

    const solved = {};
    //Sudoku that should be solved
    let sudoku = matrix;

    function findPossibleSolution(insertMatrix) {
        let ts = insertMatrix;

        changed = 0;


        ts = insertPossibleValues(ts);
        //initiallySolved = +sol;
        //let itr=sol;
        sol = 0;
        //console.log(ts)   ;

        if (initiallySolved+changed === 81) {
            initiallySolved=initiallySolved+changed;
            return ts;

        } else if (initiallySolved !== 81){
            let temp = ts;
            if (changed != 0) {
                // findPossibleSolution(temp);
            

            // console.log("Not solved");
            ts = rowPairs(temp);
            // console.log("AFTER PAIRS");
            // console.log(ts);
            ts = replaceUnresolvedWithZeroes(ts);
            // console.log("AFTER REPLACING")
            // console.log(ts);
                initiallySolved=0;
            ts=insertPossibleValues(ts);

            ts = columnPairs(ts);
            // console.log("AFTER column pairs");
            // console.log(ts);
            ts=findPossibleSolution(ts);
            }
            // return ts;


        }
        
        return ts;
    }

    function insertPossibleValues(matrix) {
        let ts = matrix;
        initiallySolved=0;
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                let cell = [i, j];
                if (ts[i][j] > 0 && ts[i][j].length===undefined) {
                    
                    solved[cell] = "set";
                    initiallySolved++;
                } else if(ts[i][j] > 0 && ts[i][j].length===1){
                    ts[i][j]=ts[i][j][0];
                } else {
                    let tmp = possibleVariants(ts, i, j);
                   // console.log(tmp.length);
                    if (tmp.length===0){
                        break;
                        console.log("incorrect solution")
                    } else
                    if (tmp.length == 1) {
                        ts[i][j] = tmp[0];
                        solved[cell] = "set";
                        changed++;
                        //rerun = true;
                    } else {
                        solved[cell] = tmp;
                        ts[i][j] = tmp;
                    }

                }
            }


        }
        return ts;
    }
    

    function replaceUnresolvedWithZeroes(matrix) {
        let ts = matrix;
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                // if (ts[i][j].length===1)
                let cell = [i, j];
                if (ts[i][j].length == 1) {
                    ts[i][j] = ts[i][j][0];
                    solved[cell] = "set";
                    changed++;
                    rerun = true;
                } else if (ts[i][j].length > 1) {
                    ts[i][j] = 0
                }
            }
        }
        return ts;
    }


    //function to find pairs

    function rowPairs(insertMatrix) {
        let ts = insertMatrix;
        // console.log("Pairs matrix row");
        // console.log(ts);
        for (let k = 0; k < 9; k++) {
            let certRow = [];
            for (let i = 0; i < 9; i++) {
                certRow.push(ts[k][i]);
            }
            // console.log(`certRow ${k}`);
            // console.log(certRow);
            let posPair = 0;
            let firstPairIndex = 0;
            let secondPairIndex = 0;
            let a = 0;
            let b = 0;
            for (let i = 0; i < 9; i++) {
                if (certRow[i].length == 2) {
                    posPair = certRow[i];
                    firstPairIndex = i;
                    a = certRow[i][0];
                    b = certRow[i][1];

                    // console.log("possible pair");
                    // console.log(posPair, firstPairIndex, a, b);
                    for (let d = i + 1; d < 9; d++) {
                        // console.log(`d -> ${d}`);
                        // console.log(`certRow[d].length ${certRow[d].length}`);

                        if (
                            certRow[d].length == 2 &&
                            (certRow[d][0] == posPair[0] || certRow[d][0] == posPair[1]) &&
                            (certRow[d][1] == posPair[0] || certRow[d][1] == posPair[1])
                        ) {
                            secondPairIndex = d;
                            // console.log("second possible pair");
                            // console.log(certRow[d], secondPairIndex);
                            for (let i = 0; i < 9; i++) {
                                if (certRow[i].length > 2) {
                                    // console.log(`certRow[i] ${certRow[i]}`);
                                    for (let m = 0; m < certRow[i].length; m++) {
                                        if (certRow[i].includes(a)) {
                                            certRow[i].splice(certRow[i].indexOf(a), 1);
                                        } else if (certRow[i].includes(b)) {
                                            certRow[i].splice(certRow[i].indexOf(b), 1);
                                        }
                                    }
                                } else if (
                                    certRow[i].length == 2 &&
                                    i != firstPairIndex &&
                                    i != secondPairIndex
                                ) {
                                    for (let m = 0; m < certRow[i].length; m++) {
                                        if (certRow[i][0] == a || certRow[i][0] == b) {
                                            certRow[i].splice(0, 1);
                                        } else if (certRow[i][1] == a || certRow[i][1] == b) {
                                            certRow[i].splice(1, 1);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                ts[k][i] = certRow[i];

            }
            // console.log(`CHANGED certRow ${k}`);
            // console.log(certRow);
        }
        // console.log("after ROW pairs");
        // console.log(ts);


        return ts;
    }

//     //---------------------------------------------
    function columnPairs(insertMatrix) {
        let ts = insertMatrix;

        for (let k = 0; k < 9; k++) {
            let certCol = [];

            for (let i = 0; i < 9; i++) {
                certCol.push(ts[i][k]);
            }
//       console.log(`certCol ${k}`);
// console.log(certCol);
            let posPair = 0;
            let firstPairIndex = 0;
            let secondPairIndex = 0;
            let a = 0;
            let b = 0;

            for (let i = 0; i < 9; i++) {
                if (certCol[i].length == 2) {
                    posPair = certCol[i];
                    firstPairIndex = i;
                    a = certCol[i][0];
                    b = certCol[i][1];

                    // console.log("possible pair");
                    // console.log(posPair, firstPairIndex, a, b);
                    for (let d = i + 1; d < 9; d++) {
                        // console.log(`d -> ${d}`);
                        // console.log(`certCol[d].length ${certCol[d].length}`);

                        if (
                            certCol[d].length == 2 &&
                            (certCol[d][0] == posPair[0] || certCol[d][0] == posPair[1]) &&
                            (certCol[d][1] == posPair[0] || certCol[d][1] == posPair[1])
                        ) {
                            secondPairIndex = d;
                            // console.log("second possible pair");
                            // console.log(certCol[d], secondPairIndex);
                            for (let i = 0; i < 9; i++) {
                                if (certCol[i].length > 2) {
                                    // console.log(`certCol[i] ${certCol[i]}`);
                                    for (let m = 0; m < certCol[i].length; m++) {
                                        if (certCol[i].includes(a)) {
                                            //console.log(certCol[i].indexOf(a));
                                            certCol[i].splice(certCol[i].indexOf(a), 1);
                                        } else if (certCol[i].includes(b)) {
                                            //console.log(certCol[i].indexOf(b));
                                            certCol[i].splice(certCol[i].indexOf(b), 1);
                                        }
                                    }
                                } else if (
                                    certCol[i].length == 2 &&
                                    i != firstPairIndex &&
                                    i != secondPairIndex
                                ) {
                                    for (let m = 0; m < certCol[i].length; m++) {
                                        if (certCol[i].includes(a)) {
                                            certCol[i].splice(certCol[i].indexOf(a), 1);
                                        } else if (certCol[i].includes(b)) {
                                            certCol[i].splice(certCol[i].indexOf(b), 1);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
//console.log(`changed col ${k}`);
//console.log(certCol);
            for (let i = 0; i < 9; i++) {
                ts[i][k] = certCol[i];
            }
        }
        //console.log("!!!-------->chnged columns ts");
        //console.log(ts);
        return ts;
    }

    //-----------------------------------------------
    //Function to find possible variants
    function possibleVariants(initialSudoku, x, y) {
        let pos = [];
        let currentRow = [];
        let currentCol = [];
        let currentSquare = [];
        let squareX = Math.floor(x / 3);
        let squareY = Math.floor(y / 3);
        for (let i = squareX * 3; i < squareX * 3 + 3; i++) {
            for (let j = squareY * 3; j < squareY * 3 + 3; j++) {
                currentSquare.push(initialSudoku[i][j]);
            }
        }
        for (let i = 0; i < 9; i++) {
            currentRow.push(initialSudoku[x][i]);
            currentCol.push(initialSudoku[i][y]);
        }

        for (let j = 0; j < numbers.length; j++) {
            if (
                !currentRow.includes(numbers[j]) &&
                !currentCol.includes(numbers[j]) &&
                !currentSquare.includes(numbers[j])
            ) {
                pos.push(numbers[j]);
            }
        }
        return pos;
    }

    let res = findPossibleSolution(sudoku, initiallySolved);
    console.log(res);
    console.log(solved);
    if (initiallySolved===81){
        return res;
    }
    else{
        let t=res;
        t=solveByVariants(t);
        
        function solveByVariants(insertMatrix){
            let tempSol=insertMatrix;
            if (initiallySolved===81){
                return tempSol;
            } else {
                
                console.log(initiallySolved);
                let a=findFirstUnresolved(solved);
                console.log(a);
                // let tempSol=res;
                let x=a[0];
                console.log(x);
                let y=a[1];
                console.log(y);
                tempSol[x][y]=solved[a][0];
                initiallySolved++;
                console.log(tempSol);
                tempsSol=replaceUnresolvedWithZeroes(tempSol)
                tempSol=findPossibleSolution(tempSol);
                console.log("__________________!!!!!!!!___________");
                console.log(tempSol);
                tempSol=solveByVariants(tempSol);
            }
           return tempSol;
        }
        return solveByVariants(t);
    }

    function findFirstUnresolved(solutions){
        let arr=solutions;
        let key=0;
        for (let i=0;i<9;i++){
            for(let j=0;j<9;j++){
                key=[i,j];
                if (arr[key]!=="set"){
                    return key;
                    break;
                }
            }

        }

    }

}
