using Negocio.Modelos;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Web;
using tuCarro.data;

namespace tuCarro.app
{
    /// <summary>
    /// Descripción breve de cargaImagenes
    /// </summary>
    public class cargaImagenes : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            try
            {
                //***********Encabezado que almacena la imagen en una ruta física***********

                //string dirFullPath = HttpContext.Current.Server.MapPath("~/MediaUploader/");
                //string[] files;
                //int numFiles;
                //files = System.IO.Directory.GetFiles(dirFullPath);
                //numFiles = files.Length;
                //numFiles = numFiles + 1;
                //string str_image = "";

                ApiResult retorno = new ApiResult();
                VehiculoModel entrada = new VehiculoModel();

                foreach (string s in context.Request.Files)
                {
                    HttpPostedFile file = context.Request.Files[s];
                    string fileName = file.FileName;
                    string fileExtension = file.ContentType;

                    Image img = Image.FromStream(file.InputStream);
                    string b64Type = "data:" + file.ContentType + ";base64,";
                    string b64 = ConvertImageToBase64(img);
                    b64 = b64Type + b64;

                    entrada.b64vehiculo = b64;

                    retorno = TuCarroDAO.GuardarVehiculo(entrada);


                    //***********Bloque que almacena la imagen en una ruta física***********

                    //if (!string.IsNullOrEmpty(fileName))
                    //{
                    //    fileExtension = Path.GetExtension(fileName);
                    //    str_image = "MyPHOTO_" + numFiles.ToString() + fileExtension;
                    //    string pathToSave_100 = HttpContext.Current.Server.MapPath("~/MediaUploader/") + str_image;
                    //    file.SaveAs(pathToSave_100);
                    //}
                }
                //database record update logic here()

                context.Response.Write(retorno.ResultCode + "|" + retorno.ResultMessage);
            }
            catch (Exception ex)
            {

            }
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }

        public string ConvertImageToBase64(Image file)
        {
            using (MemoryStream memoryStream = new MemoryStream())
            {
                file.Save(memoryStream, file.RawFormat);
                byte[] imageBytes = memoryStream.ToArray();
                return Convert.ToBase64String(imageBytes);
            }
        }
    }
}