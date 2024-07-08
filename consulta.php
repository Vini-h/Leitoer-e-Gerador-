<?php
//CONFIGURAÇÕES DE CREDENCIAIS
$server = 'localhost';
$usuario = 'root';
$senha = '';
$banco = 'dados';

//CONEXÃO COM NOSSO BANCO DE DADOS
$conn = new mysqli($server, $usuario, $senha, $banco);

//VERIFICAR CONEXÃO
if($conn->connect_error) {
    die("Falha ao se comunicar com banco de dados: ".$conn->connect_error);
}

// Receber o ID enviado pelo JavaScript
$id = $_POST["id"];
$id = $conn->real_escape_string($id);

$sql = "SELECT Remetente, Destinatario, Turma, Descricao FROM solicitacoes WHERE id = '$id'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    echo json_encode($row);
} else {
    echo "Nenhum registro encontrado";
}

$conn->close();
?>