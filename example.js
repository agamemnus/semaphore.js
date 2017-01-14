function make_granolas (line, n, a) {
 console.log ("Granola chef " + (line.index + 1) + " is producing granola " + (n + 1) + ".")
 setTimeout (function () {
  console.log ("Granola " + (n + 1) + " produced.")
  line.complete ()
 }, Math.random() * 20000 + 5000)
}

function make_fruit_tarts (line, n, a) {
 console.log ("Fruit tart chef " + (line.index + 1) + " is producing fruit tart " + (n + 1) + ".")
 setTimeout (function () {
  console.log ("Fruit tart " + (n + 1) + " produced.")
  line.complete ()
 }, Math.random() * 10000 + 2500)
}

//////////

// queue.add (function_name, function, params)
// queue.complete ()
      
var pastry_line = new AssemblyLine ({max_active: 5})

for (var i = 0; i < 20; i++) {
 pastry_line.add ("granolas"   , make_granolas   , i, 5)
 pastry_line.add ("fruit_tarts", make_fruit_tarts, i, 6)
}
