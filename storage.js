
    function populateDB(tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id unique, data)');
    }

    function queryDB(tx) {
        tx.executeSql('SELECT * FROM DEMO', [], querySuccess, errorCB);
    }

    function querySuccess(tx, results){
        var len = results.rows.length;     
        now.Log("QuerySucces : len = " + len);
	  	if(len!=0){
			now.pseudo = results.rows.item(0).id;
			now.mail = results.rows.item(0).data;
		}
		else{
			navigator.notification.alert("Pensez a  enregistrer votre pseudo et mail dans le menu option");
		}	  
    }

    function requeteAll(tx) {
        tx.executeSql('SELECT * FROM DEMO', [], querySuccess, errorCB);
    }

    function errorCB(err) {
        navigator.notification.alert("Error processing SQL: "+err.code);
    }

    function getInfo() {
        var db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 200000);
        db.transaction(requeteAll, errorCB);
    }
	
	function insert(tx){			
		tx.executeSql('INSERT INTO DEMO (id, data) VALUES ("'+now.pseudo+'","'+now.mail+'")');
	}
	
	function del(tx){
		tx.executeSql('DELETE FROM DEMO');	
	}
	
	
	function transactionInsert(){		
		var db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 200000);
        db.transaction(insert, errorCB);
	}
	
	function transactionDel(){
		var db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 200000);
        db.transaction(del, errorCB);
	}