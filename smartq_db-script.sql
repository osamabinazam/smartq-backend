-- This script was generated by the ERD tool in pgAdmin 4.
-- Please log an issue at https://github.com/pgadmin-org/pgadmin4/issues/new/choose if you find any bugs, including reproduction steps.
BEGIN;


CREATE TABLE IF NOT EXISTS public.appointments
(
    "appointmentID" uuid NOT NULL,
    "appointmentDateTime" timestamp with time zone NOT NULL,
    "appointmentStatus" "enum_appointments_appointmentStatus" NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    customerprofileid uuid,
    vendorprofileid uuid,
    serviceid uuid,
    queueid uuid,
    requestid uuid,
    CONSTRAINT appointments_pkey PRIMARY KEY ("appointmentID")
);

CREATE TABLE IF NOT EXISTS public.categories
(
    categoryid uuid NOT NULL,
    categoryname character varying(100) COLLATE pg_catalog."default" NOT NULL,
    parentcategoryid uuid,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    vendorprofileid uuid,
    CONSTRAINT categories_pkey PRIMARY KEY (categoryid)
);

CREATE TABLE IF NOT EXISTS public.certificates
(
    certificateid uuid NOT NULL,
    title character varying(255) COLLATE pg_catalog."default" NOT NULL,
    college character varying(255) COLLATE pg_catalog."default" NOT NULL,
    start_date date NOT NULL,
    end_date date,
    certificate_url text COLLATE pg_catalog."default",
    image_url text COLLATE pg_catalog."default",
    created_at timestamp with time zone,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT certificates_pkey PRIMARY KEY (certificateid)
);

CREATE TABLE IF NOT EXISTS public.contacts
(
    contactid uuid NOT NULL,
    phone character varying(20) COLLATE pg_catalog."default",
    contactaddress text COLLATE pg_catalog."default",
    city character varying(255) COLLATE pg_catalog."default",
    state character varying(255) COLLATE pg_catalog."default",
    postalcode character varying(20) COLLATE pg_catalog."default",
    country character varying(255) COLLATE pg_catalog."default",
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    userid uuid,
    CONSTRAINT contacts_pkey PRIMARY KEY (contactid)
);

CREATE TABLE IF NOT EXISTS public.customer_profiles
(
    customerprofileid uuid NOT NULL,
    firstname character varying(255) COLLATE pg_catalog."default" NOT NULL,
    lastname character varying(255) COLLATE pg_catalog."default" NOT NULL,
    emailaddress character varying(255) COLLATE pg_catalog."default" NOT NULL,
    dateofbirth date,
    preferences jsonb,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    userid uuid,
    CONSTRAINT customer_profiles_pkey PRIMARY KEY (customerprofileid),
    CONSTRAINT customer_profiles_emailaddress_key UNIQUE (emailaddress)
);

CREATE TABLE IF NOT EXISTS public.customer_search_history
(
    "searchID" uuid NOT NULL,
    "searchParameters" jsonb,
    "searchDate" timestamp with time zone,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    customerprofileid uuid,
    CONSTRAINT customer_search_history_pkey PRIMARY KEY ("searchID")
);

CREATE TABLE IF NOT EXISTS public.customer_search_preferences
(
    "preferenceID" uuid NOT NULL,
    "searchRadius" integer,
    "preferredCategories" text COLLATE pg_catalog."default",
    "preferredPriceRange" numeric,
    "preferredRating" numeric(2, 1),
    "lastSearch" timestamp with time zone,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    customerprofileid uuid,
    CONSTRAINT customer_search_preferences_pkey PRIMARY KEY ("preferenceID")
);

CREATE TABLE IF NOT EXISTS public.educations
(
    educationid uuid NOT NULL,
    school character varying(255) COLLATE pg_catalog."default" NOT NULL,
    startat date,
    endat date,
    degree character varying(255) COLLATE pg_catalog."default",
    description text COLLATE pg_catalog."default",
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    vendorprofileid uuid,
    certificateid uuid,
    CONSTRAINT educations_pkey PRIMARY KEY (educationid)
);

CREATE TABLE IF NOT EXISTS public.locations
(
    locationid uuid NOT NULL,
    address text COLLATE pg_catalog."default",
    city character varying(255) COLLATE pg_catalog."default",
    state character varying(255) COLLATE pg_catalog."default",
    postalcode character varying(20) COLLATE pg_catalog."default",
    longitude double precision,
    latitude double precision,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    vendorprofileid uuid,
    CONSTRAINT locations_pkey PRIMARY KEY (locationid)
);

