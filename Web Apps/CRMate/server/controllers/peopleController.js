const mongoose = require('mongoose');

// import the contact model
const Contact = mongoose.model('Contact');

// GET all of a user's contact
const getAll = async(req, res) => {
    try {
        const contacts = await Contact.find({'userId': req.params.id});
        if (contacts === null) {
            res.status(400);
            return res.send('Query failed');
        }
        return res.send(contacts);
    } catch (err) {
        res.status(400);
        return res.send('Query failed');
    }
};

// GET search for a specific contact 
const search = async(req, res) => {
    try {
        // search by name
        if (req.query.name !== undefined) {
            var query = new RegExp(req.query.name, 'ig');
            
            const contacts = await Contact.aggregate([
                {
                    $project: {
                        firstName: 1,
                        lastName:1,
                        fullName: { $concat: ['$firstName', ' ', '$lastName'] },
                        email: 1,
                        phone: 1,
                        notes: 1,
                        tags: 1,
                        userId: 1,
                        _id: 1,
                        favorite: 1
                    },
                
                }, {
                    $match: {
                        $or: [{fullName: query}, {firstName: query}, {lastName: query} ],
                        userId:  new mongoose.Types.ObjectId(req.params.id)

                    }
                }

            ]);

            contacts.forEach(contact => delete contact.fullName);
            
            
            return res.send(contacts);

        // search by email
        } else if (req.query.email !== undefined) {
            const contacts = await Contact.find({
                $and: [
                    {'email': {$regex: req.query.email, $options:'i'}},
                    {'userId': req.params.id}
                ]
            });
            return res.send(contacts);

        // search by phone
        } else if (req.query.phone !== undefined) {
            const contacts = await Contact.find({
                $and: [
                    {'phone': {$regex: req.query.phone, $options:'i'}},
                    {'userId': req.params.id}
                ]
            });
            return res.send(contacts);
        
        // search by tags
        } else if (req.query.tag !== undefined) {
            if (!Array.isArray(req.query.tag)) {
                req.query.tag = [req.query.tag]
            }
            const regexTags = req.query.tag.map(t => new RegExp(`^${t}$`, 'i'));
            console.log(regexTags)
            const contacts = await Contact.find({
                'tags': {$all: regexTags}, 'userId': req.params.id
            });
            return res.send(contacts);
        
        // get by id
        } else if (req.query.id !== undefined) {
            const contacts = await Contact.findById(req.query.id);
            return res.send(contacts);

        // get all favorites 
        }  else if (req.query.favorite === 'all') {
            const contacts = await Contact.find({
                $and: [
                    {'favorite': true},
                    {'userId': req.params.id}
                ]
            });
            return res.send(contacts);

        }

    } catch (err) {
        res.status(400);
        return res.send('Query failed');
    }
};



// POST add a new person into a user's contact
const add = async(req, res) => {
    const userId = {'userId': req.params.id}
    const contactDetails = Object.assign(req.body, userId);
    const newContact = new Contact(contactDetails);

    try {
        let result = await newContact.save();
        return res.send(result);

    } catch (err) {
        res.status(400);
        console.log("ERR: ", err)
        return res.send('Query failed');
    }
};


// POST update a contact 
const update = async(req, res) => {
    try {
        const updatedContact = await Contact.findByIdAndUpdate(
            req.params.contactId, 
            req.body,
            {new: true}
        );
        return res.send(updatedContact);
        
    } catch (err) {
        res.status(400);
        return res.send('Query failed');
    }
};


// DELETE remove a contact 
const remove = async(req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.contactId);
        return res.send({message: "contact deleted"});

    } catch (err) {
        res.status(400);
        return res.send('Query failed');
    }
};

module.exports = {getAll, search, add, update, remove};