-- Ensure the UUID extension is available
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Check and create user_type_enum if it does not exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_type_enum') THEN
        CREATE TYPE user_type_enum AS ENUM ('vendor', 'customer', 'admin');
    END IF;
END$$;

-- Check and create gender_enum if it does not exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'gender_enum') THEN
        CREATE TYPE gender_enum AS ENUM ('male', 'female', 'other');
    END IF;
END$$;

-- Check and create appointment_status_enum if it does not exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'appointment_status_enum') THEN
        CREATE TYPE appointment_status_enum AS ENUM ('scheduled', 'completed', 'cancelled', 'rescheduled');
    END IF;
END$$;

-- Drop the users table if it exists to prevent errors
DROP TABLE IF EXISTS public.users CASCADE;

-- Create the users table with specified columns and constraints
CREATE TABLE IF NOT EXISTS public.users
(
    userid uuid NOT NULL DEFAULT uuid_generate_v4(),
    username character varying(50) NOT NULL,
    email character varying(100) NOT NULL,
    gender gender_enum,
    password character varying(255) NOT NULL,
    registrationdate timestamp without time zone,
    lastlogindate timestamp without time zone,
    usertype user_type_enum,
    isactive boolean,
    CONSTRAINT "User_pkey" PRIMARY KEY (userid),
    CONSTRAINT "User_email_key" UNIQUE (email),
    CONSTRAINT "User_username_key" UNIQUE (username)
);


-- Drop the certificates table if it exists
DROP TABLE IF EXISTS public.certificates CASCADE;

-- Create the certificates table with specified columns and constraints
CREATE TABLE public.certificates
(
    certificateid uuid NOT NULL DEFAULT uuid_generate_v4(),
    title character varying(255) NOT NULL,
    college character varying(255) NOT NULL, -- Fixed typo 'collage' to 'college'
    start_date date NOT NULL,
    end_date date,
    certificate_url text, -- Changed from bit varying to text for URLs
    image_url text, -- Changed from bit varying to text for image URLs
    created_at timestamp without time zone,
    CONSTRAINT "Certificates_pkey" PRIMARY KEY (certificateid)
);

-- Drop the Category table if it exists
DROP TABLE IF EXISTS public.category CASCADE;

-- Create the category table with specified columns and constraints
CREATE TABLE IF NOT EXISTS public.category
(
    categoryid uuid NOT NULL DEFAULT uuid_generate_v4(),
    categoryname character varying(100) NOT NULL,
    parentcategoryid uuid,
    CONSTRAINT "Category_pkey" PRIMARY KEY (categoryid),
    CONSTRAINT fk_category_parent FOREIGN KEY(parentcategoryid) REFERENCES public.category(categoryid) ON DELETE SET NULL
);

-- Drop the service table if it exists
DROP TABLE IF EXISTS public.services CASCADE;

-- create the service table with specified columns and constraints
CREATE TABLE IF NOT EXISTS public.services
(
    serviceid uuid NOT NULL DEFAULT uuid_generate_v4(),
    categoryid uuid NOT NULL,
    name character varying(100) NOT NULL,
    description text,
    price numeric(10,2),
    CONSTRAINT "Services_pkey" PRIMARY KEY (serviceid),
    CONSTRAINT fk_services_category FOREIGN KEY(categoryid) REFERENCES public.category(categoryid)
);


-- Drop the socialmedia table if it exists
DROP TABLE IF EXISTS public.social_media CASCADE;

-- Create the socialmedia table with specified columns and constraints
CREATE TABLE IF NOT EXISTS public.social_media
(
    socialmediaid uuid NOT NULL DEFAULT uuid_generate_v4(),
    vendorid uuid NOT NULL,
    link text,
    platform character varying(255),
    CONSTRAINT "SocialMedia_pkey" PRIMARY KEY (socialmediaid),
    CONSTRAINT fk_socialmedia_vendor FOREIGN KEY(vendorid) REFERENCES public.users(userid) ON DELETE SET NULL
);


