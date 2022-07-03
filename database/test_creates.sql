
 create table player (
        	ply_id serial not null,
            ply_name VARCHAR(60),
            ply_passwd VARCHAR(60),
            primary key(ply_id)
    );

 create table match (
        	mt_id serial not null,
            mt_extra VARCHAR(60),	
			primary key(mt_id)
    );

 create table matchobject (
        	mo_id serial not null,
			mo_match_id  INT not null,
		    mo_x INT not null,	
			mo_y INT not null,
			mo_state VARCHAR(60),
			mo_extra VARCHAR(60),
            primary key(mo_id)
    );

 create table playermatch (
        	pm_id serial not null,
            pm_player_id INT not null,
			pm_match_id INT not null,
			pm_x INT not null,	
			pm_y INT not null,
			pm_state VARCHAR(60),
			pm_count INT not null,
			pm_extra VARCHAR(60),
            primary key(pm_id)
    );

create table playeraction (
        	pa_id serial not null,
            pa_pm_id INT not null,
			pa_name  VARCHAR(60),
			pa_state VARCHAR(60),
			pa_extra VARCHAR(60),
            primary key(pa_id)
 );


alter table playermatch 
add constraint pm_fk_player
foreign key (pm_player_id) references player(ply_id) 
ON DELETE NO ACTION ON UPDATE NO ACTION;

alter table playermatch 
add constraint pm_fk_match
foreign key (pm_match_id) references match(mt_id) 
ON DELETE NO ACTION ON UPDATE NO ACTION;

alter table matchobject 
add constraint mo_fk_match
foreign key (mo_match_id) references match(mt_id) 
ON DELETE NO ACTION ON UPDATE NO ACTION;

alter table playeraction
add constraint pa_fk_pm
foreign key (pa_pm_id) references playermatch(pm_id) 
ON DELETE NO ACTION ON UPDATE NO ACTION;
