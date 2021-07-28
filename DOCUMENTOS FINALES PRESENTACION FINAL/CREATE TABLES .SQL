
CREATE TABLE administrador  (
    rut character varying(12) NOT NULL,
    CONSTRAINT administrador_pkey PRIMARY KEY (rut),
    CONSTRAINT administrador_rut_fkey FOREIGN KEY (rut)
        REFERENCES public.usuario (rut) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE NO ACTION
);




CREATE TABLE public.calendario
(
    codigo text NOT NULL,
    codigo_equipo text NOT NULL,
    rut_mantenedor character varying(12)  NOT NULL,
    fecha_estimada date NOT NULL,
    codigo_pauta integer NOT NULL,
    rut_planificador character varying(12)  NOT NULL,
    CONSTRAINT calendario_pkey PRIMARY KEY (codigo),
    CONSTRAINT calendario_codigo_equipo_fkey FOREIGN KEY (codigo_equipo)
        REFERENCES public.equipo (codigo) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT calendario_codigo_pauta_fkey FOREIGN KEY (codigo_pauta)
        REFERENCES public.pauta_mantenimiento (codigo) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT calendario_rut_mantenedor_fkey FOREIGN KEY (rut_mantenedor)
        REFERENCES public.mantenedor (rut) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT calendario_rut_planificador_fkey FOREIGN KEY (rut_planificador)
        REFERENCES public.planificador (rut) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);


CREATE TABLE public.empresa
(
    codigo text  NOT NULL,
    nombre text  NOT NULL,
    activa boolean NOT NULL DEFAULT true,
    CONSTRAINT empresa_pkey PRIMARY KEY (codigo)
);


CREATE TABLE public.equipo
(
    codigo text  NOT NULL,
    nombre text  NOT NULL,
    clase text NOT NULL,
    descripcion text  NOT NULL,
    ubicacion text NOT NULL,
    activo text  NOT NULL,
    CONSTRAINT equipo_pkey PRIMARY KEY (codigo)
);


CREATE TABLE public.ficha_atencion
(
    codigo integer NOT NULL,
    nombre text NOT NULL,
    diagnostico_inicial text  NOT NULL,
    turno text  NOT NULL,
    fecha_estimada date NOT NULL,
    fecha_realizada date NOT NULL,
    nombre_tecnico text  NOT NULL,
    supervisor_empresa text  NOT NULL,
    tipo_actividad text  NOT NULL,
    observacion_general text  NOT NULL,
    supervisor_mandante text  NOT NULL,
    codigo_pauta integer NOT NULL,
    CONSTRAINT ficha_atencion_pkey PRIMARY KEY (codigo),
    CONSTRAINT codigo_pauta_fkey FOREIGN KEY (codigo_pauta)
        REFERENCES public.pauta_mantenimiento (codigo) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);


CREATE TABLE public.item
(
    codigo text  NOT NULL,
    nombre text  NOT NULL,
    codigo_pauta integer NOT NULL,
    CONSTRAINT item_pkey PRIMARY KEY (codigo),
    CONSTRAINT item_codigo_pauta_fkey FOREIGN KEY (codigo_pauta)
        REFERENCES public.pauta_mantenimiento (codigo) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);


CREATE TABLE public.mantenedor (
    rut character varying(12)  NOT NULL,
    rol text  NOT NULL,
    empresa text  NOT NULL,
    CONSTRAINT mantenedor_pkey PRIMARY KEY (rut),
    CONSTRAINT empresa_update FOREIGN KEY (empresa)
        REFERENCES public.empresa (codigo) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE NO ACTION,
    CONSTRAINT rut_update FOREIGN KEY (rut)
        REFERENCES public.usuario (rut) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE NO ACTION
);


CREATE TABLE public.pauta_mantenimiento
(
    codigo integer NOT NULL,
    nombre text  NOT NULL,
    version text NOT NULL,
    cantidad_periodo integer NOT NULL,
    tipo_periodo text NOT NULL,
    estado text  NOT NULL,
    clase text  NOT NULL,
    fecha_creacion date NOT NULL,
    equipo text  NOT NULL,
    empresa text NOT NULL,
    CONSTRAINT pauta_mantenimiento_pkey PRIMARY KEY (codigo),
    CONSTRAINT pauta_mantenimiento_empresa_fkey FOREIGN KEY (empresa)
        REFERENCES public.empresa (codigo) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT pauta_mantenimiento_equipo_fkey FOREIGN KEY (equipo)
        REFERENCES public.equipo (codigo) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);



CREATE TABLE public.planificador
(
    rut character varying(12)  NOT NULL,
    CONSTRAINT planificador_pkey PRIMARY KEY (rut),
    CONSTRAINT rut_update FOREIGN KEY (rut)
        REFERENCES public.usuario (rut) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE NO ACTION
);


CREATE TABLE public.posicion_gps
(
    id integer NOT NULL,
    easting double  NOT NULL,
    northing double  NOT NULL,
    elevation double  NOT NULL,
    date timestamp without time zone NOT NULL,
    equipo text ,
    CONSTRAINT posicion_gps_pkey PRIMARY KEY (id),
    CONSTRAINT posicion_gps_equipo_fkey FOREIGN KEY (equipo)
        REFERENCES public.equipo (codigo) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);



CREATE TABLE public.respuesta_item
(
    codigo integer NOT NULL,
    codigo_item text  NOT NULL,
    codigo_subitem text  NOT NULL,
    ficha_atencion integer NOT NULL,
    observacion text NOT NULL,
    estado_recepcion text  NOT NULL,
    estado_entrega text  NOT NULL,
    CONSTRAINT respuesta_item_pkey PRIMARY KEY (codigo),
    CONSTRAINT respuesta_item_codigo_item_fkey FOREIGN KEY (codigo_item)
        REFERENCES public.item (codigo) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT respuesta_item_codigo_subitem_fkey FOREIGN KEY (codigo_subitem)
        REFERENCES public.subitem (codigo) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT respuesta_item_ficha_atencion_fkey FOREIGN KEY (ficha_atencion)
        REFERENCES public.ficha_atencion (codigo) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);


CREATE TABLE public.subitem
(
    codigo text  NOT NULL,
    nombre text  NOT NULL,
    codigo_item text  NOT NULL,
    CONSTRAINT subitem_pkey PRIMARY KEY (codigo),
    CONSTRAINT subitem_codigo_item_fkey FOREIGN KEY (codigo_item)
        REFERENCES public.item (codigo) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);


CREATE TABLE public.tipo_usuario
(
    rut text  NOT NULL,
    tipo text  NOT NULL,
    CONSTRAINT tipo_usuario_pkey PRIMARY KEY (rut),
    CONSTRAINT rut_update FOREIGN KEY (rut)
        REFERENCES public.usuario (rut) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE NO ACTION
);



CREATE TABLE public.usuario
(
    rut character varying(12)  NOT NULL,
    email text  NOT NULL,
    password text  NOT NULL,
    nombre character varying ,
    activo character varying ,
    CONSTRAINT usuario_pkey PRIMARY KEY (rut)
);
