/**
 * Created by haner on 16/4/11.
 *
 */

var Q = require('q');

function add(num){
    return num + num;
}


Q(2).then(add).then(add).then(add).then(add);

var funs = [add,add,add,add],
    q = Q(2);

funs.forEach(function(fun){
    q = q.then(fun);
});


funs.reduce(function(prev,current){
    return prev.then(current);
},Q(2));

var arr = [1,2,3,4];
var result = arr.reduce(function(pre,current){
    return pre + current;
},0);

console.info(result);