-- Drop the education table if exists
DROP TABLE IF EXISTS public.education CASCADE;

-- Create the education table 
CREATE TABLE IF NOT EXISTS public.education
(
    educationid uuid NOT NULL DEFAULT uuid_generate_v4(),
    school character varying(255) NOT NULL,
    startat date,
    endat date,
    degree character varying(255),
    description text,
    certificateid uuid,
    CONSTRAINT "Education_pkey" PRIMARY KEY (educationid),
    CONSTRAINT fk_education_certificate FOREIGN KEY(certificateid) REFERENCES public.certificates(certificateid)
);


-- Drop the location table if it exists
DROP TABLE IF EXISTS public.location CASCADE;

-- Create the location table with specified columns and constraints
CREATE TABLE IF NOT EXISTS public.location
(
    locationid uuid NOT NULL DEFAULT uuid_generate_v4(),
    address text,
    city character varying(255),
    state character varying(255),
    postalcode character varying(20),
    longitude float,
    latitude float,
    CONSTRAINT "Location_pkey" PRIMARY KEY (locationid)
);

-- Drop the contact table if it exists
DROP TABLE IF EXISTS public.contact CASCADE;

-- Create the contact table with specified columns and constraints
CREATE TABLE IF NOT EXISTS public.contact
(
    contactid uuid NOT NULL DEFAULT uuid_generate_v4(),
    userid uuid NOT NULL,
    phone character varying(20),
    email character varying(255),
    contactaddress text,
    city character varying(255),
    state character varying(255),
    postalcode character varying(20),
    country character varying(255),
    CONSTRAINT "Contact_pkey" PRIMARY KEY (contactid),
    CONSTRAINT fk_contact_vendor FOREIGN KEY(userid) REFERENCES public.users(userid) ON DELETE SET NULL
);

-- Drop the opening_hours table if it exists
DROP TABLE IF EXISTS public.opening_hours CASCADE;

-- Create the opening_hours table with specified columns and constraints
CREATE TABLE IF NOT EXISTS public.opening_hours
(
    openinghoursid uuid NOT NULL DEFAULT uuid_generate_v4(),
    weekday character varying(10),
    opentime time without time zone,
    closetime time without time zone,
    isclosed boolean,
    CONSTRAINT "OpeningHours_pkey" PRIMARY KEY (openinghoursid)
);

-- Drop the profile table if it exists
DROP TABLE IF EXISTS public.vendor_profile CASCADE;

-- Create the profile table with specified columns and foreign key constraints
CREATE TABLE IF NOT EXISTS public.vendor_profile
(
    vendorprofileid uuid NOT NULL DEFAULT uuid_generate_v4(),
    userid uuid NOT NULL,
    businessname character varying(255),
    businesstype character varying(255),
    bio text,
    dob date,
    createdate timestamp without time zone,
    updatedate timestamp without time zone,
    contactid uuid,
    openinghoursid uuid,
    socialmedialinksid uuid,
    locationid uuid,
    certificateid uuid,
    educationid uuid,
    CONSTRAINT "VendorProfile_pkey" PRIMARY KEY (vendorprofileid),
    CONSTRAINT fk_vendorprofile_user FOREIGN KEY(userid) REFERENCES public.users(userid),
    CONSTRAINT fk_vendorprofile_location FOREIGN KEY(locationid) REFERENCES public.location(locationid),
    CONSTRAINT fk_vendorprofile_openinghours FOREIGN KEY(openinghoursid) REFERENCES public.opening_hours(openinghoursid),
    CONSTRAINT fk_vendorprofile_certificate FOREIGN KEY(certificateid) REFERENCES public.certificates(certificateid),
    CONSTRAINT fk_vendorprofile_education FOREIGN KEY(educationid) REFERENCES public.education(educationid),
    CONSTRAINT fk_vendorprofile_socialmedia FOREIGN KEY(socialmedialinksid) REFERENCES public.social_media(socialmediaid),
    CONSTRAINT fk_vendorprofile_contact FOREIGN KEY(contactid) REFERENCES public.contact(contactid)
);


