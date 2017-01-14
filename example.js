function make_granolas (complete, n, a) {
 console.log ("Producing granola " + (n + 1))
 setTimeout (function () {
  console.log ("Granola " + (n + 1) + " produced.")
 .complete ()
 }, parseInt(Math.random() * 20000 + 5000))
}

function make_fruit_tarts (complete, n, a) {
 console.log ("Producing fruit tart " + (n + 1))
 setTimeout (function () {
  console.log ("Fruit tart " + (n + 1) + " produced.")
  complete ()
 }, parseInt(Math.random() * 10000 + 2500))
}

// queue.add (function_name, function, params)
// queue.complete ()
      
var pastry_line = new AssemblyLine ({max_active: 5})

for (var i = 0; i < 20; i++) {
 pastry_line.add ("granolas"   , make_granolas   , i, 5)
 pastry_line.add ("fruit_tarts", make_fruit_tarts, i, 6)
}
