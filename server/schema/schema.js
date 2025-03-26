const { GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, GraphQLEnumType} = require('graphql');
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
				return Client.findById(parent.clientId)
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

// Mutations
const mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		// Add Client
		addClient: {
			type: ClientType,
			args: {
				name: { type: GraphQLNonNull(GraphQLString) },
				email: { type: GraphQLNonNull(GraphQLString)},
				phone: { type: GraphQLNonNull(GraphQLString)}
			},
			resolve(parent, args) {
				// or just return Client.create()
				const client = new Client({
					name: args.name,
					email: args.email,
					phone: args.phone
				})
				return client.save()
			}
		},

		// Delete Client
		deleteClient: {
			type: ClientType,
			args: {
				id: { type: GraphQLNonNull(GraphQLID)},
			},
			resolve: async (parent, args) =>  {
				// Cascade to delete projects owned by client
				await Project.deleteMany({ clientId: args.id});
				return Client.findByIdAndDelete(args.id)
			}

		},

		// Add  a project
		addProject: {
			type: ProjectType,
			args: {
				name: { type: GraphQLNonNull(GraphQLString)},
				description: { type: GraphQLNonNull(GraphQLString)},
				status: {
					type: new GraphQLEnumType({
						name: 'ProjectStatus',
						values: {
							'new': { value: 'Not Started'},
							'progress': {value: 'In Progress'},
							'completed': {value: 'Completed'}
						}
					}),
				defaultValue: 'Not Started'
				},
				clientId: { type: GraphQLNonNull(GraphQLID)}
			},
			resolve(parent, args) {
				const project = new Project({
					name: args.name,
					description: args.description,
					status: args.status,
					clientId: args.clientId
				});
				return project.save();
			}
		},

		// Delete project:
		deleteProject: {
			type: ProjectType,
			args: {
				id: { type: GraphQLNonNull(GraphQLID)}
			},
			resolve(parent, args) {
				return Project.findByIdAndDelete(args.id)
			}
		},

		updateProject: {
			type: ProjectType,
			args: {
				id: { type: GraphQLNonNull(GraphQLID) },
				name: {type: GraphQLString},
				description: {type: GraphQLString},
				status: {type: new GraphQLEnumType({
						name: 'ProjectStatusUpdate',
						values: {
							'new': { value: 'Not Started'},
							'progress': {value: 'In Progress'},
							'completed': {value: 'Completed'}
						}
				})},
			},
			resolve(parent, args) {
				return Project.findByIdAndUpdate(
					args.id,
					{
						$set: {
							name: args.name,
							description: args.description,
							status: args.status
						},
					},
					{ new: true } // create new project if not there
				)
			}
		}

	}
})



module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation,

})