-- Drop the customer_profile table if it exists
DROP TABLE IF EXISTS public.customer_profile CASCADE;

-- Create the customer_profile table
CREATE TABLE IF NOT EXISTS public.customer_profile
(
    customerprofileid uuid NOT NULL DEFAULT uuid_generate_v4(),
    userid uuid NOT NULL,
    firstname character varying(255) NOT NULL,
    lastname character varying(255) NOT NULL,
    emailaddress character varying(255) NOT NULL UNIQUE,
    dateofbirth date,
    preferences jsonb,
    contactid uuid,
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updatedat timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "CustomerProfile_pkey" PRIMARY KEY (customerprofileid),
    CONSTRAINT fk_customerprofile_user FOREIGN KEY(userid) REFERENCES public.users(userid),
    CONSTRAINT fk_customerprofile_contact FOREIGN KEY(contactid) REFERENCES public.contact(contactid)
);



-- Drop the queue table if it exists
DROP TABLE IF EXISTS public.queue CASCADE;

-- Create the queue table with specified columns and constraints
CREATE TABLE IF NOT EXISTS public.queue (
    queueID uuid PRIMARY KEY,
    vendorProfileID uuid NOT NULL,
    currentQueueSize INTEGER NOT NULL,
    averageServiceTime INTERVAL,
    queueStartTime TIME WITHOUT TIME ZONE,
    queueEndTime TIME WITHOUT TIME ZONE,
    FOREIGN KEY (vendorProfileID) REFERENCES public.vendor_profile(vendorprofileid)
);

-- Drop the appointment table if it exists
DROP TABLE IF EXISTS public.appointment CASCADE;

-- Create the appointment table with specified columns and constraints
CREATE TABLE IF NOT EXISTS public.appointment (
    appointmentID uuid PRIMARY KEY,
    customerProfileID uuid NOT NULL,
    vendorProfileID uuid NOT NULL,
    queueID uuid,
    serviceID uuid NOT NULL,
    appointmentDateTime TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    appointmentStatus appointment_status_enum NOT NULL,
--     appointmentType appointment_type_enum NOT NULL,
    FOREIGN KEY (customerProfileID) REFERENCES public.customer_profile(customerprofileid),
    FOREIGN KEY (vendorProfileID) REFERENCES public.vendor_profile(vendorprofileid),
    FOREIGN KEY (queueID) REFERENCES public.queue(queueID),
    FOREIGN KEY (serviceID) REFERENCES public.services(serviceid)
);

-- Drop the request table if it exists
DROP TABLE IF EXISTS public.request CASCADE;

-- Create the request table with specified columns and constraints
CREATE TABLE IF NOT EXISTS public.request (
    requestID uuid PRIMARY KEY,
    customerProfileID uuid NOT NULL,
    vendorProfileID uuid NOT NULL,
    serviceID uuid NOT NULL,
    requestDateTime TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    additionalNotes TEXT,
    FOREIGN KEY (customerProfileID) REFERENCES public.customer_profile(customerprofileid),
    FOREIGN KEY (vendorProfileID) REFERENCES public.vendor_profile(vendorprofileid),
    FOREIGN KEY (serviceID) REFERENCES public.services(serviceid)
);

-- Drop the customer_search_preferences table if it exists
DROP TABLE IF EXISTS public.customer_search_preferences CASCADE;

-- Create the customer_search_preferences table
CREATE TABLE IF NOT EXISTS public.customer_search_preferences (
    preferenceID uuid NOT NULL DEFAULT uuid_generate_v4(),
    customerProfileID uuid NOT NULL,
    searchRadius INTEGER,
    preferredCategories TEXT,
    preferredPriceRange NUMERIC,
    preferredRating DECIMAL(2, 1),
    lastSearch TIMESTAMP WITHOUT TIME ZONE,
    FOREIGN KEY (customerProfileID) REFERENCES public.customer_profile(customerProfileID),
    CONSTRAINT "SearchPreferences_pkey" PRIMARY KEY (preferenceID)
);


