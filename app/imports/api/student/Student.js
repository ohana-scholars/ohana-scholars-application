import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The StudentCollection. It encapsulates state and variable values for stuff.
 */
class StudentCollection {
  constructor() {
    // The name of this collection.
    this.name = 'StudentCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      firstName: String,
      lastName: String,
      username: String,
      description: String,
      profilePictureLink: String,
      // courses: String, // Add later when collections made
      // interests: String,
      owner: String,
    });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the StudentCollection.
 * @type {StudentCollection}
 */
export const Student = new StudentCollection();
