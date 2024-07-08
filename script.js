function consultaDados() {
    var id = document.getElementById("id").value.trim();
    if (id !== "") {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "consulta.php", true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send("id=" + id);

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var resposta = JSON.parse(xhr.responseText);
                document.getElementById("Remetente").value = resposta.Remetente;
                document.getElementById("Destinatario").value = resposta.Destinatario;
                document.getElementById("Turma").value = resposta.Turma;
                document.getElementById("Descricao").value = resposta.Descricao;
            }
        };
    } else {
        document.getElementById("Remetente").value = " ";
        document.getElementById("Destinatario").value = " ";
        document.getElementById("Turma").value = " ";
        document.getElementById("Descricao").value = " ";
    }
}