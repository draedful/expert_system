
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
    console.log('resilt = ',result)
      if(!result) return;
      relooadTableQuestions(result.questionList);
      relooadTableAnswer(result.answer);
      document.querySelector('.question').innerHTML = "<span >"+result.question+"</span>";
  }


  function relooadTableQuestions(questionList){
      var table = document.querySelector('#questions');
      if(table.getElementsByTagName("tbody").length>0){
        var row = table.getElementsByTagName("tbody")[0]
        table.removeChild(row)
      }
      for(var i in questionList){
        var row = table.insertRow(i);
        var style = questionList[i].answer<0?"column":"hide_column";
        var answer = questionList[i].answer >= 0? questionList[i].answer == 0?"No":questionList[i].answer == 1?"Yes":"":"";
        row.insertCell(0).innerHTML = "<span class="+style+">"+answer+"</span>";
        row.insertCell(1).innerHTML = "<span class="+style+">"+questionList[i].question+"</span>";
      }
  }


  function relooadTableAnswer(res){
      var table = document.querySelector('#answers');
      if(table.getElementsByTagName("tbody").length>0){
        var row = table.getElementsByTagName("tbody")[0]
        table.removeChild(row)
      }
      console.log(res);
      for(var i in res){
        var row = table.insertRow(i);
        var style = res[i].chances>0?"column":"hide_column";
        var chance = parseFloat(res[i].chances);
        row.insertCell(0).innerHTML = "<span class="+style+">"+chance.toFixed(5)+"</span>";
        row.insertCell(1).innerHTML = "<span class="+style+">"+res[i].answer+"</span>";
      }
  }

});
