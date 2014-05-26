
$(document).ready(function(){
  function handleFileSelect(evt) {
    console.log(2);
    evt.stopPropagation();
    evt.preventDefault();
    var files = evt.dataTransfer.files;// FileList object.

    var reader = new FileReader();
    reader.onload = function(event) {
        manageBtn(new Manage(event.target.result));
        //console.log("Содержимое файла: " + contents);
    };
     
    reader.onerror = function(event) {
        console.error("Файл не может быть прочитан! код " + event.target.error.code);
    };
     
    reader.readAsText(files[0]);
  }

  function handleDragOver(evt) {
    console.log(env);
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
  }

  // Setup the dnd listeners.
  var dropZone = document.querySelector('#drop_zone');
  dropZone.addEventListener('dragover', handleDragOver, false);
  dropZone.addEventListener('drop', handleFileSelect, false);

  function manageBtn(manage){

    document.querySelector('#start').addEventListener('click',function(){
      fill(manage.start())
    },false)

    document.querySelector('#yes').addEventListener('click',function(){
      fill(manage.clickYes())
    },false)

    document.querySelector('#no').addEventListener('click',function(){
      fill(manage.clickNo());
    },false)

  }

  function fill(result){
      if(!result) return;
      relooadTable(result.chances,result.answer);
      document.querySelector('.question').innerHTML = "<span >"+result.question+"</span>";
  }

  function relooadTable(chances,answer){
      var table = document.querySelector('#list>table');
      if(table.getElementsByTagName("tbody").length>0){
        var row = table.getElementsByTagName("tbody")[0]
        table.removeChild(row)
      }
      for(var i in answer){
        var row = table.insertRow(i);
        var style = chances[i]>0?"column":"hide_column";
        var chance = parseFloat(chances[i]);
        row.insertCell(0).innerHTML = "<span class="+style+">"+chance.toFixed(5)+"</span>";
        row.insertCell(1).innerHTML = "<span class="+style+">"+answer[i]+"</span>";
      }
  }

});
