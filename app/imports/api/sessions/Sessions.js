import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The SessionsCollection. It encapsulates state and variable values for sessions.
 */
class SessionsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'SessionsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      name: String,
      course: String,
      location: String,
      month: {
        type: String,
        allowedValues: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        defaultValue: 'Apr',
      },
      day: {
        type: Number,
        allowedValues: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
        defaultValue: 13,
      },
      time: String,
      notes: String,
      image: String,
      participant: Array,
      'participant.$': {
        type: String,
      },
      owner: String,
      _id: String,
    });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the StuffsCollection.
 * @type {SessionsCollection}
 */
export const Sessions = new SessionsCollection();
