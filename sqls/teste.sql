INSERT INTO administrador (rut) VALUES {
    ('197698802');
}







insert into calendario(codigo, codigo_equipo, rut_mantenedor, fecha_estimada, codigo_pauta, rut_planificador)
values('3', '123123', 'dieku', '2021/07/14', 1, 'belen')

insert into calendario(codigo, codigo_equipo, rut_mantenedor, fecha_estimada, codigo_pauta, rut_planificador)
values('2', '123123', 'dieku', '2021/06/15', 1, 'belen')

insert into calendario(codigo, codigo_equipo, rut_mantenedor, fecha_estimada, codigo_pauta, rut_planificador)
values('1', '123123', 'dieku', '2021/06/15', 1, 'belen')








select 
	*
from pauta_mantenimiento p 
inner join item i 
on i.codigo_pauta = p.codigo
inner join subitem si
on si.codigo_item = i.codigo
inner join equipo e
on e.codigo = p.equipo
inner join calendario c
on c.codigo_pauta = p.codigo
where p.codigo = 1


select * from pauta_mantenimiento p
inner join item i
on i.codigo_pauta = p.codigo
inner join subitem si 
on si.codigo_item = i.codigo
where p.codigo = 1


select 
	c.codigo codigo_calendario,
	pm.nombre nombre_pauta,
	pm.codigo codigo_pauta,
	c.fecha_estimada fecha_realizar,
	e.ubicacion ubicacion
from calendario c
inner join pauta_mantenimiento pm
on c.codigo_pauta = pm.codigo
inner join equipo e
on e.codigo = c.codigo_equipo
where c.rut_mantenedor = 'dieku'