-- Create the vendor_discovery table
CREATE TABLE IF NOT EXISTS public.vendor_discovery (
    vendorDiscoveryID uuid NOT NULL DEFAULT uuid_generate_v4(),
    vendorProfileID uuid NOT NULL,
    serviceName character varying (255),
    serviceCategory character varying(255),
    location character varying(255),
    rating DECIMAL(2, 1),
    FOREIGN KEY (vendorProfileID) REFERENCES public.vendor_profile(vendorprofileid),
    CONSTRAINT "VendorDiscovery_pkey" PRIMARY KEY (vendorDiscoveryID)
);

-- Create the customer_favorites table
CREATE TABLE IF NOT EXISTS public.customer_favorites (
    favoriteID uuid NOT NULL DEFAULT uuid_generate_v4(),
    customerProfileID uuid NOT NULL,
    vendorProfileID uuid NOT NULL,
    addedDate TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customerProfileID) REFERENCES public.customer_profile(customerProfileID),
    FOREIGN KEY (vendorProfileID) REFERENCES public.vendor_profile(vendorProfileID),
    CONSTRAINT "CustomerFavorites_pkey" PRIMARY KEY (favoriteID)
);

-- Create the customer_reviews table
CREATE TABLE IF NOT EXISTS public.customer_reviews (
    reviewID uuid NOT NULL DEFAULT uuid_generate_v4(),
    customerProfileID uuid NOT NULL,
    vendorProfileID uuid NOT NULL,
    serviceID uuid NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    reviewText TEXT,
    reviewDate TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customerProfileID) REFERENCES public.customer_profile(customerProfileID),
    FOREIGN KEY (vendorProfileID) REFERENCES public.vendor_profile(vendorProfileID),
    FOREIGN KEY (serviceID) REFERENCES public.services(serviceID),
    CONSTRAINT "CustomerReviews_pkey" PRIMARY KEY (reviewID)
);


--Drop table if exists
DROP TABLE IF EXISTS public.search_history_table;
-- Create the customer_search_history table
CREATE TABLE IF NOT EXISTS public.customer_search_history (
    searchID uuid NOT NULL DEFAULT uuid_generate_v4(),
    customerProfileID uuid NOT NULL,
    searchParameters JSONB,
    searchDate TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customerProfileID) REFERENCES public.customer_profile(customerProfileID),
    CONSTRAINT "SearchHistory_pkey" PRIMARY KEY (searchID)
);








-- Transfering ownership

-- Set the owner of the users  table  to postgres
ALTER TABLE public.users
	OWNER to postgres;
	
-- Set the owner of the certificates table to postgres
ALTER TABLE public.certificates
    OWNER to postgres;
	
-- Set the owner of the category table to postgres
ALTER TABLE public.category
	OWNER to postgres;
	
-- Set the owner of the  service table to postgres
ALTER TABLE public.services
	OWNER to postgres;
	
-- Set the owner of the  socialmedia table t o postgres
ALTER TABLE public.social_media
	OWNER  to  postgres;
	
-- Set the owner of the  socialmedia table t o postgres
ALTER TABLE public.education
	OWNER  to  postgres;

-- Set the owner of the location table to postgres
ALTER TABLE public.location
	OWNER  to  postgres;

-- Set the owner of the contact table to postgres
ALTER TABLE public.opening_hours
	OWNER  to  postgres; 

-- Set the owner of the vendor_profile table to postgres
ALTER TABLE public.vendor_profile
	OWNER  to  postgres;
	
-- Comments on Tables

-- Add a comment to the users  table
COMMENT ON TABLE public.users
	IS 'This entity holds the information of users. It is a common entity for customer and vendor';

-- Add a comment to the certificates table
COMMENT ON TABLE public.certificates
    IS 'This entity contains the information about the certificates of the vendors.';

-- Add a comment to the category table
COMMENT ON TABLE public.category
	IS 'This entity refers to the categories of the services that a vendor provides.';

