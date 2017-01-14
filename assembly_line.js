function AssemblyLine (init) {
 var max_active = init.max_active
 var assembly_line = this
 var queue = {}
 var run_count = {}
 assembly_line.add = function () {add.apply(null, arguments)}
 
 function add (function_name, function_object) {
  if (typeof queue[function_name] == "undefined") {queue[function_name] = []; run_count[function_name] = 0}
  var subqueue = queue[function_name]
  
  // Is the run count at the max active count? If so, add the function to the queue.
  // Otherwise, run it.
  var args =  Array.prototype.slice.call(arguments)
  var line = {complete: function () {complete (this, function_name)}}
  args.shift (); args.shift ()
  args.unshift (line)
  
  if (run_count[function_name] == max_active) {
   subqueue.push ([function_object, args])
  } else {
   run_function (function_object, function_name, undefined, args)
  }
 }
 
 function complete (line, function_name) {
  run_count[function_name] -= 1
  var subqueue = queue[function_name]; if (subqueue.length == 0) return
  run_function (subqueue[0][0], function_name, line.index, subqueue[0][1])
  subqueue.shift ()
 }
 
 function run_function (function_object, function_name, index, args) {
  run_count[function_name] += 1
  var line = args[0]; line.index = ((typeof index != "undefined") ? index : (run_count[function_name] - 1))
  function_object.apply (null, args)
 }
}
