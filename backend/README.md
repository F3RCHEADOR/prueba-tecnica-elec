** Agregado y Correccion

Se procede a colocar 
      whitelist: true,  ignorar campos que no esten en el dto     
      forbidNonWhitelisted: true error si existe algun campo adicional no establecido en el dto 
      transform: true esto para que si o si sean tenido en cuenta los dto

esto debido a equivocarme con un campo en una cuidad ya que puse name y era nombre y logre agregar errorneamente un nuevo campo al registro...

{
  "id": "6e8b3709-e409-4ac5-8ecc-e5fd8cb28e35",
  "nombre": "Bucaramanga",
  "createdAt": "2026-03-26T23:26:55.734Z",
  "departamento_id": "227b663e-d21c-41ef-bbe6-898a0efa196e",
  "name": "Piedecuesta"
}

ademas de eliminar synchronise o  bueno dejarlo en false, esto por que pues cualquier cambio en entity , se popne automaticamente en la db

ademas debi mover el listen a despues de la validationpipe para evitar cualquier reinicio dle servidor o comportamiento raro.