-- Add a comment to the services table
COMMENT ON TABLE public.services
    IS 'This entity contains the information about the services that a vendor provides.';

-- Add a comment to the socialmedia table
COMMENT ON TABLE public.social_media
    IS 'This entity contains the information about the social media links of the vendors.';

-- Add a comment to the education table
COMMENT ON TABLE public.education
    IS 'This entity contains the information about the education of the vendors.';

-- Add a comment to the location table
COMMENT ON TABLE public.location
    IS 'This entity contains the information about the location of the vendors business where they provide services.';

-- Add a comment to the opening_hours table
COMMENT ON TABLE public.opening_hours
    IS 'This entity contains the information about the opening hours of the vendors business.';

-- Add a comment to the vendor_profile table
COMMENT ON TABLE public.vendor_profile
    IS 'This entity contains the information about the profile of the vendors.';

-- Add a comment to the customer_profile table
COMMENT ON TABLE public.customer_profile
    IS 'This entity contains the information about the profile of the customers.';

-- Add a comment to the queue table
COMMENT ON TABLE public.queue
    IS 'This entity contains the information about the queue of the vendors.';

-- Add a comment to the appointment table
COMMENT ON TABLE public.appointment
    IS 'This entity contains the information about the appointments of the customers with the vendors.';

-- Add a comment to the request table
COMMENT ON TABLE public.request
    IS 'This entity contains the information about the requests of the customers to the vendors.';

-- Add a comment to the customer_search_preferences table
COMMENT ON TABLE public.customer_search_preferences
    IS 'This entity contains the information about the search preferences of the customers.';

-- Add a comment to the vendor_discovery table
COMMENT ON TABLE public.vendor_discovery
    IS 'This entity contains the information about the discovery of the vendors.';

-- Add a comment to the customer_favorites table
COMMENT ON TABLE public.customer_favorites
    IS 'This entity contains the information about the favorites of the customers.';

-- Add a comment to the customer_reviews table
COMMENT ON TABLE public.customer_reviews
    IS 'This entity contains the information about the reviews of the customers.';

-- Add a comment to the customer_search_history table
COMMENT ON TABLE public.customer_search_history
    IS 'This entity contains the information about the search history of the customers.';





-- -- Inserting Hypothetical data

-- -- Inserting data into Users table with hypothetical columns included

-- INSERT INTO public.users(username, email, gender, password, registrationdate, lastlogindate, usertype, isactive)
-- VALUES ('osama', 'osamabinazam@gmail.com', 'male', 'osama123', '2021-01-01 00:00:00', '2021-01-01 00:00:00', 'vendor', true);

-- INSERT INTO public.users(username, email,  gender, password, registrationdate, lastlogindate, usertype, isactive)
-- VALUES ( 'hadiqa', 'hadiqa@gmail.com', 'female', 'hadiqa123', '2021-01-01 00:00:00', '2021-01-01 00:00:00', 'vendor', true);

-- -- Inserting data into Certiciates
-- INSERT INTO public.certificates(title, college, start_date, end_date, certificate_url, image_url, created_at)
-- VALUES ('Bachelors in Computer Science', 'FAST-NUCES', '2015-01-01', '2019-01-01', 'https://www.google.com', 'https://www.google.com', '2021-01-01 00:00:00');

-- INSERT INTO public.certificates(title, college, start_date, end_date, certificate_url, image_url, created_at)
-- VALUES ('Masters in Computer Science', 'FAST-NUCES', '2019-01-01', '2021-01-01', 'https://www.google.com', 'https://www.google.com', '2021-01-01 00:00:00');

-- -- Inserting data into Category
-- INSERT INTO public.category(categoryname, parentcategoryid)
-- VALUES ('Web Development', NULL);   

-- INSERT INTO public.category(categoryname, parentcategoryid)
-- VALUES ('Mobile Development', NULL);

-- -- Inserting data into Services
-- INSERT INTO public.services(categoryid, name, description, price)
-- VALUES ('1', 'Web Development', 'Web Development', 1000.00);

