const {buildSchema} = require('graphql');

// scalar Date

const schema = buildSchema(`
    type ActionContent {
        id: ID
        Action: String
        Controller: String
        Name: String
        Content: String
        Description: String
        Owner: Int
        IsActive: Boolean
        DataArea: String
        OrderKey: Int
        Context: String
        RecVersion: Int
        ChangeDate: String
        CntSubHdr: String
        ImageKey: String
        IsExStyle: Boolean
        QRUrl: String
    }

    input ActionContentInput {
        id: ID!
        Action: String
        Controller: String
        Name: String
        Content: String!
        Description: String
        Owner: Int
        IsActive: Boolean!
        DataArea: String
        OrderKey: Int
        Context: String
        RecVersion: Int
        ChangeDate: String
        CntSubHdr: String
        ImageKey: String
        IsExStyle: Boolean!
        QRUrl: String
    }

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
        getAllActionContent: [ActionContent]
        getActionContent(id:ID): [ActionContent]
        getAllInfoItem: [InfoItem]
        getInfoItem(id:ID): InfoItem
    }

    type Mutation {
        createInfoItem(input: InfoItemInput):InfoItem
        createActionContent(input: ActionContentInput):ActionContent
        updateActionContent(input: ActionContentInput):ActionContent
        deleteActionContent(id:ID):ID
    }
    `);
    
    // ContentDate: Date
    // PublishDate: Date

module.exports = schema