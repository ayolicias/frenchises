create table provinces(
	id serial not null primary key,
	province_id text not null
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
	foreign key (province_id) references provinces(id)
    insert into 

insert into provinces (province_id,contact_details branch,email_address,postal_code,business_tell,cell,status)values ('Cape Town','Yaasier Haroun','Wynberg','64 Main Road, 2nd Floor, Old Absa Building','wynbergbranch@credit-rescue.co.za','7800','217620039'.'N/A','Active');
insert into provinces (province_id,contact_details,branch,email_address,postal_code,business_tell,cell,status)values ('Gauteng','Meryl','Braamfontein','222 Smit Street, Braamfontein','222 Smit Street, Braamfontein','2001','117207733','614255202/0828901693','Active');
insert into provinces (province_id,contact_details,branch,,email_address,postal_code,business_tell,cell,status)values ('KZN','Johannes M','Durban','320 Smith Street, 11th Floor, Office 1103, Mercury Building','durbanbranch@credit-rescue.co.za','4000','313011275','N/A','N/A');

alter table provinces add constraint uniq_desc_constraint unique(province_id);

