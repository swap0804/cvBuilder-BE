const Responder = require('../service/responder');
const Experience = require('../models/workExperience');
const Project = require('../models/projects');
const Skills = require('../models/skills');
const Links = require('../models/links');

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
      let body = {
        userId: req.user._id,
        skills: req.body,
      };
      const existingSkills = await Skills.findOneAndUpdate(
        { userId: req.user._id },
        body,
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
        let skills = await new Skills(body).save();
        return Responder.respondWithSuccess(req, res, skills, 'Skills added');
      }
    } catch (e) {
      console.error(e);
    }
  },

  async updateLinks(req, res) {
    try {
      let body = req.body;
      body.userId = req.user._id;
      const existingUser = await Links.findOneAndUpdate(
        { userId: req.user._id },
        body,
        { new: true }
      );
      if (existingUser) {
        return Responder.respondWithSuccess(
          req,
          res,
          existingUser,
          'Links updated'
        );
      } else {
        let link = await new Links(body).save();
        return Responder.respondWithSuccess(req, res, link, 'Links added');
      }
    } catch (e) {
      console.error(e);
    }
  },

  async deleteProject(req, res) {
    try {
      const project = await Project.findOneAndDelete({
        userId: req.user._id,
        _id: req.body._id,
      });
      if (project) {
        return Responder.respondWithSuccess(
          req,
          res,
          project,
          'Project deleted'
        );
      } else
        return Responder.respondWithCustomError(req, res, 'Project not found');
    } catch (e) {
      console.error(e);
    }
  },

  async deleteExperience(req, res) {
    try {
      const experience = await Experience.findOneAndDelete({
        userId: req.user._id,
        _id: req.body._id,
      });
      if (experience) {
        return Responder.respondWithSuccess(
          req,
          res,
          experience,
          'Experience deleted'
        );
      } else
        return Responder.respondWithCustomError(
          req,
          res,
          'Experience not found'
        );
    } catch (e) {
      console.error(e);
    }
  },

  async deleteSkill(req, res) {
    try {
      const experience = await Experience.findOneAndDelete({
        userId: req.user._id,
        _id,
      });
      if (experience) {
        return Responder.respondWithSuccess(
          req,
          res,
          experience,
          'Experience deleted'
        );
      } else
        return Responder.respondWithCustomError(
          req,
          res,
          'Experience not found'
        );
    } catch (e) {
      console.error(e);
    }
  },
};
