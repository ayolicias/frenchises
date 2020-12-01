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

alter table categories add constraint uniq_desc_constraint unique(description);

