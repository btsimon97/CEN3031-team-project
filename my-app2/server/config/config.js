//This file holds any configuration variables we may need 
//'config.js' is ignored by git to protect sensitive information, such as your database's username and password
//copy this file's contents to another file 'config.js' and store your MongoLab uri there

export default {
  db: {
    uri: 'mongodb+srv://antonio:%4015Antonio@mycluster-8pcgo.mongodb.net/test?retryWrites=true&w=majority'//place the URI of your mongo database here.
  }, 
  openCage: {
    key: '07aa249497314a62939dee9c320955ee' //place your openCage public key here - Sign-up for a free key https://opencagedata.com/
  },
  port: 5000
};