const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const mongoosePaginate = require('mongoose-paginate');

const modelSchema = new mongoose.Schema({
    
    gender: String,
    name: Object,
    location: Object,    
    email: String,
    login: Object,
    dob: Object,
    registered: Object,
    phone: String,
    cell: String,
    id: Object,
    picture: Object,
    nat: String,
    imported_t: Date,
    status: {
        type: String,
        enum: ['published', 'trash']
    }
});

modelSchema.path('status').options.enum;

modelSchema.plugin(mongoosePaginate);


const modelName = 'User';

if(mongoose.connection && mongoose.connection.models[modelName]){
    module.exports = mongoose.connection.models[modelName];
}else{
    module.exports = mongoose.model(modelName, modelSchema);
}