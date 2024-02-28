import express from 'express';
import pool from "../db/connection.js";
import bcrypt from 'bcrypt';
import authenticateToken from '../middlewares/authorization.js';
import jwtTokens from '../utils/jwt-helper.js';
import router from './auth.js';

// Get All vendors
router.get('/', authenticateToken, async (req, res) => {
    try {
        const data = await pool.query('SELECT * FROM public.vendor_profile');
        res.status(200).json({ data: data.rows });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

// Get Vendor By ID
router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const data = await pool.query('SELECT * FROM public.vendor_profile WHERE vendorprofileid = $1', [req.params.id]);
        res.status(200).json({ data: data.rows });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});



// Create Vendor 
router.post('/',authenticateToken, async (req, res) => {
    const { user, location, contact, vendorProfile } = req.body;
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
  
      const userResult = await client.query(
        'INSERT INTO public.users (username, email, password, usertype, isactive) VALUES ($1, $2, $3, $4, $5) RETURNING userid',
        [user.username, user.email, user.password, 'vendor', true]
      );
      const { userid } = userResult.rows[0];
  
      const locationResult = await client.query(
        'INSERT INTO public.location (address, city, state, postalcode, longitude, latitude) VALUES ($1, $2, $3, $4, $5, $6) RETURNING locationid',
        [location.address, location.city, location.state, location.postalcode, location.longitude, location.latitude]
      );
      const { locationid } = locationResult.rows[0];
  
      const contactResult = await client.query(
        'INSERT INTO public.contact (userid, phone, email, contactaddress, city, state, postalcode, country) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING contactid',
        [userid, contact.phone, contact.email, contact.contactaddress, contact.city, contact.state, contact.postalcode, contact.country]
      );
      const { contactid } = contactResult.rows[0];
  
      await client.query(
        'INSERT INTO public.vendor_profile (userid, businessname, businesstype, bio, dob, createdate, locationid, contactid) VALUES ($1, $2, $3, $4, $5, NOW(), $6, $7)',
        [userid, vendorProfile.businessname, vendorProfile.businesstype, vendorProfile.bio, vendorProfile.dob, locationid, contactid]
      );
  
      await client.query('COMMIT');
      res.status(201).send('Vendor profile created successfully');
    } catch (e) {
      await client.query('ROLLBACK');
      res.status(500).send('Failed to create vendor profile');
      console.error('Error creating vendor profile', e.stack);
    } finally {
      client.release();
    }
  });

  // Update Vendor
  router.put('/:userId', authenticateToken, async (req, res) => {
    const { userId } = req.params;
    const { email, username, businessName, bio, address, city, state, postalCode, phone, contactEmail, contactAddress } = req.body;
    
    try {
        await pool.query('BEGIN');
        
        const userUpdateQuery = 'UPDATE public.users SET email = $1, username = $2 WHERE userid = $3';
        await pool.query(userUpdateQuery, [email, username, userId]);
        
        const profileUpdateQuery = 'UPDATE public.vendor_profile SET businessname = $1, bio = $2 WHERE userid = $3';
        await pool.query(profileUpdateQuery, [businessName, bio, userId]);
        
        // Assuming locationid and contactid need to be retrieved first or passed in the request
        // For simplicity, this example will just show placeholder queries
        // You would replace these with the actual logic to update location and contact
        
        const locationUpdateQuery = 'UPDATE public.location SET address = $1, city = $2, state = $3, postalcode = $4 WHERE locationid = (SELECT locationid FROM public.vendor_profile WHERE userid = $5)';
        await pool.query(locationUpdateQuery, [address, city, state, postalCode, userId]);
        
        const contactUpdateQuery = 'UPDATE public.contact SET phone = $1, email = $2, contactaddress = $3 WHERE contactid = (SELECT contactid FROM public.vendor_profile WHERE userid = $4)';
        await pool.query(contactUpdateQuery, [phone, contactEmail, contactAddress, userId]);
        
        await pool.query('COMMIT');
        res.send('Vendor profile updated successfully');
    } catch (err) {
        await pool.query('ROLLBACK');
        console.error('Error during the transaction, ROLLBACK:', err);
        res.status(500).send('Failed to update vendor profile');
    }
});


// Delete a Vendor From database


router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        // const data = await pool.query('DELETE FROM public.vendor_profile WHERE vendorprofileid = $1', [req.params.id]);
        res.status(200).json({ message: "Vendor Deleted Successfully" });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});



// // Get Vendor By Email
// router.get('/:email', authenticateToken, async (req, res) => {
//     try {
//         const data = await pool.query('SELECT * FROM public.vendor_profile WHERE email = $1', [req.params.email]);
//         res.status(200).json({ data: data.rows });
//     } catch (e) {
//         res.status(500).json({ message: e.message });
//     }
// });

// Get Vendor by Business Name
router.get('/business/:businessname', authenticateToken, async (req, res) => {
    try {
        const data = await pool.query('SELECT * FROM public.vendor_profile WHERE businessname = $1', [req.params.businessname]);
        res.status(200).json({ data: data.rows });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});


export default router;