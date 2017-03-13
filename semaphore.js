function Semaphore (init) {
 var semaphore = this
 semaphore.max_active_default = init.max_active_default
 semaphore.max_active         = init.max_active
 var queue = {}
 var run_count = {}
 semaphore.add = function () {add.apply(null, arguments)}
 
 function add (function_name, function_object) {
  if (typeof queue[function_name] == "undefined") {queue[function_name] = []; run_count[function_name] = 0}
  var subqueue = queue[function_name]
  
  // Is the run count at the max active count? If so, add the function to the queue.
  // Otherwise, run it.
  var args =  Array.prototype.slice.call(arguments)
  var semaphore_fragment = {complete: function () {complete (this, function_name)}}
  args.shift (); args.shift ()
  args.unshift (semaphore_fragment)
  
  var max_active = (typeof semaphore.max_active[function_name] != "undefined") ? semaphore.max_active[function_name] : ((typeof semaphore.max_active_default != "undefined") ? semaphore.max_active_default : 10)
  
  if (run_count[function_name] == max_active) {
   subqueue.push ([function_object, args])
  } else {
   run_function (function_object, function_name, undefined, args)
  }
  return semaphore_fragment
 }
 
 function complete (semaphore_fragment, function_name) {
  run_count[function_name] -= 1
  var subqueue = queue[function_name]; if (subqueue.length == 0) return
  run_function (subqueue[0][0], function_name, semaphore_fragment.index, subqueue[0][1])
  subqueue.shift ()
 }
 
 function run_function (function_object, function_name, index, args) {
  run_count[function_name] += 1
  var semaphore_fragment = args[0]; semaphore_fragment.index = ((typeof index != "undefined") ? index : (run_count[function_name] - 1))
  function_object.apply (null, args)
 }
}

if ((typeof module === "object") && module.exports) module.exports = Semaphore