-- INSERT INTO public.services(categoryid, name, description, price)
-- VALUES ('2', 'Mobile Development', 'Mobile Development', 1000.00);

-- -- Inserting data into Social Media
-- INSERT INTO public.social_media(vendorid, link, platform)
-- VALUES ('1', 'https://www.facebook.com', 'Facebook');

-- INSERT INTO public.social_media(vendorid, link, platform)
-- VALUES ('2', 'https://www.instagram.com', 'Instagram');

-- -- Inserting data into Education
-- INSERT INTO public.education(school, startat, endat, degree, description, certificateid)
-- VALUES ('FAST-NUCES', '2015-01-01', '2019-01-01', 'Bachelors in Computer Science', 'Bachelors in Computer Science', '1');

-- INSERT INTO public.education(school, startat, endat, degree, description, certificateid)
-- VALUES ('FAST-NUCES', '2019-01-01', '2021-01-01', 'Masters in Computer Science', 'Masters in Computer Science', '2');

-- -- Inserting data into Location
-- INSERT INTO public.location(address, city, state, postalcode, longitude, latitude)
-- VALUES ('Gulshan-e-Iqbal', 'Karachi', 'Sindh', '75300', 67.0822, 24.9337);

-- INSERT INTO public.location(address, city, state, postalcode, longitude, latitude)
-- VALUES ('Gulshan-e-Iqbal', 'Karachi', 'Sindh', '75300', 67.0822, 24.9337);

-- -- Inserting data into Contact
-- INSERT INTO public.contact(userid, phone, email, contactaddress, city, state, postalcode, country)
-- VALUES ('1', '1234567890', 'osamabinazam@gmail.com', 'Gulshan-e-Iqbal', 'Karachi', 'Sindh', '75300', 'Pakistan');

-- INSERT INTO public.contact(userid, phone, email, contactaddress, city, state, postalcode, country)
-- VALUES ('2', '1234567890', 'sajid@gmail.com', 'Gulshan-e-Iqbal', 'Karachi', 'Sindh', '75300', 'Pakistan');

-- -- Inserting data into Opening Hours
-- INSERT INTO public.opening_hours(weekday, opentime, closetime, isclosed)
-- VALUES ('Monday', '09:00:00', '17:00:00', false);

-- INSERT INTO public.opening_hours(weekday, opentime, closetime, isclosed)
-- VALUES ('Tuesday', '09:00:00', '17:00:00', false);

-- -- Inserting data into Vendor Profile
-- INSERT INTO public.vendor_profile(userid, businessname, businesstype, bio, dob, createdate, updatedate, contactid, openinghoursid, socialmedialinksid, locationid, certificateid, educationid)
-- VALUES ('1', 'Osama Bin Azam', 'Software Development', 'Software Developer', '1996-01-01', '2021-01-01 00:00:00', '2021-01-01 00:00:00', '1', '1', '1', '1', '1', '1');

-- INSERT INTO public.vendor_profile(userid, businessname, businesstype, bio, dob, createdate, updatedate, contactid, openinghoursid, socialmedialinksid, locationid, certificateid, educationid)
-- VALUES ('2', 'Sajid', 'Software Development', 'Software Developer', '1996-01-01', '2021-01-01 00:00:00', '2021-01-01 00:00:00', '2', '2', '2', '2', '2', '2');

-- -- Inserting data into Customer Profile
-- INSERT INTO public.customer_profile(userid, firstname, lastname, emailaddress, dateofbirth, preferences, contactid, createdat, updatedat)
-- VALUES ('3', 'Hadiqa', 'Kiani', 'osamabin@gmail.com', '1996-01-01', '{"preferences": "preferences"}', '2', '2021-01-01 00:00:00', '2021-01-01 00:00:00');

-- INSERT INTO public.customer_profile(userid, firstname, lastname, emailaddress, dateofbirth, preferences, contactid, createdat, updatedat)
-- VALUES ('4', 'Sajid', 'Kiani', 'sajid@gmail,com', '1996-01-01', '{"preferences": "preferences"}', '2', '2021-01-01 00:00:00', '2021-01-01 00:00:00');

