var knex = require('./../connection');
var uuid = require('uuid/v4');

module.exports = {
  list: function () {
    return knex('survey').orderBy('created_at', 'desc');
  },
  teamList: function (id) {
    return knex('survey').where('team_id', id).orderBy('created_at', 'desc');
  },
  read: function (id) {
    return knex('survey').where({id: id}).first();
  },
  readMembers: function (id) {
    return knex('survey')
      .join('team', 'survey.team_id', 'team.id')
      .join('member', 'member.team_id', 'team.id')
      .where({'survey.id': id});
  },
  create: function (id, name) {
    return knex('survey').insert({
      id: uuid(),
      name: name,
      team_id: id
    }).returning('id')
  },
  update: function (id, name) {
    return knex('survey').update({name: name}).where({id: id});
  },
  delete: function (id) {
    return knex('survey').where({id: id}).delete();
  }
}
