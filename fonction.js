// JavaScript Document
var my_gauge;
var KPItxt;
var myChart;
var BarChart;
var gauge;
var desc = "Default KPI";
var kpimin = 20;
var kpimax = 90;
var kpialert =80;
var type = "";
var currentgroup = "";
var demoGauge;
var myDataLine = new Array([0, 40], [5, 50], [10, 55], [15, 45]); var DataLineX = 4;
var myData = new Array([0+"", 40], [5+"", 50], [10+"", 55], [15+"", 45]); var DataX = 4;
var tabmail = new Array();
var tabKPI = new Array();

function description() {
    document.getElementById('label').value = 'Device Name: '     + device.name     + '<br />' + 
	'Device PhoneGap: ' + device.phonegap +  
	'Device Platform: ' + device.platform +  
	'Device UUID: '     + device.uuid     +  
	'Device Version: '  + device.version  ;
}


function getKPI(){  
	document.getElementById('label').value = desc; 
	now.LaunchKPI(currentgroup);
}	


function receiveKPI(nb){
	updateKPI(nb);	
	checkalert(nb);
}


function checkalert(nb){
	if(nb>kpialert)
    	alert();
}


function Gauge(){
	type="bar";
	
};
function TrueGauge(){
	type="truegauge";    
};
function Chart(){
    type="chart";
};

function kpioptions(){
document.getElementById('kpialert').innerHTML =  " <h1> KPI alert " + kpialert + "</h1>";
document.getElementById('kpimin').innerHTML = " <h1> KPI min " + kpimin + "</h1>";
document.getElementById('kpimax').innerHTML =  " <h1> KPI max " + kpimax + "</h1>";
}

function kpialertdown(){
	kpialert--;
	document.getElementById('kpialert').innerHTML = " <h1> KPI alert " + kpialert + "</h1>";
};
function kpialertup(){
	kpialert++;
	document.getElementById('kpialert').innerHTML = " <h1> KPI alert " + kpialert + "</h1>";
};
function kpimindown(){
	kpimin--;
    document.getElementById('kpimin').innerHTML = " <h1> KPI min " + kpimin + "</h1>";
};
function kpiminup(){
	kpimin++;
    document.getElementById('kpimin').innerHTML = " <h1> KPI min " + kpimin + "</h1>";
};
function kpimaxdown(){
	kpimax--;
	 document.getElementById('kpimax').innerHTML = " <h1> KPI max " + kpimax + "</h1>";
};
function kpimaxup(){
	kpimax++;
	 document.getElementById('kpimax').innerHTML = " <h1> KPI max " + kpimax + "</h1>";
};


function listGroup(){
    document.getElementById('listloadkpi').innerHTML = "";
    for(i = 0; i < now.array.length ; i++){
        add_liKPI(now.array[i][0],now.array[i][0]).onclick = onKPIClicked;  
     
    }
    
    function onKPIClicked(event){                  
        if(currentgroup!=""){
            now.removeFromGroup(currentgroup);
        }
        var nom = event.target.getAttribute("id");
        navigator.notification.alert("Indicateur " + nom + " chargé");
        now.getGroupKPI(nom);
        currentgroup = nom;
    }
};

function creernewkpi(){
    
    var nom = document.getElementById('txtnom').value;

    var newdesc = document.getElementById('txtdesc').value;
    var newmin = document.getElementById('txtmin').value;
    var newmax = document.getElementById('txtmax').value;
    var newalert = document.getElementById('txtalert').value;

    if(document.getElementById('Choix_gauge').checked == true)
        var newtype = "bar";
    if(document.getElementById('Choix_truegauge').checked==true)
        var newtype = "truegauge";
    if(document.getElementById('Choix_chart').checked==true)
        var newtype = "chart";              
        if(currentgroup!=""){
            now.removeFromGroup(currentgroup);
        }
        now.addToGroup(nom,newdesc,newmin,newmax,newalert,newtype);      
        listGroup();
};

        function KPIoption(){
         if(document.getElementById('Choix_0').checked == true)
         type = "bar";
    if(document.getElementById('Choix_1').checked==true)
        type = "truegauge";
    if(document.getElementById('Choix_2').checked==true)
        type = "chart";
        
        updateKPI();
        };


function SendMsg(){
    navigator.notification.alert("SendMsg to: " + currentgroup + "     content  : " + getElementById('msgsend').value);
    now.sendToGroup(currentgroup,getElementById('msgsend').value);
};


 
 
 function validList(){
     var str = "";
     for(i = 0 ; i < tabmail.length ; i++){
     var nom = "#checkbox-";
    var id = "#idbox-";
     id = id.concat(parseInt(i));
     var label = $(id.toString());
     nom = nom.concat(parseInt(i));
    var p = $(nom.toString());
      
         if(p.is(':checked')){    
            str += label.text()+", ";
         }        
     }
       document.getElementById('to').value = str;
 }
 
 function save(){
     var oldmail = now.mail;
     now.pseudo = document.getElementById('name').value;
     now.mail = document.getElementById('mail').value; 
     if(oldmail!=now.mail && oldmail!="" && currentgroup!=""){
      now.changeMail(oldmail,now.mail,currentgroup);   
     }
     transactionDel();
     transactionInsert();
     now.echoInfo();
     };
 
 function sendMsgChat(){
      var str = now.pseudo + " : "+ document.getElementById('txtmsg').value;
      now.sendToGroup(currentgroup,str); 
      document.getElementById('txtmsg').innerHTML = "";   
 }
 