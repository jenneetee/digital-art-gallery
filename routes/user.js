const express = require('express');
const router = express.Router();
const { db, admin } = require('../config/firebase.js');

router.post('/createUser', async (req, res) => {
    const { name, email, username, password, phone } = req.body;
    
    try {
        try {
            await admin.auth().getUserByEmail(email);
            return res.status(400).json({ message: 'Email already in use' });
        } catch (error) {
            // If error is auth/user-not-found, the email is not in use
            if (error.code !== 'auth/user-not-found') {
                throw error;
            }
        }

        // Check if username already exists in Firestore
        const usernameDoc = await db.collection('user').where('username', '==', username).get();
        if (!usernameDoc.empty) {
            return res.status(400).json({ message: 'Username already in use' });
        }

        // Create user in Firebase Authentication
        const userRecord = await admin.auth().createUser({
            email: email,
            password: password,
            displayName: name
        });

        // Assuming 'user' is the collection name in Firestore
        const User = {
            name: name,
            email: email,
            username: username,
            password: password,  // You should hash passwords in a real app
            phone: phone,
            createdAt: new Date()
        };

        // Save the new user in the 'users' collection
        const userRef = await db.collection('user').add(User);

        res.status(200).json({ message: 'User created successfully!', id: userRef.id });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
});

// Login route (modified to accept email or username)
router.post('/login', async (req, res) => {
    const { login, password } = req.body;
    
    if (!login || !password) {
        return res.status(400).json({ message: 'Login (email or username) and password are required' });
    }

    try {
        let userDoc;
        // Check if login is an email or username
        if (login.includes('@')) {
            console.log('Attempting email login');
            userDoc = await db.collection('user').where('email', '==', login).get();
        } else {
            // If it's a username, find the corresponding email
            console.log('Attempting username login');
            userDoc = await db.collection('user').where('username', '==', login).get();
        }

        console.log('userDoc empty?', userDoc.empty);
        if (userDoc.empty) {
            return res.status(401).json({ message: 'Invalid email/username or password' });
        }

        const userData = userDoc.docs[0].data();
        console.log('userData:', JSON.stringify(userData, null, 2));
        const email = userData.email;

        console.log('Attempting to get user record from Firebase Auth');
        const userRecord = await admin.auth().getUserByEmail(email);
        console.log('userRecord:', JSON.stringify(userRecord, null, 2));

        console.log('Comparing passwords')
        if (userData.password !== password) {
            return res.status(401).json({ message: 'Invalid email/username or password' });
        }

        // Create a custom token
        console.log('Creating custom token');
        const customToken = await admin.auth().createCustomToken(userRecord.uid);


        console.log('Login successful, sending response');
        res.status(200).json({
            message: 'Login successful',
            user: {
                uid: userRecord.uid,
                email: userRecord.email,
                username: userData.username,
                displayName: userRecord.displayName,
                ...userData
            },
            token: customToken
        });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Login failed', error: error.message });
    }
});

module.exports = router;