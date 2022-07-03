
insert into player (ply_name,ply_passwd) values ('John','Doe');
insert into player (ply_name,ply_passwd) values ('Mary','Jane');

insert into match (mt_extra) values (NULL);

insert into playermatch (pm_player_id,pm_match_id,pm_x,pm_y,pm_state,pm_count,pm_extra) values (1,1,1,1,'FirstPlay',3,'N');
insert into playermatch (pm_player_id,pm_match_id,pm_x,pm_y,pm_state,pm_count,pm_extra) values (2,1,8,8,'FirstPlay',3,'S');

insert into playeraction (pa_pm_id,pa_name,pa_state,pa_extra) values (1,'Attack','Hand',NULL);
insert into playeraction (pa_pm_id,pa_name,pa_state,pa_extra) values (1,'Right','Hand',NULL);
insert into playeraction (pa_pm_id,pa_name,pa_state,pa_extra) values (1,'Forward','Hand',NULL);
insert into playeraction (pa_pm_id,pa_name,pa_state,pa_extra) values (2,'Attack','Hand',NULL);
insert into playeraction (pa_pm_id,pa_name,pa_state,pa_extra) values (2,'Left','Hand',NULL);
insert into playeraction (pa_pm_id,pa_name,pa_state,pa_extra) values (2,'Forward','Hand',NULL);
