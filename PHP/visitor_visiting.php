<?php


include 'Database.php';
$db=new Database();
$con=$db->getConnection();


$json = file_get_contents('php://input');

$obj = json_decode($json, true);

$visitor_id = $obj["visitor_id"];
$visitor_visiting_flat = $obj["visitor_visiting_flat"];
$visitor_visiting_wing = $obj["visitor_visiting_wing"];
$num_of_pax = $obj["num_of_pax"];
$mydate=getdate();
//echo "$mydate[year]-$mydate[mday]";
    $checkSQL = "SELECT * FROM visitor_visiting where visitor_id='$visitor_id' and created_at like '$mydate[year]-0$mydate[mon]-$mydate[mday]%'";
    $result = mysqli_query($con,$checkSQL);
   if (mysqli_num_rows($result)==0) {

    $Sql_Query = "insert into visitor_visiting (visitor_id,visitor_visiting_flat,visitor_visiting_wing,num_of_pax) values ('$visitor_id','$visitor_visiting_flat','$visitor_visiting_wing','$num_of_pax')";


    if (mysqli_query($con, $Sql_Query)) {


        $MSG = 'true';


        $json = json_encode($MSG);


        echo $json;

    } else {
 $MSG='Visitor is already in society';
    $json = json_encode($MSG);
    echo $json;
         }
}else{

    echo mysqli_error($con);
}

mysqli_close($con);