<?php 
//echo "tasks.php called";
$db = new PDO("mysql:host=localhost;dbname=sdarjzpf_TO_DO", "sdarjzpf_todoapp", "Welcome*123");
$data = json_decode(file_get_contents('php://input'));
console.log($data);
 if ($_SERVER['REQUEST_METHOD'] == "GET"){
  $statement = $db->query('SELECT * FROM TASKS');
  $statement->setFetchMode(PDO::FETCH_ASSOC);
  echo json_encode($statement->fetchAll());
  }
  
 if ($_SERVER['REQUEST_METHOD'] == "DELETE"){
	$sql = "DELETE FROM TASKS WHERE ID = :ID";
	$query = $db->prepare($sql);
	$query->execute(array(":ID"=>$_GET['id']));
  }
 if ($_SERVER['REQUEST_METHOD'] == "PUT"){
	$sql = "UPDATE TASKS SET COMPLETED = :COMPLETED WHERE ID = :ID";
	$query = $db->prepare($sql);
	$query->execute(array(":COMPLETED"=>$data->COMPLETED, ":ID"=>$data->ID));
  }

if ($_SERVER['REQUEST_METHOD'] == "POST"){
	$sql = "INSERT INTO TASKS (TITLE,COMPLETED) VALUES (:TITLE,:COMPLETED)";
	$query = $db->prepare($sql);
	$query->execute(array(":TITLE"=>$data->TITLE, ":COMPLETED"=>$data->COMPLETED));
	$result['ID'] = $db->lastInsertId();
	echo json_encode($result);
  }      
?>
