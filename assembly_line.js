function AssemblyLine (init) {
 var max_active = init.max_active
 var assembly_line = this
 var queue = {}
 var run_count = {}
 assembly_line.add = function (function_name, function_object) {add (function_name, function_object)}
 
 function add (function_name, function_object) {
  if (typeof queue[function_name]     == "undefined") {queue[function_name] = []; run_count[function_name] = 0}
  var subqueue = queue[function_name]
  
  // Is the run count at the max active count? If so, add the function to the queue.
  // Otherwise, run it.
  var args =  Array.prototype.slice.call(arguments)
  var subunit = {complete: function () {complete (function_name)}}
  args.shift (); args.shift ()
  args.splice (0, 0, subunit)
  if (run_count[function_name] == max_active) {
   subqueue.push ([function_object, args])
  } else {
   run_count[function_name] += 1
   function_object.apply (null, args)
  }
 }
 
 function complete (function_name) {
  run_count -= 1
  var subqueue = queue[function_name]; if (subqueue.length == 0) return
  var function_object = subqueue[0][0]
  var args            = subqueue[0][1]
  function_object.apply (null, args)
  subqueue.shift ()
 }
}

function make_granolas (line, n, a) {
 console.log ("Producing granola " + (n + 1))
 setTimeout (function () {
  console.log ("Granola " + (n + 1) + " produced.")
  line.complete ()
 }, parseInt(Math.random() * 20000 + 5000))
}

function make_fruit_tarts (line, n, a) {
 console.log ("Producing fruit tart " + (n + 1))
 setTimeout (function () {
  console.log ("Fruit tart " + (n + 1) + " produced.")
  line.complete ()
 }, parseInt(Math.random() * 10000 + 2500))
}

//////////

// queue.add (function_name, function, params)
// queue.complete ()
      
var pastry_line = new AssemblyLine ({max_active: 5})

for (var i = 0; i < 20; i++) {
 pastry_line.add ("granolas"   , make_granolas   , i, 5)
 pastry_line.add ("fruit_tarts", make_fruit_tarts, i, 6)
}
