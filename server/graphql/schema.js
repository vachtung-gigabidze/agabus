const {buildSchema} = require('graphql');

// scalar Date

const schema = buildSchema(`
    type InfoItem {
        id: ID
        ItemType: String
        Owner: String
        Caption: String
        CaptionImageUrl: String
        FullImageUrl: String
        ShortText: String
        Text: String
        ShortStyle: String
        Style: String
        PublishOwner: String
        BlindImageUrl: String
    }

    input InfoItemInput {
        id: ID
        ItemType: String!
        Owner: String
        Caption: String!
        CaptionImageUrl: String
        FullImageUrl: String
        ShortText: String
        Text: String
        ShortStyle: String
        Style: String
        PublishOwner: String
        BlindImageUrl: String
    }

    type Query {
        getAllInfoItem: [InfoItem]
        getInfoItem(id:ID): InfoItem 
    }

    type Mutation {
        createInfoItem(input: InfoItemInput):InfoItem
    }
    `);
    
    // ContentDate: Date
    // PublishDate: Date

module.exports = schema