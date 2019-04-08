

Codigos HTTP:
200 OK :      Solicitud aceptada, la respuesta contiene el resultado, en las solicitudes GET, el recurso o datos estan
              en el cuerpo de la respuesta, en las solicitudes PUT o DELETE, la Solicitud fue satisfactoria, y la
              informacion acerca del resultado, como por ejemplo el id del recurso nuevo o cambios en el estado del re-
              curso se pueden encontrar en el body de la respuesta.

201 CREATED:  Las operaciones PUT o POST devuelven este codigo de respuesta e indica que se ha creado un recurso de 
              forma satisfactoria, el doby de la respuesta PODRÍa, por ejemplo, contener informacion acerca de un nuevo
              recurso o informacion de validacion (cuando se actualiza un recurso).

204 NO CONTENT: Indica que se ha aceptado la solicitud pero no no habian datos que devolver.

400 BAD REQUEST: La solicitud no fue válida, este código se devuelve cuando el servidor ha intentado procesar la solici-
                 tud pero algún aspecto del REQUEST no es válido; por ejemplo un  recurso formateado de forma incorrecta
                 La informacion acerca de la solicitud se proporciona en el cuerpo de la respuesta e incluye un código de
                 erro y un mensaje de error.

404 NOT FOUND: Indica que el recurso de destino no existe, esto podria deberse a que el URI no está bien formado o a que
               se ha suprimido el recurso.

500 INTERNAL SERVER ERROR: Se ha producido un error interno en el servidor. Esto podría indicar un problema con la solici-
                           tud o un priblema en el código del lado del servidor, se puede encontrar informacion acerca del 
                           error en el cuerpo de la respuesta.