-- -- Inserting data into Queue
-- INSERT INTO public.queue(queueID, vendorProfileID, currentQueueSize, averageServiceTime, queueStartTime, queueEndTime)
-- VALUES ('1', '1', 10, '01:00:00', '09:00:00', '17:00:00');

-- INSERT INTO public.queue(queueID, vendorProfileID, currentQueueSize, averageServiceTime, queueStartTime, queueEndTime)
-- VALUES ('2', '2', 10, '01:00:00', '09:00:00', '17:00:00');

-- -- Inserting data into Appointment
-- INSERT INTO public.appointment(appointmentID, customerProfileID, vendorProfileID, queueID, serviceID, appointmentDateTime, appointmentStatus)
-- VALUES ('1', '3', '1', '1', '1', '2021-01-01 00:00:00', 'scheduled');

-- INSERT INTO public.appointment(appointmentID, customerProfileID, vendorProfileID, queueID, serviceID, appointmentDateTime, appointmentStatus)
-- VALUES ('2', '4', '2', '2', '2', '2021-01-01 00:00:00', 'scheduled');

-- -- Inserting data into Request
-- INSERT INTO public.request(requestID, customerProfileID, vendorProfileID, serviceID, requestDateTime, additionalNotes)
-- VALUES ('1', '3', '1', '1', '2021-01-01 00:00:00', 'additional notes');

-- INSERT INTO public.request(requestID, customerProfileID, vendorProfileID, serviceID, requestDateTime, additionalNotes)
-- VALUES ('2', '4', '2', '2', '2021-01-01 00:00:00', 'additional notes');

-- -- Inserting data into Customer Search Preferences
-- INSERT INTO public.customer_search_preferences(customerProfileID, searchRadius, preferredCategories, preferredPriceRange, preferredRating, lastSearch)
-- VALUES ('3', 10, 'Web Development', 1000.00, 5.0, '2021-01-01 00:00:00');

-- INSERT INTO public.customer_search_preferences(customerProfileID, searchRadius, preferredCategories, preferredPriceRange, preferredRating, lastSearch)
-- VALUES ('4', 10, 'Mobile Development', 1000.00, 5.0, '2021-01-01 00:00:00');

-- -- Inserting data into Vendor Discovery
-- INSERT INTO public.vendor_discovery(vendorProfileID, serviceName, serviceCategory, location, rating)
-- VALUES ('1', 'Web Development', 'Web Development', 'Gulshan-e-Iqbal', 5.0);

-- INSERT INTO public.vendor_discovery(vendorProfileID, serviceName, serviceCategory, location, rating)
-- VALUES ('2', 'Mobile Development', 'Mobile Development', 'Gulshan-e-Iqbal', 5.0);

-- -- Inserting data into Customer Favorites
-- INSERT INTO public.customer_favorites(customerProfileID, vendorProfileID)
-- VALUES ('3', '1');

-- INSERT INTO public.customer_favorites(customerProfileID, vendorProfileID)
-- VALUES ('4', '2');

-- -- Inserting data into Customer Reviews
-- INSERT INTO public.customer_reviews(customerProfileID, vendorProfileID, serviceID, rating, reviewText, reviewDate)
-- VALUES ('3', '1', '1', 5, 'Great Service', '2021-01-01 00:00:00');

-- INSERT INTO public.customer_reviews(customerProfileID, vendorProfileID, serviceID, rating, reviewText, reviewDate)
-- VALUES ('4', '2', '2', 5, 'Great Service', '2021-01-01 00:00:00');

-- -- Inserting data into Customer Search History
-- INSERT INTO public.customer_search_history(customerProfileID, searchParameters, searchDate)
-- VALUES ('3', '{"def": "hjk"}', '2021-01-01 00:00:00');

-- INSERT INTO public.customer_search_history(customerProfileID, searchParameters, searchDate)
-- VALUES ('4', '{"xyz": "abc"}', '2021-01-01 00:00:00');

