const { response } = require('express');
const Event = require('../models/Event');

const getEvents = async( req, resp = response  ) => {

    const events = await Event.find().populate('user', 'name');
        
    resp.status(200).json({
            ok: true,
            events
        });
}

const createEvent = async( req, resp = response ) => {

    const event = new Event( req.body );

    try {

        event.user = req.uid;

       const eventSaved = await event.save();

       resp.json({
        ok: true,
        event: eventSaved
       });
        
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Contact admin'
        });
    }
}

const updateEvent = async( req, resp = response ) => {

    const eventId = req.params.id;
    const uid = req.uid;

    try {

        const event =  await Event.findById( eventId );

        if( !event ) {
            return resp.status(404).json({
                ok: false,
                msg: 'Event with that id does not exist'
            });
        }

        if( event.user.toString() !== uid ) {
            return resp.status(401).json({
                ok: false,
                msg: 'Do not have the credentials to edit this event'
            });            
        }

        const newEvent = {
            ...req.body,
            user: uid
        }

        const eventUpdated = await Event.findByIdAndUpdate( eventId, newEvent, { new: true } );

        resp.json({
            ok: true,
            event: eventUpdated
        });
        
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Contact admin'
        });
    }
    
}

const deleteEvent = async( req, resp = response ) => {

    const eventId = req.params.id;
    const uid = req.uid;
    
    try {
        
        const event = await Event.findById( eventId );

        if( !event ) {
            return resp.status(404).json({
                ok: false,
                msg: 'That event does not exist'
            });
        }

        if ( event.user.toString() !== uid ) {
            return resp.status(401).json({
                ok: false,
                msg: 'Do not have the credentials to delete that event'
            });
        }

        await Event.findByIdAndDelete( eventId );

        resp.status(200).json({ ok: true });
        
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Contact admin'
        });
    }    
    
}


module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}