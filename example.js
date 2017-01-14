// queue.add (function_name, function, params)
// queue.complete ()
      
var pastry_line = new AssemblyLine ({max_active: 5})

for (var i = 0; i < 20; i++) {
 pastry_line.add ("granolas"   , make_granolas   , i, 5)
 pastry_line.add ("fruit_tarts", make_fruit_tarts, i, 6)
}
