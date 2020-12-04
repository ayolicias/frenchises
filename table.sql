
create table provinces(
    id serial not null primary key,
    contact_details text not null,
	branch text not null,
    email_address text not null,
    postal_code text not null,
    business_tell text not null,
    cell text not null,
    status text not null,
    
create table client(
	id serial not null primary key,
    contact_details text not null,
	branch text not null,
    email_address text not null,
    postal_code text not null,
    business_tell text not null,
    cell text not null,
    status text not null,
	province_id int,
	foreign key (province_id) references provinces(id)
);
alter table provinces add constraint uniq_desc_constraint unique(contact_details);

insert into provinces (contact_details,branch,email_address,postal_code,business_tell,cell,status)values ('Yaasier Haroun','Wynberg','64 Main Road, 2nd Floor, Old Absa Building','wynbergbranch@credit-rescue.co.za','7800','217620039','Active');
insert into provinces (contact_details,branch,email_address,postal_code,business_tell,cell,status)values ('ARTHUR RANDALL','Vredenburg','Unit 4, Medical Centre, Hill Street','leon.gm@credit-rescue.co.za,''7380','223000186','0796064171/0731797919','Active');

insert into towns (town_name,initials)values ('','');

