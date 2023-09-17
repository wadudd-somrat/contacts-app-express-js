const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

const grtContacts = asyncHandler(async (req,res) => {
    const contact = await Contact.find({created_by: req.user.id});
    res.status(200).json(contact);
}) ;

const createContacts = asyncHandler(async (req,res) => {
    
    const {name,phone,email} = req.body;
   
    if(!name || !phone || !email)
    {
        res.status(400);
        throw new Error("All fild are mandatory");
    }
    const connect = await Contact.create({
        name,
        phone,
        email,
        created_by: req.user.id
    });
    res.status(201).json({message: 'done',connect});
});

const grtContact = asyncHandler(async (req,res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact)
    {
        res.status(400);
        throw new Error("Contact Not Found");
    }
    if(contact.created_by.toString()!== req.user.id)
    {
        res.status(403)
        throw new Error("Don't have permission See this Data");
    }
    res.status(200).json(contact);
}); 

const updateContact = asyncHandler(async (req,res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact)
    {
        res.status(400);
        throw new Error("Contact Not Found");
    }
    if(contact.created_by.toString()!== req.user.id)
    {
        res.status(403)
        throw new Error("Don't have permission Update this Data");
    }

    const {name,phone,email} = req.body;
   
    if(!name || !phone || !email)
    {
        res.status(400);
        throw new Error("All fild are mandatory");
    }
    const connectUpdate = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new:true }
    );
    res.status(200).json(connectUpdate);
}); 

const deleteSContact = asyncHandler(async (req,res) => {
    
    const contact = await Contact.findById(req.params.id);
    if(!contact)
    {
        res.status(400);
        throw new Error("Contact Not Found");
    }

    if(contact.created_by.toString()!== req.user.id)
    {
        res.status(403)
        throw new Error("Don't have permission Delete this Data");
    }


    await Contact.findByIdAndRemove(req.params.id);

    res.status(200).json(contact);
});

module.exports = {
    grtContacts,
    createContacts,
    grtContact,
    updateContact,
    deleteSContact
};