-- -- Inserting data into the queue table
-- INSERT INTO public.queue(queueID, vendorProfileID, currentQueueSize, averageServiceTime, queueStartTime, queueEndTime)
-- VALUES ('1', '1', 10, '01:00:00', '09:00:00', '17:00:00');

-- INSERT INTO public.queue(queueID, vendorProfileID, currentQueueSize, averageServiceTime, queueStartTime, queueEndTime)
-- VALUES ('2', '2', 10, '01:00:00', '09:00:00', '17:00:00');

-- -- Inserting data into the appointment table
-- INSERT INTO public.appointment(appointmentID, customerProfileID, vendorProfileID, queueID, serviceID, appointmentDateTime, appointmentStatus)
-- VALUES ('1', '3', '1', '1', '1', '2021-01-01 00:00:00', 'scheduled');

-- INSERT INTO public.appointment(appointmentID, customerProfileID, vendorProfileID, queueID, serviceID, appointmentDateTime, appointmentStatus)
-- VALUES ('2', '4', '2', '2', '2', '2021-01-01 00:00:00', 'scheduled');

-- -- Inserting data into the request table
-- INSERT INTO public.request(requestID, customerProfileID, vendorProfileID, serviceID, requestDateTime, additionalNotes)
-- VALUES ('1', '3', '1', '1', '2021-01-01 00:00:00', 'additional notes');

-- INSERT INTO public.request(requestID, customerProfileID, vendorProfileID, serviceID, requestDateTime, additionalNotes)
-- VALUES ('2', '4', '2', '2', '2021-01-01 00:00:00', 'additional notes');

-- -- Inserting data into the customer_search_preferences table
-- INSERT INTO public.customer_search_preferences(customerProfileID, searchRadius, preferredCategories, preferredPriceRange, preferredRating, lastSearch)
-- VALUES ('3', 10, 'Web Development', 1000.00, 5.0, '2021-01-01 00:00:00');

-- INSERT INTO public.customer_search_preferences(customerProfileID, searchRadius, preferredCategories, preferredPriceRange, preferredRating, lastSearch)
-- VALUES ('4', 10, 'Mobile Development', 1000.00, 5.0, '2021-01-01 00:00:00');

-- -- Inserting data into the vendor_discovery table
-- INSERT INTO public.vendor_discovery(vendorProfileID, serviceName, serviceCategory, location, rating)
-- VALUES ('1', 'Web Development', 'Web Development', 'Gulshan-e-Iqbal', 5.0);

-- INSERT INTO public.vendor_discovery(vendorProfileID, serviceName, serviceCategory, location, rating)
-- VALUES ('2', 'Mobile Development', 'Mobile Development', 'Gulshan-e-Iqbal', 5.0);

-- -- Inserting data into the customer_favorites table
-- INSERT INTO public.customer_favorites(customerProfileID, vendorProfileID)
-- VALUES ('3', '1');

-- INSERT INTO public.customer_favorites(customerProfileID, vendorProfileID)
-- VALUES ('4', '2');

-- -- Inserting data into the customer_reviews table
-- INSERT INTO public.customer_reviews(customerProfileID, vendorProfileID, serviceID, rating, reviewText, reviewDate)
-- VALUES ('3', '1', '1', 5, 'Great Service', '2021-01-01 00:00:00');

-- INSERT INTO public.customer_reviews(customerProfileID, vendorProfileID, serviceID, rating, reviewText, reviewDate)
-- VALUES ('4', '2', '2', 5, 'Great Service', '2021-01-01 00:00:00');

-- -- Inserting data into the customer_search_history table
-- INSERT INTO public.customer_search_history(customerProfileID, searchParameters, searchDate)
-- VALUES ('3', '{"def": "hjk"}', '2021-01-01 00:00:00');

-- INSERT INTO public.customer_search_history(customerProfileID, searchParameters, searchDate)
-- VALUES ('4', '{"xyz": "abc"}', '2021-01-01 00:00:00');



