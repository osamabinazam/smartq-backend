

-- Get all informatio of vendor
SELECT u.username, u.email, vp.businessname, vp.businesstype, vp.bio, c.phone, c.email AS contact_email, s.name AS service_name
FROM public.users u
JOIN public.vendor_profile vp ON u.userid = vp.userid
JOIN public.contact c ON u.userid = c.userid
JOIN public.services s ON s.categoryid = vp.categoryid
WHERE vp.userid = 'specific-vendor-user-id';

-- Get educational information along wih certificate title and college
SELECT e.school, e.startat, e.endat, e.degree, c.title, c.college
FROM public.education e
JOIN public.certificates c ON e.certificateid = c.certificateid;


--  Get Vendors and Their Services
-- This query assumes that vendors are users with a specific usertype. You'll first need to join users to vendor_profile and then to services through a category or direct relationship if any:

SELECT u.username, u.email, s.name AS service_name, s.description
FROM public.users u
JOIN public.vendor_profile vp ON u.userid = vp.userid
JOIN public.services s ON s.categoryid = vp.categoryid -- This assumes services are linked via category
WHERE u.usertype = 'vendor';


-- Get user and their contact information
SELECT u.username, u.email, c.phone, c.email AS contact_email, c.contactaddress
FROM public.users u
JOIN public.contact c ON u.userid = c.userid;


-- Get Venndor profiles and their locations
SELECT vp.*, l.address, l.city, l.state, l.postalcode
FROM public.vendor_profile vp
JOIN public.location l ON vp.locationid = l.locationid;


-- Get services by category id
SELECT * FROM public.services
WHERE categoryid = 'your-category-id-here'; -- Replace with actual category UUID

-- Get Categories and their parent categories
SELECT c.categoryid, c.categoryname, p.categoryname AS parent_category
FROM public.category c
LEFT JOIN public.category p ON c.parentcategoryid = p.categoryid;


-- Update vendors location
UPDATE public.location
SET address = '123 New Address St', city = 'New City', state = 'New State', postalcode = '12345'
WHERE locationid = (
    SELECT locationid FROM public.vendor_profile
    WHERE userid = 'specific-vendor-user-id' -- Replace with the vendor's user UUID
);


-- Update Services
UPDATE public.services
SET price = 99.99, description = 'Updated service description'
WHERE categoryid IN (
    SELECT categoryid
    FROM public.vendor_profile
    WHERE userid = 'specific-vendor-user-id' -- Replace with the vendor's user ID
);


-- Update Vendor Profile
UPDATE public.vendor_profile
SET businessname = 'New Business Name', businesstype = 'New Business Type', bio = 'New Bio'
WHERE userid = 'specific-vendor-user-id'; -- Replace with the vendor's user UUID


-- Update Certificates
UPDATE public.certificates
SET title = 'Updated Certificate Title', college = 'Updated College Name'
WHERE certificateid IN (
    SELECT e.certificateid
    FROM public.education e
    JOIN public.vendor_profile vp ON e.educationid = vp.educationid
    WHERE vp.userid = 'specific-vendor-user-id' -- Replace with the vendor's user ID
);


-- Update Contact
UPDATE public.contact
SET email = 'newcontactemail@example.com', phone = '+1234567890'
WHERE userid = 'specific-user-id'; -- Replace with the actual UUID of the user



-- CREATE VENDOR PROFILE with all his information 

-- Using Transactios
BEGIN;

WITH user_insert AS (
  INSERT INTO public.users (username, email, password, usertype, isactive)
  VALUES ('vendorUsername', 'vendor@example.com', 'hashedPassword', 'vendor', TRUE)
  RETURNING userid
),
location_insert AS (
  INSERT INTO public.location (address, city, state, postalcode, longitude, latitude)
  VALUES ('123 Vendor St', 'Vendor City', 'Vendor State', '12345', -123.456, 45.678)
  RETURNING locationid
),
contact_insert AS (
  INSERT INTO public.contact (userid, phone, email, contactaddress, city, state, postalcode, country)
  SELECT userid, '+1234567890', 'contact@example.com', '123 Vendor St', 'Vendor City', 'Vendor State', '12345', 'Vendor Country'
  FROM user_insert
  RETURNING contactid
)
INSERT INTO public.vendor_profile (userid, businessname, businesstype, bio, dob, createdate, locationid, contactid)
SELECT u.userid, 'Vendor Business Name', 'Vendor Business Type', 'A short bio about the vendor.', '1980-01-01', NOW(), l.locationid, c.contactid
FROM user_insert u, location_insert l, contact_insert c;

COMMIT;   -- end of the transaction
 



-- Delete a vendor and all related information form the database

-- Suppose you want to delete a specific vendor and all their related information from the database. You'll need to delete the vendor's services, social media links, education records, certificates, vendor profile, contact information, and location. Here's how you can do it using a transaction:
BEGIN;
-- Delete vendor's services (if directly related to vendor_profile or users)
DELETE FROM public.services WHERE vendorid IN (
    SELECT vendorprofileid FROM public.vendor_profile WHERE userid = 'specific-vendor-user-id'
);

-- Delete vendor's social media links
DELETE FROM public.social_media WHERE vendorid IN (
    SELECT vendorprofileid FROM public.vendor_profile WHERE userid = 'specific-vendor-user-id'
);

-- Delete vendor's education records (if directly related)
DELETE FROM public.education WHERE educationid IN (
    SELECT educationid FROM public.vendor_profile WHERE userid = 'specific-vendor-user-id'
);

-- Delete vendor's certificates (if you decide they should be deleted with the vendor)
-- This needs careful consideration, as certificates might be shared or reused.
DELETE FROM public.certificates WHERE certificateid IN (
    SELECT certificateid FROM public.education WHERE educationid IN (
        SELECT educationid FROM public.vendor_profile WHERE userid = 'specific-vendor-user-id'
    )
);

-- Delete from vendor_profile before contact and location due to foreign key constraints
DELETE FROM public.vendor_profile WHERE userid = 'specific-vendor-user-id';

-- Delete vendor's contact information
DELETE FROM public.contact WHERE userid = 'specific-vendor-user-id';

-- Delete vendor's location (if not shared with other entities)
DELETE FROM public.location WHERE locationid IN (
    SELECT locationid FROM public.vendor_profile WHERE userid = 'specific-vendor-user-id'
);

-- Finally, delete the vendor user record
DELETE FROM public.users WHERE userid = 'specific-vendor-user-id';

COMMIT;        -- end of the transaction



-- Update the Vendor's Profile with new information
-- Suppose you want to update a vendor's profile with new information. You can use a transaction to update the vendor's profile, contact information, and location in a single atomic operation:
BEGIN;
-- Update Users Table
UPDATE public.users
SET email = 'newemail@example.com', username = 'newusername'
WHERE userid = 'specific-vendor-user-id';

-- Update Vendor Profile Table
UPDATE public.vendor_profile
SET businessname = 'Updated Business Name', bio = 'Updated bio here'
WHERE userid = 'specific-vendor-user-id';

-- Update Location Table
UPDATE public.location
SET address = 'New Address', city = 'New City', state = 'New State', postalcode = 'New Postal Code'
WHERE locationid = (
    SELECT locationid FROM public.vendor_profile
    WHERE userid = 'specific-vendor-user-id'
);

-- Update Contact Table
UPDATE public.contact
SET phone = 'New Phone Number', email = 'newcontactemail@example.com', contactaddress = 'New Contact Address'
WHERE contactid = (
    SELECT contactid FROM public.vendor_profile
    WHERE userid = 'specific-vendor-user-id'
);

COMMIT;  -- end of the transaction

 

