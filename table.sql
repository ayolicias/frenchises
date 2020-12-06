
create table provinces(
    id serial not null primary key,
    province_name varchar(100)not null,
    contact_details text not null,
	branch text not null,
    address text not null,
    email_address text not null,
    postal_code text not null,
    business_tell text not null,
    cell text not null,
    status text not null
);
    
create table client(
	id serial not null primary key,
    province_name varchar(100)not null,
    contact_details text not null,
	branch text not null,
    address text not null,
    email_address text not null,
    postal_code text not null,
    business_tell text not null,
    cell text not null,
    status text not null,
	province_id int,
	foreign key (province_id) references provinces(id)
);

alter table provinces add constraint uniq_desc_constraint unique(contact_details);




