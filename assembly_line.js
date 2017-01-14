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
  var run_complete_signal = function () {complete (function_name)}
  args.shift (); args.shift ()
  args.unshift (run_complete_signal)
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
