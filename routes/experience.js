const express = require('express');
const router = express.Router();
const ExperienceController = require('../controllers/work');

router.post('/update-exp', ExperienceController.updateExperience);
router.post('/update-projects', ExperienceController.updateProjects);
router.post('/update-skills', ExperienceController.updateSkills);

module.exports = router;
