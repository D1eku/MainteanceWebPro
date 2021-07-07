
create table empresa(
	codigo text primary key not null,
	nombre text not null, 
	activa bolean not null
);

create table usuario(
	rut varchar(12) not null,
	email TEXT not null,
	password TEXT not null,
	primary key(rut)
);

create table mantenedor(
	rut varchar(12) primary key  not null references usuario(rut),
	nombre TEXT not null,
	rol TEXT Not null,
	empresa TEXT not null references empresa(codigo)
);

create table administrador(
	rut varchar(12) primary key not null references usuario(rut)
);

create table planificador(
	rut varchar(12) primary key not null references usuario(rut)
);

create table equipo(
	codigo TEXT not null,
	nombre TEXT Not null,
	clase TEXT ,
	descripcion TEXT ,
	ubicacion TEXT Not null,
	activo text not null,
	primary key(codigo)
);

create table pauta_mantenimiento(
	codigo INT not null,
	nombre TEXT not null,
	version TEXT not null,
	cantidad_periodo INT not null,
	tipo_periodo TEXT not null,
	estado TEXT not null,
	clase TEXT not null,
	fecha_creacion DATE not null,
	equipo  text not null  references equipo(codigo),
	empresa text not null  references empresa(codigo),
	primary key(codigo)
);

create table item(
	codigo TEXT not null,
	nombre TEXT Not null,
	codigo_pauta INT not null references pauta_mantenimiento(codigo),
	primary key(codigo)
);

create table subitem(
	codigo TEXT not null,
	nombre TEXT Not null,
	codigo_item TEXT not null references item(codigo),
	primary key(codigo)
);

create table atencion(
	codigo TEXT not null,
	item TEXT Not null references item(codigo),
	codigo_pauta INT not null references pauta_mantenimiento(codigo),
	primary key(codigo)
);

create table ficha_atencion(
	codigo INT not null,
	nombre TEXT not null,
	atencion TEXT Not null references atencion(codigo),
	diagnostico_inicial TEXT not null,
	turno TEXT not null,
	fecha_estimada DATE not null,
	fecha_realizada DATE not null,
	nombre_tecnico TEXT not null,
	supervisor_empresa TEXT not null,
	tipo_actividad TEXT not null,
	observacion_general TEXT not null,
	supervisor_mandante TEXT not null,
	primary key(codigo)
);

create table respuesta_item(
	codigo INT not null,
	codigo_item TEXT not null references item(codigo),
	codigo_subitem TEXT not null references subitem(codigo),
	ficha_atencion INT Not null references ficha_atencion(codigo),
	observacion TEXT not null,
	estado_recepcion TEXT not null,
	estado_entrega TEXT not null,
	primary key(codigo)
);

create table calendario(
	codigo TEXT not null,
	codigo_equipo TEXT not null references equipo(codigo),
	rut_mantenedor varchar(12) not null references mantenedor(rut),
	fecha_estimada DATE not null,
	codigo_pauta INT not null references pauta_mantenimiento(codigo),
	rut_planificador varchar(12) not null references planificador(rut),
	primary key(codigo)
);