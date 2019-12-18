var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
  {
    first_name: {type: String, required: true, max: 100},
    family_name: {type: String, required: true, max: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
  }
);

AuthorSchema
.virtual('name')
.get(function () {

  var fullname = '';
  if (this.first_name && this.family_name) {
    fullname = this.family_name + ', ' + this.first_name
  }
  if (!this.first_name || !this.family_name) {
    fullname = '';
  }

  return fullname;
});

AuthorSchema
.virtual('date_of_birth_formatted')
.get(function () {
  return moment(this.date_of_birth).format('YYYY-MM-DD');
});

AuthorSchema
.virtual('date_of_death_formatted')
.get(function () {
  return moment(this.date_of_death).format('YYYY-MM-DD');
});

AuthorSchema
.virtual('lifespan')
.get(function () {
  var lifespan = ''
  if (this.date_of_birth && this.date_of_death) {
    lifespan = `${moment(this.date_of_birth).format('MMMM Do, YYYY')} – ${moment(this.date_of_death).format('MMMM Do, YYYY')}`
  } else if (this.date_of_birth && !this.date_of_death) {
    lifespan = `${moment(this.date_of_birth).format('MMMM Do, YYYY')} – present`
  } else {
    lifespan = ''
  }

  return lifespan

});

AuthorSchema
.virtual('url')
.get(function () {
  return '/catalog/author/' + this._id;
});

module.exports = mongoose.model('Author', AuthorSchema);