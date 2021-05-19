using Negocio.Modelos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using tuCarro.data;

namespace tuCarro.app
{
    public partial class usuario : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static ApiResult GuardarUsuario(UsuarioModel entrada)
        {
            ApiResult retorno = new ApiResult();
            TuCarroDAO tuCarroDAO = new TuCarroDAO();

            try
            {
                retorno = tuCarroDAO.GuardarUsuario(entrada);
            }
            catch (Exception ex)
            {
                retorno.ResultCode = 500;
                retorno.ResultMessage = "Ocurrió un error crítico al Validar el Empleado: " + ex.Message;
            }

            return retorno;
        }




    }
}