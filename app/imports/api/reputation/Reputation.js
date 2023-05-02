import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The ReputationCollection. It encapsulates state and variable values for reputation.
 */
class ReputationCollection {
  constructor() {
    // The name of this collection.
    this.name = 'ReputationCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      user_id: String,
      rating: {
        type: Number,
        allowedValues: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        defaultValue: 1,
      },
      reason: String,
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
 * The singleton instance of the ReputationsCollection.
 * @type {ReputationCollection}
 */
export const Reputation = new ReputationCollection();
