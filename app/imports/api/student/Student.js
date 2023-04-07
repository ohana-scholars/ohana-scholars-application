import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The StudentCollection.
 */
class StudentCollection {
  constructor() {
    // The name of this collection.
    this.name = 'StudentCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      name: String,
      username: String,
      // interests: String, // ID to interest collection
      // classes: String, // ID to classes collection
      description: String,
      profilepic: String,
      owner: String, // Email of user
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
