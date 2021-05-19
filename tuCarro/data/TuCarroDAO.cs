using Negocio.Modelos;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace tuCarro.data
{
    public class TuCarroDAO
    {
        public ApiResult GuardarUsuario(UsuarioModel entrada) {
            ApiResult retorno = new ApiResult();



            //código que almacena usuario en la BD

            retorno.ResultCode = 0;
            retorno.ResultMessage = "Operación exitosa";

            return retorno;
        }

        public static ApiResult GuardarVehiculo(VehiculoModel entrada)
        {
            ApiResult retorno = new ApiResult();

            try
            {
                //código que almacena usuario en la BD

                


                File.AppendAllText(@"C:\tmp\prbb.txt", "hoool" + Environment.NewLine);



                retorno.ResultCode = 0;
                retorno.ResultMessage = "Operación exitosa";
            }
            catch (Exception ex)
            {
                retorno.ResultCode = 100;
                retorno.ResultMessage = ex.Message;
            }

       

            return retorno;
        }

    }
}