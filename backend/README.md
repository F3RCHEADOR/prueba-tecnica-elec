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


** crud usuarios

decidi usar bcrypt para encriptar las contrasenas, solo para hacerlo un poco mas seguro ya que tengo el crud que llama todas o solo una, de cualquier forma no seran muy complicadas las contrasenas

** Solo dejare por autorizar departamentos, esto pues para que ciudades no esta bajo proceccion de un guard...


** Olvide poner lo de CORPS...

**Para editar una ciudad y poder cambiar de departamento la ciudad, es requerido tener autorizacion puesto que puede ocurrir un error al intentar mover la ciudad o obtener los departamentos... por ende, es necesario asignar guard a ciudad...
