function createFirstGen() {
	var i;
	var j;
	
	var YGen = [];
	for (i = 0; i < Num; i++) {
		YGen[i] = [];
		for (j = 0; j < n; j++){
			YGen[i][j] = randomIntFromInterval(0,1);
		}
	}
	return(YGen);
}

function processGen(Massive){
	time++;



	var i;
	var CheckMas = [];
	CheckMas[0] = CheckIf(Massive[0]);
	var help = CheckMas[0];
	for (i = 1; i < Num; i++){
		CheckMas[i] = CheckMas[i - 1] + CheckIf(Massive[i]);
		if (CheckIf(Massive[i]) > help){
			help = CheckIf(Massive[i]);
		}

	} // проверяем ген на условие, наъодим сумму всех вероятностей
	
	Graph[time - 1] = help;

	if (time == 10){
		addTable(Massive);
		CreateChart();
		Result = Massive;
		return;
		}
	 else if (time % 10 == 0){
		addTable(Massive);
		ReCreateChart();
		Result = Massive;
		return;
	}


	var Chusen = [];
	for (i = 0; i < Num; i++){
		var random = randomIntFromInterval(0, CheckMas[(Num - 1)]);
		var j;
		for (j = 0; j < Num; j++){
			if (random <= CheckMas[j]){
				Chusen[i] = j;
				break;
			}
		}
	} // выбираем определенные хромосомы


	var YGenNew = [];
	for (i = 0; i < Num; i = i + 2){
		YGenNew[i] = [];
		var point = randomIntFromInterval(1, (n-1));
		if (i + 1 != Num){
			/*Massive[Chusen[i]] and Massive[Chusen[i+1]] and point*/
			YGenNew[i + 1] = [];

			var j;
			for (j = 0; j < point; j++){
				YGenNew[i][j] = Massive[Chusen[i]][j];
				YGenNew[(i + 1)][j] = Massive[Chusen[(i + 1)]][j];
			}
			for (j = point; j < n; j++){
				YGenNew[i][j] = Massive[Chusen[(i + 1)]][j];
				YGenNew[(i + 1)][j] = Massive[Chusen[i]][j];				
			}
		}
		else {
			YGenNew[i] = Massive[Chusen[i]];
		}
	} //для 1,2 3,4 ... делаем скрещивание хромосом

	for (i = 0; i < Num; i++){
		if (Math.random() < 0.05){
			var j = randomIntFromInterval(0,(n - 1));
			YGenNew[i][j] = YGenNew[i][j] ^ 1;
		}
	}	// мутация


	processGen(YGenNew);

}

function CheckIf(Line){
	var checkNum = 0;
	var i;
	for (i = 0; i < n; i++){
		if (Line[i] == Y[i]){
			checkNum = checkNum + 1.5;//можно менять цифру для более резких переходов за лучшими результатами
		}
	}
	return(checkNum);
}

function randomIntFromInterval(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}




/*var n = prompt('сколько условий?')
var Y = [];
var i; 
for (i = 1; i <= n; i++) {
	Y[i - 1] = prompt('условие ' + i);
}*/
var n = 8;

var Y = [0,1,1,0,1,1,0,0];

var Graph = [];

var Num = 6;

var time = 0;

var Result = [];

/*var Num = prompt('количество хромосом?');*/
processGen(createFirstGen());

function processAgain(){
	processGen(Result);
}

function addTable(Massive) {
	  var body = document.querySelector("body"),

	      width = Num * 40,
	      height = n * 30,
	      rows = Num,
	      columns = n,
	      tr = "",
	      td = "",
	      firstTable = document.querySelector("table");
/*	  console.log(width);
	  console.log(height);*/
	  console.log(rows);
	  console.log(columns);

	  table = document.createElement("table"),
	  table.setAttribute("border", "1px");

	  table.setAttribute("width", width);
	  table.setAttribute("height", height);
	  for (var i = 0; i < rows; i++) {
	    tr = document.createElement("tr");
	    for (var j = 0; j < columns; j++) {
	      td = document.createElement("td");
	      text = document.createTextNode(Massive[i][j]);
	      td.appendChild(text);
	      tr.appendChild(td);
	    }
	    table.appendChild(tr);
	  }
	  console.log(tr);
	  console.log(td);
	  if (firstTable == null) {
	    return body.appendChild(table);
	  } else {
	    var newTable = body.appendChild(table);
	    return document.body.replaceChild(newTable, firstTable);
	  }
}

function CreateChart(){
	window.ctx = document.getElementById('myChart').getContext('2d');
	var helpGraphNum = [];
    for (i = 0; i < Graph.length; i++){
    	helpGraphNum[i] = i;
    }
	window.chart = new Chart(ctx, {
	    // The type of chart we want to create
	    type: 'line',

	    // The data for our dataset
	    data: {
	        labels: helpGraphNum,
	        datasets: [{
	            label: "Шкала удовлетворения требованиям",
	            borderColor: 'rgb(255, 99, 132)',
	            data: Graph,
	        }]
	    },

	    // Configuration options go here
	    options: {}
	});
}

function ReCreateChart(){
	var helpGraphNum = [];
    for (i = 0; i < Graph.length; i++){
    	helpGraphNum[i] = i;
    }
    chart.destroy();
	window.chart = new Chart(ctx, {
	    // The type of chart we want to create
	    type: 'line',

	    // The data for our dataset
	    data: {
	        labels: helpGraphNum,
	        datasets: [{
	            label: "Шкала удовлетворения требованиям",
	            borderColor: 'rgb(255, 99, 132)',
	            data: Graph,
	        }]
	    },

	    // Configuration options go here
	    options: {}
	});
}
