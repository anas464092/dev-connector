// finding id

const arr = [22, 43, 55, 643, 7435, 754];
const flag = arr.find((item) => item === 53) !== undefined;
console.log(flag);

// finding index
const brr = [33, 52, 3532, 7332, 743, 63];
const index = brr.findIndex((item) => item === 33);
console.log(index);
console.log(brr.length);

// removing element
if (index !== -1) {
    brr.splice(index, 1);
}
console.log(brr);
console.log(brr.length);
