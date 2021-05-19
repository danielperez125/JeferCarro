<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="usuario.aspx.cs" Inherits="tuCarro.app.usuario" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title></title>
    <%--<link href="../css/bootstrap.min.css" rel="stylesheet" />--%>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
</head>
<body>
    <div style="width: 70%; margin-left: 15%; margin-top: 3%">
        <div class="panel panel-primary">
            <div class="panel-heading">Registro de Usuario</div>
            <div class="panel-body">
                <form>
                    <div class="form-group">

                        <label for="selTipIdent">Tipo de identificación:</label>
                        <select class="form-control" id="selTipIdent" validar="true">
                            <option value="-1">Seleccione...</option>
                            <option value="1">Cédula</option>
                            <option value="2">Nit</option>
                            <option value="3">Pasaporte</option>
                            <option value="4">Cédula extranjería</option>
                        </select>

                        <label for="txtNumIdentif">Número de indentificación:</label>
                        <input id="txtNumIdentif" type="number" class="form-control" validar="true" />

                        <label for="txtNombre">Nombre:</label>
                        <input id="txtNombre" type="text" class="form-control" validar="true" />

                        <label for="txtApellido">Apellido:</label>
                        <input id="txtApellido" type="text" class="form-control" validar="true" />

                        <label for="selCiudad">Ciudad:</label>
                        <select class="form-control" id="selCiudad" validar="true">
                            <option value="-1">Seleccione...</option>
                            <option value="1">Bogotá</option>
                            <option value="2">Medellín</option>
                            <option value="3">Cali</option>
                            <option value="4">Barranquilla</option>
                        </select>

                        <label for="txtDireccion">Dirección:</label>
                        <input id="txtDireccion" type="text" class="form-control" validar="true" />

                        <label for="txtTelefono">Teléfono:</label>
                        <input id="txtTelefono" type="number" class="form-control" validar="true" />


                        <label for="pwd">Password:</label>
                        <input type="password" class="form-control" id="pwd" validar="true" />
                    </div>
                    <button id="btnGuardar" type="button" class="btn btn-primary" onclick="GuardarCliente()">Guardar</button>
                    <button id="btnLimpiar" type="button" class="btn btn-success">Limpiar</button>
                    <button id="btnCancelar" type="button" class="btn btn-danger">Cancelar</button>
                </form>
            </div>
        </div>

    </div>





    <script src="../js/jquery.min.js"></script>

    <script type="text/javascript">

        var pagePath = window.location.pathname;


        function GuardarCliente() {

            var esValido = true;

            $("[validar='true']").each(function () {

                if (this.id == 'selTipIdent' || this.id == 'selCiudad') {

                    if (parseInt(this.value) < 1) {
                        alert(this.id + ' es obligatorio');
                        this.focus();
                        esValido = false;
                        return false;
                    }
                }

                if (this.id == 'txtNumIdentif') {
                    if (this.value.length < 7 || this.value.length > 20) {
                        alert(this.id + ' es obligatorio o tiene una longitud incorrecta');
                        this.focus();
                        esValido = false;
                        return false;
                    }
                }
                if (this.id == 'txtNombre') {
                    if (this.value.length < 3) {
                        alert(this.id + ' es obligatorio o tiene una longitud incorrecta');
                        this.focus();
                        esValido = false;
                        return false;
                    }
                }
                if (this.id == 'txtApellido') {
                    if (this.value.length < 3) {
                        alert(this.id + ' es obligatorio o tiene una longitud incorrecta');
                        this.focus();
                        esValido = false;
                        return false;
                    }
                }
                if (this.id == 'txtDireccion') {
                    if (this.value.length < 5) {
                        alert(this.id + ' es obligatorio o tiene una longitud incorrecta');
                        this.focus();
                        esValido = false;
                        return false;
                    }
                }
                if (this.id == 'txtTelefono') {
                    if (this.value.length < 7) {
                        alert(this.id + ' es obligatorio o tiene una longitud incorrecta');
                        this.focus();
                        esValido = false;
                        return false;
                    }
                }
                if (this.id == 'pwd') {
                    if (this.value.length < 8) {
                        alert(this.id + ' mínimo de 8 caracteres');
                        this.focus();
                        esValido = false;
                        return false;
                    }
                }

            });

            if (esValido) {


                var usu = {
                    tipoIdentif: $('#selTipIdent').val(),
                    numIdentif: $('#txtNumIdentif').val(),
                    nombre: $('#txtNombre').val(),
                    apellido: $('#txtApellido').val(),
                    ciudad: $("#selCiudad option:selected").text(),
                    direccion: $('#txtDireccion').val(),
                    telefono: $('#txtTelefono').val(),
                    pwd: $('#pwd').val()
                };

                var jsonText = JSON.stringify({ entrada: usu });

                $.ajax({
                    type: "POST",
                    url: pagePath + "/GuardarUsuario",
                    data: jsonText,
                    contentType: "application/json",
                    dataType: "json",
                    success: function (result) {
                        var callback = result.d;

                        alert(callback.ResultMessage);

                    },
                    error: function (e, f, g) {
                        alert('error: ' + e.toString());
                    }
                });

            }
        }







    </script>

</body>







</html>
