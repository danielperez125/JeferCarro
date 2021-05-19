<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="registrarVehiculo.aspx.cs" Inherits="tuCarro.app.registrarVehiculo" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title></title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
</head>
<body>
    <div style="width: 70%; margin-left: 15%; margin-top: 3%">
        <div class="panel panel-success">
            <div class="panel-heading">Registro de Vehículo</div>
            <div class="panel-body">
                <form>
                    <div class="form-group">


                        <label for="selTipVehiculo">Tipo de vehículo:</label>
                        <select class="form-control" id="selTipVehiculo" validar="true" onchange="LlenarMarca(this)">
                            <option value="-1">Seleccione...</option>
                            <option value="1">Carros y Camionetas</option>
                            <option value="2">Motos</option>
                            <option value="3">Buses y Busetas</option>
                        </select>

                        <label for="selMarca">Marca:</label>
                        <select class="form-control" id="selMarca" validar="true">
                            <option value="-1">Seleccione...</option>
                        </select>

                        <label for="selReferencia">Referencia:</label>
                        <select class="form-control" id="selReferencia" validar="true">
                            <option value="-1">Seleccione...</option>
                        </select>

                        <input id="imgInput" type="file" name="file" />
                        <img id="imagePreview" src="" alt="Item Image" width="300" height="200" />
                    </div>
                    <button id="btnGuardar" type="button" class="btn btn-primary" onclick="GuardarVehiculo()">Guardar</button>
                    <button id="btnLimpiar" type="button" class="btn btn-success">Limpiar</button>
                    <button id="btnCancelar" type="button" class="btn btn-danger">Cancelar</button>
                </form>
                <input type="hidden" id="sess" />
            </div>
        </div>

    </div>




    <script src="../js/jquery.min.js"></script>



    <script>

        var pagePath = window.location.pathname;

        $(document).ready(function () {
            $("#imgInput").change(function () {
                readURL(this);
            });

        });

        function readURL(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {

                    $('#imagePreview').attr('src', e.target.result);
                }

                reader.readAsDataURL(input.files[0]);
            }
        }

        function GuardarVehiculo() {
            var fileUpload = $("#imgInput").get(0);
            var files = fileUpload.files;
            var test = new FormData();

            for (var i = 0; i < files.length; i++) {
                test.append(files[i].name, files[i]);
            }

            $.ajax({
                url: "cargaImagenes.ashx",
                type: "POST",
                contentType: false,
                processData: false,
                data: test,
                success: function (result) {
                    var codigo = result.split('|')[0];
                    var mensaje = result.split('|')[1];

                    alert(mensaje);
                    $('#imgInput')[0].value = '';
                },
                error: function (err) {
                    alert(err.statusText);
                }
            });
        }

        function LlenarMarca(_this) {
            var hh = _this;
        }




    </script>
</body>
</html>