CREATE TABLE IF NOT EXISTS public.opening_hours
(
    openinghoursid uuid NOT NULL,
    weekday character varying(10) COLLATE pg_catalog."default",
    opentime time without time zone,
    closetime time without time zone,
    isclosed boolean,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    vendorprofileid uuid,
    CONSTRAINT opening_hours_pkey PRIMARY KEY (openinghoursid)
);

CREATE TABLE IF NOT EXISTS public.queues
(
    "queueID" uuid NOT NULL,
    "currentQueueSize" integer NOT NULL,
    "averageServiceTime" bigint,
    "queueStartTime" time without time zone,
    "queueEndTime" time without time zone,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    customerprofileid uuid,
    vendorprofileid uuid,
    CONSTRAINT queues_pkey PRIMARY KEY ("queueID")
);

CREATE TABLE IF NOT EXISTS public.requests
(
    "requestID" uuid NOT NULL,
    "additionalNotes" text COLLATE pg_catalog."default",
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    customerprofileid uuid,
    vendorprofileid uuid,
    queueid uuid,
    serviceid uuid,
    categoryid uuid,
    locationid uuid,
    operatinghoursid uuid,
    CONSTRAINT requests_pkey PRIMARY KEY ("requestID")
);

CREATE TABLE IF NOT EXISTS public.services
(
    serviceid uuid NOT NULL,
    name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default",
    price numeric(10, 2),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    vendorprofileid uuid,
    categoryid uuid,
    CONSTRAINT services_pkey PRIMARY KEY (serviceid)
);

CREATE TABLE IF NOT EXISTS public.social_media_accounts
(
    socialmediaid uuid NOT NULL,
    link text COLLATE pg_catalog."default",
    platform character varying(255) COLLATE pg_catalog."default",
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    vendorprofileid uuid,
    CONSTRAINT social_media_accounts_pkey PRIMARY KEY (socialmediaid)
);

CREATE TABLE IF NOT EXISTS public.users
(
    userid uuid NOT NULL,
    username character varying(50) COLLATE pg_catalog."default" NOT NULL,
    email character varying(100) COLLATE pg_catalog."default" NOT NULL,
    gender enum_users_gender,
    password character varying(255) COLLATE pg_catalog."default" NOT NULL,
    lastlogin timestamp with time zone,
    usertype enum_users_usertype DEFAULT 'customer'::enum_users_usertype,
    isactive boolean DEFAULT true,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (userid),
    CONSTRAINT users_email_key UNIQUE (email),
    CONSTRAINT users_username_key UNIQUE (username)
);

CREATE TABLE IF NOT EXISTS public.vendor_profiles
(
    vendorprofileid uuid NOT NULL,
    businessname character varying(255) COLLATE pg_catalog."default",
    businesstype character varying(255) COLLATE pg_catalog."default",
    bio text COLLATE pg_catalog."default",
    dob date,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    userid uuid,
    CONSTRAINT vendor_profiles_pkey PRIMARY KEY (vendorprofileid)
);

ALTER TABLE IF EXISTS public.appointments
    ADD CONSTRAINT appointments_customerprofileid_fkey FOREIGN KEY (customerprofileid)
    REFERENCES public.customer_profiles (customerprofileid) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE SET NULL;


ALTER TABLE IF EXISTS public.appointments
    ADD CONSTRAINT appointments_queueid_fkey FOREIGN KEY (queueid)
    REFERENCES public.queues ("queueID") MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE SET NULL;


ALTER TABLE IF EXISTS public.appointments
    ADD CONSTRAINT appointments_requestid_fkey FOREIGN KEY (requestid)
    REFERENCES public.requests ("requestID") MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE SET NULL;


ALTER TABLE IF EXISTS public.appointments
    ADD CONSTRAINT appointments_serviceid_fkey FOREIGN KEY (serviceid)
    REFERENCES public.services (serviceid) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE SET NULL;


ALTER TABLE IF EXISTS public.appointments
    ADD CONSTRAINT appointments_vendorprofileid_fkey FOREIGN KEY (vendorprofileid)
    REFERENCES public.vendor_profiles (vendorprofileid) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE SET NULL;


ALTER TABLE IF EXISTS public.categories
    ADD CONSTRAINT categories_parentcategoryid_fkey FOREIGN KEY (parentcategoryid)
    REFERENCES public.categories (categoryid) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public.categories
    ADD CONSTRAINT categories_vendorprofileid_fkey FOREIGN KEY (vendorprofileid)
    REFERENCES public.vendor_profiles (vendorprofileid) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE SET NULL;


ALTER TABLE IF EXISTS public.contacts
    ADD CONSTRAINT contacts_userid_fkey FOREIGN KEY (userid)
    REFERENCES public.users (userid) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE SET NULL;


