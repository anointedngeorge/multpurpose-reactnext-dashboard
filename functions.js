function functionName (constant, boundary) {  
    console.log(`Multiplication table for ${constant}`);
    constant = constant;
    counter = 1;
    boundary = boundary;
    while (counter <= boundary) {
        result = constant * counter;
        console.log(`${constant} x ${counter} = ${result}`);
        counter ++;
    }
}
// functionName(2, 2);
// functionName(12, 12);

function welcome (studentName) {
    console.log(`Welcome ${studentName
        .charAt(0).toUpperCase()}${studentName.substring(1)}.`
    );
}

welcome("George")
welcome("chimaobi")
welcome("victor")