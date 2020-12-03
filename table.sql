create table provinces(
	id serial not null primary key,
	description text not null
);

create table clients (
	id serial not null primary key,
    contact_details text not null,
	province_id int,
    branch text not null,
    email_address text not null,
    postal_code text not null,
    business_tell text not null,
    cell text not null,
    status text not null,
	foreign key (category_id) references categories(id)
    insert into 

);
insert into provinces (contact_details,province_id,branch,email_address,postal_code,business_tell,cell,status)values ('Yaasier Haroun','Wynberg','64 Main Road, 2nd Floor, Old Absa Building64 Main Road, 2nd Floor, Old Absa Building','wynbergbranch@credit-rescue.co.za','7800','217620039','N/A','N/A','Active');
insert into provinces (contact_details,province_id,branch,email_address,postal_code,business_tell,cell,status)values ('ARTHUR RANDALL','Vredenburg','Unit 4, Medical Centre, Hill Street, 2nd Floor, Old Absa Building64 Main Road, 2nd Floor, Old Absa Building','leon.gm@credit-rescue.co.za','7380','223000186','0796064171/0731797919','N/A','Active');

alter table categories add constraint uniq_desc_constraint unique(description);

