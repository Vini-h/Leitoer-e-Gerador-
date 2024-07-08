<?php
//PEGANDO OS DADOS VINDOS DO FORMULÁRIO
$Remetente = $_POST['Remetente'];
$Destinatario = $_POST['Destinatario'];
$Turma = $_POST['Turma'];
$Descricao = $_POST['Descricao'];
$hora = date('H:i:s');

//CONFIGURAÇÕS DE CREDENCIAIS
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

$smtp = $conn->prepare("INSERT INTO solicitacoes (Remetente, Destinatario, Turma, Descricao, hora ) VALUES (?,?,?,?,?)");
$smtp->bind_param("sssss",$Remetente, $Destinatario, $Turma, $Descricao, $hora);

if($smtp->execute()){
    $id = $conn->insert_id; // Pega o ID da resposta inserida
    echo "<script>window.location.href='Gerador.html?id=$id';</script>"; // Redireciona para a página Gerador.html com o ID da resposta
}else{
     echo "Erro no envio da mensagem: ".$smtp->error;
}
$smtp->close();
$conn->close();
?>