const Course = require('../../models/Course');

// gets alison courses from DB and returns array
const getAlisonCatalogueController = async () => {
	// raw true to just return array
	return Course.findAll({ raw: true, })
		.then((data) => {
			return data;
		})
		.catch((err) => {
			return err.message || 'Some error occurred while retrieving Courses.'
		});
};

// handles request for getting all Alison courses
const getAlisonCatalogue = async (req, res) => {
	try {
		const response = await getAlisonCatalogueController();
		res.status(200).send(response);
	} catch (error) {
		console.error('Error getting full Alison catalogue', { error });
		res.status(500).send({
			message: 'Fail to get alison-catalogue from database!',
		});
	}
}

module.exports = { getAlisonCatalogue, getAlisonCatalogueController };