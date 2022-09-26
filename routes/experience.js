const express = require('express');
const router = express.Router();
const ExperienceController = require('../controllers/work');
const auth = require('../middleware/auth');

router.use(auth);

router.post('/update-exp', ExperienceController.updateExperience);
router.post('/update-projects', ExperienceController.updateProjects);
router.post('/update-skills', ExperienceController.updateSkills);
router.post('/update-links', ExperienceController.updateLinks);

router.post('/delete-project', ExperienceController.deleteProject);
router.post('/delete-exp', ExperienceController.deleteExperience);

router.post('/purchase-resume', ExperienceController.purchaseResume);

router.post('/order', ExperienceController.checkOrders);

module.exports = router;
