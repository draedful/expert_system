function Manage(text){
	console.log(text);
	var base = {
		description:[],
		questions:[],
		answers:[],
		aprior:[],
		answerQ:{},
		apriorPlus:{},
		apriorMinus:{},
	};
	var numberQuestions;
	(function(){
		console.group('processing');
		var textArray = text.split('\r\n')
		var iterator = 0;
		var keysObject = Object.keys(base);
		var count = 0;
		for(var i in textArray){
			
			if(textArray[i] == ""){ //Првоерка на пустую строку, если строка пустая значит блок кончился и переходим к другому блоку
				iterator++;
				continue;
			}
			if(iterator == 0){
				base[keysObject[iterator]].push(textArray[i]);
				continue;
			}
			if(iterator == 1){ // Проверка чтобы в блок questions попали только вопросытиам
				if(textArray[i].indexOf('?') != -1) base[keysObject[iterator]].push(textArray[i]) ;
					continue ;
			}	
			answerProcessing(count,textArray[i]);
			count++;

		}
		console.log(base)
		console.groupEnd('processing');
		function answerProcessing(i,answerLine){
			console.group("answerProcessing");
			var answer = answerLine.split(',');
				base.answers.push(answer[0]) 
				base.aprior.push(answer[1]); 
				var answerProc = answer.slice(2);
				apriorYesNo(i,answerProc );
			console.groupEnd("answerProcessing");
		}

		function apriorYesNo(indexAnswer,chances){
			console.group("answerYesNo");
			console.log(indexAnswer);
			var answerQ;
			base.answerQ[indexAnswer]=[];
			for(var i = 0;i < chances.length;i+=3){
				base.answerQ[indexAnswer][chances[i]-1] = [chances[i+1],chances[i+2]];
				console.log(i,chances.slice(i,i+3));
			}
			console.log(base.answerQ);
			console.groupEnd("answerYesNo");
		}
	})();

	function processing(){

	}

	function updateInfo(){

	}

	function getQuestion(){
		if(base.questions.length == 0) alert("21312");
		numberQuestions = Math.floor(Math.random()*base.questions.length);
		var question = base.questions[numberQuestions];
		console.log(1,numberQuestions,base.questions);
		base.questions.splice(numberQuestions,1);
		console.log(2,base.questions);
		return question;
	}
	

	function clickYes(){
		//if(isLast) return false;
		//console.log(base.aprior);
		for (var i in base.aprior){
            base.aprior[i] = (( base.answerQ[i][numberQuestions][0])*base.aprior[i])/
                        (((( (base.answerQ[i][numberQuestions][0]))*base.aprior[i])) +
                         ((( base.answerQ[i][numberQuestions][1]))*(1 - base.aprior[i])));
        }
        for(var i in base.aprior){
        	if(base.aprior[i] > 0){
        		console.log(base.answers[i]);
        	}
        }
        isLast();
        //console.log(base.aprior);
		return {
			question:getQuestion(),
			answer:base.answers,
			chances:base.aprior,
		}
	}

	function clickNo(){
		//if(isLast) return false;
		//console.log(base.aprior);
		for (var i in base.aprior){

            base.aprior[i] = ((1 - base.answerQ[i][numberQuestions][0])*base.aprior[i])/
                        ((((1 - (base.answerQ[i][numberQuestions][0]))*base.aprior[i])) +
                         (((1 - base.answerQ[i][numberQuestions][1]))*(1 - base.aprior[i])));
        }
        for(var i in base.aprior){
        	if(base.aprior[i] > 0){
        		console.log(base.answers[i]);
        	}
        }
        isLast();
        //console.log(base.aprior);
		return {
			question:getQuestion(),
			answer:base.answers,
			chances:base.aprior,
		}
	}

	function isLast(){
		var countPlus = 0;
		var indexTrue = 0;
		base.aprior.forEach(function(value,index){
			if(value > 0){
				countPlus++;
				indexTrue = index;
			}
		})
		if(countPlus == 1){
			alert("Правильный ответ " + base.answers[indexTrue]);
			return true;
		}else if(countPlus == 0){
			alert("Правильных ответов нет");
			return  true;
		}else if(countPlus>0 && base.questions.length == 0){
			base.aprior.sort(function(a,b){
				return a>b?1:-1;
			});
			returnString = "";
			base.aprior.forEach(function(value,index){
				if(value >0){
					returnString+='или' + value;
				}else return;
			})
			alert("Правильный ответ : или" + returnString);
			return true;
		}
		return false;
	} 

	function start(){
		base.questions.splice(numberQuestions,numberQuestions+1);
		return {
			question:getQuestion(),
			answer:base.answers,
			chances:base.aprior,
		}
	}

	return {
		start:start,
		clickYes:clickYes,
		clickNo:clickNo,
	}
}