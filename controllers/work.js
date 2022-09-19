const Responder = require('../service/responder');
const Experience = require('../models/workExperience');
const Project = require('../models/projects');
const Skills = require('../models/skills');

module.exports = {
  async updateExperience(req, res) {
    try {
      let body = req.body;
      body.userId = req.user._id;
      if (body._id) {
        const experience = await Experience.findOneAndUpdate(
          {
            _id: body._id,
          },
          body
        );
        if (experience)
          return Responder.respondWithSuccess(
            req,
            res,
            experience,
            'Experience updated'
          );
        else
          return Responder.respondWithCustomError(
            req,
            res,
            'No experience found'
          );
      } else {
        const experience = await new Experience(body).save();
        return Responder.respondWithSuccess(
          req,
          res,
          experience,
          'New experience added'
        );
      }
    } catch (e) {
      console.log('error', e);
    }
  },

  async updateProjects(req, res) {
    try {
      let body = req.body;
      body.userId = req.user._id;
      if (body._id) {
        const project = await Project.findOneAndUpdate(
          {
            _id: body._id,
          },
          body,
          { new: true }
        );
        if (project)
          return Responder.respondWithSuccess(
            req,
            res,
            project,
            'Project updated'
          );
        else
          return Responder.respondWithCustomError(req, res, 'No project found');
      } else {
        const project = await new Project(body).save();
        return Responder.respondWithSuccess(
          req,
          res,
          project,
          'New project added'
        );
      }
    } catch (e) {
      console.error(e);
    }
  },

  async updateSkills(req, res) {
    try {
      const existingSkills = await Skills.findOneAndUpdate(
        { userId: req.user._id },
        req.body,
        { new: true }
      );
      if (existingSkills) {
        return Responder.respondWithSuccess(
          req,
          res,
          existingSkills,
          'Skills updated'
        );
      } else {
        req.body.userId = req.user._id;
        let skills = await new Skills(req.body).save();
        return Responder.respondWithSuccess(req, res, skills, 'Skills added');
      }
    } catch (e) {
      console.error(e);
    }
  },
};
