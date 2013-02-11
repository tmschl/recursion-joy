var getElementsByClassName = function(className) {
  var nodeArray = [];
  // Breakdown case  
  var search = function(node) {
    //Base Case handled by length
    for(var i = 0; i < node.childNodes.length; i++){
      var childNode = node.childNodes[i];
      if(childNode.className && childNode.className.match(className)){
        nodeArray.push(childNode);
      } 
      search(childNode);
    } 
  }
  search(document.body);
  return nodeArray;
}