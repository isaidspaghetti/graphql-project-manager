const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList} = require('graphql');
const Project= require ('../models/Project');
const Client = require('../models/Client')

// Project Type
const ProjectType = new GraphQLObjectType({
	name: 'Project',
	fields: () => ({ // use callback to avoid circular reference of ProjectType below
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		description: { type: GraphQLString},
		status: { type: GraphQLString},
		client: { // Quasi Join: Project schema has a clientId
			type: ClientType,
			resolve(parent, args) { // parent is the project
				return Client.findById(parent.clientId) // Clients? TODO
			}},
	})
});
// Project type
const ClientType = new GraphQLObjectType({
	name: 'Client',
	fields: () => ({ // use callback to avoid circular reference of ClientType below
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		email: { type: GraphQLString },
		phone: { type: GraphQLString }
	})
});

const RootQuery = new GraphQLObjectType(({
	name: 'RootQueryType',
	fields: {
		projects: {
			type: GraphQLList(ProjectType),
			resolve(parent, args) {
				// return projects;
				return Project.find();
			}
		},
		project: {
			type: ProjectType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				// return projects.find(project => project.id === args.id)
				return Project.findById(args.id)
			}
		},
		clients: {
			type:GraphQLList(ClientType), // type of response, type of thing in that list
			resolve(parent, args) {
				// return clients;
				return Client.find();
			}
		},
		client: {
			type: ClientType,
			args: { id: { type: GraphQLID }},
			resolve(parentValue, args) { // gets the data
				// return clients.find(client => client.id === args.id) //js array find method
				return Client.findById(args.id)
			}

		}
	}
}))
module.exports = new GraphQLSchema({
	query: RootQuery
})