ALTER TABLE IF EXISTS public.customer_profiles
    ADD CONSTRAINT customer_profiles_userid_fkey FOREIGN KEY (userid)
    REFERENCES public.users (userid) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE SET NULL;


ALTER TABLE IF EXISTS public.customer_search_history
    ADD CONSTRAINT customer_search_history_customerprofileid_fkey FOREIGN KEY (customerprofileid)
    REFERENCES public.customer_profiles (customerprofileid) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE SET NULL;


ALTER TABLE IF EXISTS public.customer_search_preferences
    ADD CONSTRAINT customer_search_preferences_customerprofileid_fkey FOREIGN KEY (customerprofileid)
    REFERENCES public.customer_profiles (customerprofileid) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE SET NULL;


ALTER TABLE IF EXISTS public.educations
    ADD CONSTRAINT educations_certificateid_fkey FOREIGN KEY (certificateid)
    REFERENCES public.certificates (certificateid) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE SET NULL;


ALTER TABLE IF EXISTS public.educations
    ADD CONSTRAINT educations_vendorprofileid_fkey FOREIGN KEY (vendorprofileid)
    REFERENCES public.vendor_profiles (vendorprofileid) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE SET NULL;


ALTER TABLE IF EXISTS public.locations
    ADD CONSTRAINT locations_vendorprofileid_fkey FOREIGN KEY (vendorprofileid)
    REFERENCES public.vendor_profiles (vendorprofileid) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE SET NULL;


ALTER TABLE IF EXISTS public.opening_hours
    ADD CONSTRAINT opening_hours_vendorprofileid_fkey FOREIGN KEY (vendorprofileid)
    REFERENCES public.vendor_profiles (vendorprofileid) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE SET NULL;


ALTER TABLE IF EXISTS public.queues
    ADD CONSTRAINT queues_customerprofileid_fkey FOREIGN KEY (customerprofileid)
    REFERENCES public.customer_profiles (customerprofileid) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE SET NULL;


ALTER TABLE IF EXISTS public.queues
    ADD CONSTRAINT queues_vendorprofileid_fkey FOREIGN KEY (vendorprofileid)
    REFERENCES public.vendor_profiles (vendorprofileid) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE SET NULL;


ALTER TABLE IF EXISTS public.requests
    ADD CONSTRAINT requests_categoryid_fkey FOREIGN KEY (categoryid)
    REFERENCES public.categories (categoryid) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE SET NULL;


ALTER TABLE IF EXISTS public.requests
    ADD CONSTRAINT requests_customerprofileid_fkey FOREIGN KEY (customerprofileid)
    REFERENCES public.customer_profiles (customerprofileid) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE SET NULL;


ALTER TABLE IF EXISTS public.requests
    ADD CONSTRAINT requests_locationid_fkey FOREIGN KEY (locationid)
    REFERENCES public.locations (locationid) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE SET NULL;


ALTER TABLE IF EXISTS public.requests
    ADD CONSTRAINT requests_operatinghoursid_fkey FOREIGN KEY (operatinghoursid)
    REFERENCES public.opening_hours (openinghoursid) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE SET NULL;


ALTER TABLE IF EXISTS public.requests
    ADD CONSTRAINT requests_queueid_fkey FOREIGN KEY (queueid)
    REFERENCES public.queues ("queueID") MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE SET NULL;


ALTER TABLE IF EXISTS public.requests
    ADD CONSTRAINT requests_serviceid_fkey FOREIGN KEY (serviceid)
    REFERENCES public.services (serviceid) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE SET NULL;


ALTER TABLE IF EXISTS public.requests
    ADD CONSTRAINT requests_vendorprofileid_fkey FOREIGN KEY (vendorprofileid)
    REFERENCES public.vendor_profiles (vendorprofileid) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE SET NULL;


ALTER TABLE IF EXISTS public.services
    ADD CONSTRAINT services_categoryid_fkey FOREIGN KEY (categoryid)
    REFERENCES public.categories (categoryid) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE SET NULL;


ALTER TABLE IF EXISTS public.services
    ADD CONSTRAINT services_vendorprofileid_fkey FOREIGN KEY (vendorprofileid)
    REFERENCES public.vendor_profiles (vendorprofileid) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE SET NULL;


ALTER TABLE IF EXISTS public.social_media_accounts
    ADD CONSTRAINT social_media_accounts_vendorprofileid_fkey FOREIGN KEY (vendorprofileid)
    REFERENCES public.vendor_profiles (vendorprofileid) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE SET NULL;


ALTER TABLE IF EXISTS public.vendor_profiles
    ADD CONSTRAINT vendor_profiles_userid_fkey FOREIGN KEY (userid)
    REFERENCES public.users (userid) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE SET NULL;

END;