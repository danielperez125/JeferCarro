using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Negocio.Modelos
{

    #region "Objetos tipo clase"
    
    public class ApiResult
    {
        public ApiResult()
        {
            ResultCode = 0;
            ResultMessage = string.Empty;
            ResultObject = null;
            IdTX = string.Empty;
        }
        
        public int ResultCode { get; set; }
        public string ResultMessage { get; set; }
        public object ResultObject { get; set; }
        public string IdTX { get; set; }
    }
    public class UsuarioModel {
        public int tipoIdentif { get; set; }
        public long numIdentif { get; set; }
        public string nombre { get; set; }
        public string apellido { get; set; }
        public string ciudad { get; set; }
        public string direccion { get; set; }
        public string telefono { get; set; }
        public string pwd { get; set; }
    }

    public class VehiculoModel
    {
        public int idCliente { get; set; }
        public int idTipoVehic { get; set; }
        public int idMarcaVehic { get; set; }
        public int idRefVehic { get; set; }
        public int idCilindrajeVehic { get; set; }
        public int idEstadoVehic { get; set; }
        public string observaciones { get; set; }
        public string b64vehiculo { get; set; }
    }








    #endregion

}
